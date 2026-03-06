"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchMapMarkers } from "@/lib/api/map";
import MapTooltip, { type TooltipState } from "./MapTooltip";

const SOURCE_ID = "conflicts";
const CLUSTER_LAYER_ID = "conflict-clusters";
const CLUSTER_COUNT_LAYER_ID = "conflict-cluster-count";
const UNCLUSTERED_LAYER_ID = "conflict-markers";
const UNCLUSTERED_STROKE_LAYER_ID = "conflict-markers-stroke";

export default function ConflictMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [20, 20],
      zoom: 2,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", async () => {
      setLoaded(true);

      try {
        const geojson = await fetchMapMarkers();

        map.addSource(SOURCE_ID, {
          type: "geojson",
          data: geojson,
          cluster: true,
          clusterMaxZoom: 4,
          clusterRadius: 60,
        });

        // ── Cluster circle layer ──
        map.addLayer({
          id: CLUSTER_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#6366F1", // 1-4 conflicts → indigo
              5, "#8B5CF6", // 5-9 → violet
              10, "#EF4444", // 10+ → red
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              18,      // 1-4 → 18px
              5, 24,   // 5-9 → 24px
              10, 30,  // 10+ → 30px
            ],
            "circle-opacity": 0.8,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-opacity": 0.4,
          },
        });

        // ── Cluster count text layer ──
        map.addLayer({
          id: CLUSTER_COUNT_LAYER_ID,
          type: "symbol",
          source: SOURCE_ID,
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": 13,
            "text-font": ["Open Sans Semibold"],
          },
          paint: {
            "text-color": "#ffffff",
          },
        });

        // ── Unclustered marker fill — color by intensity ──
        map.addLayer({
          id: UNCLUSTERED_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": [
              "match",
              ["get", "intensity"],
              "high", "#EF4444",
              "medium", "#F97316",
              "low", "#EAB308",
              "tension", "#EAB308",
              "#6B7280",
            ],
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1, 5,
              3, 8,
              6, 14,
              10, 20,
            ],
            "circle-opacity": 0.85,
          },
        });

        // ── Unclustered marker stroke ──
        map.addLayer({
          id: UNCLUSTERED_STROKE_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              1, 5,
              3, 8,
              6, 14,
              10, 20,
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": [
              "match",
              ["get", "intensity"],
              "high", "#FCA5A5",
              "medium", "#FDBA74",
              "low", "#FDE047",
              "tension", "#FDE047",
              "#9CA3AF",
            ],
            "circle-color": "transparent",
          },
        });

        // ── Click cluster → zoom to expand ──
        map.on("click", CLUSTER_LAYER_ID, (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [CLUSTER_LAYER_ID],
          });
          if (!features.length) return;

          const clusterId = features[0].properties?.cluster_id;
          const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource;

          source.getClusterExpansionZoom(clusterId).then((zoom) => {
            const geometry = features[0].geometry;
            if (geometry.type !== "Point") return;
            map.easeTo({
              center: geometry.coordinates as [number, number],
              zoom,
            });
          });
        });

        // ── Click unclustered marker → navigate to detail page ──
        map.on("click", UNCLUSTERED_LAYER_ID, (e) => {
          e.originalEvent.stopPropagation();
          const feature = e.features?.[0];
          const slug = feature?.properties?.slug;
          if (slug) router.push(`/conflict/${slug}`);
        });

        // ── Hover unclustered markers → show tooltip ──
        map.on("mousemove", UNCLUSTERED_LAYER_ID, (e) => {
          map.getCanvas().style.cursor = "pointer";
          if (!e.features?.length) return;
          const props = e.features[0].properties;
          if (!props) return;
          setTooltip({
            x: e.point.x,
            y: e.point.y,
            properties: {
              conflict_id: props.conflict_id,
              slug: props.slug,
              display_name: props.display_name,
              status: props.status,
              intensity: props.intensity,
              risk_score: props.risk_score != null ? Number(props.risk_score) : null,
              casualty_estimate: props.casualty_estimate != null ? Number(props.casualty_estimate) : null,
              region: props.region,
            },
          });
        });
        map.on("mouseleave", UNCLUSTERED_LAYER_ID, () => {
          map.getCanvas().style.cursor = "";
          setTooltip(null);
        });

        // Pointer cursor on clusters
        map.on("mouseenter", CLUSTER_LAYER_ID, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", CLUSTER_LAYER_ID, () => {
          map.getCanvas().style.cursor = "";
        });
      } catch (err) {
        console.error("Failed to load conflict markers:", err);
        setError("Could not load conflict data");
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div ref={mapContainer} className="w-full h-full" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
          <div className="text-gray-400 text-sm animate-pulse">
            Loading map…
          </div>
        </div>
      )}
      {tooltip && <MapTooltip {...tooltip} />}
      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-900/80 text-red-200 text-sm px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}