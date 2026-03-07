"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchMapMarkers } from "@/lib/api/map";
import type { MapFiltersState } from "@/types";
import MapTooltip, { type TooltipState } from "./MapTooltip";
import MapFilters from "./MapFilters";

/* ── Dark monochrome base map style (no API key required) ── */
const DARK_MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  name: "Chakravyuh Dark",
  sources: {
    demotiles: {
      type: "vector",
      url: "https://demotiles.maplibre.org/tiles/tiles.json",
    },
  },
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#0A0A0A" },
    },
    {
      id: "countries-fill",
      type: "fill",
      source: "demotiles",
      "source-layer": "countries",
      paint: { "fill-color": "#121212" },
    },
    {
      id: "countries-boundary",
      type: "line",
      source: "demotiles",
      "source-layer": "countries",
      paint: {
        "line-color": "#1A1A1A",
        "line-width": 0.7,
      },
    },
    {
      id: "geolines",
      type: "line",
      source: "demotiles",
      "source-layer": "geolines",
      paint: {
        "line-color": "#141414",
        "line-width": 0.5,
        "line-dasharray": [3, 3],
      },
    },
  ],
};

const SOURCE_ID = "conflicts";
const CLUSTER_LAYER_ID = "conflict-clusters";
const CLUSTER_COUNT_LAYER_ID = "conflict-cluster-count";
const UNCLUSTERED_GLOW_LAYER_ID = "conflict-markers-glow";
const UNCLUSTERED_PULSE_LAYER_ID = "conflict-markers-pulse";
const UNCLUSTERED_LAYER_ID = "conflict-markers";
const UNCLUSTERED_STROKE_LAYER_ID = "conflict-markers-stroke";

export default function ConflictMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const pulseFrameRef = useRef<number>(0);
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const applyFilters = useCallback(async (filters: MapFiltersState) => {
    const map = mapRef.current;
    if (!map) return;

    try {
      const regionParam = filters.region === "All" ? undefined : filters.region;
      const geojson = await fetchMapMarkers({ region: regionParam });

      // Client-side intensity filter (API only accepts a single value)
      if (filters.intensity.length > 0) {
        geojson.features = geojson.features.filter((f) =>
          filters.intensity.includes(f.properties.intensity)
        );
      }

      const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
      if (source) source.setData(geojson);
    } catch (err) {
      console.error("Failed to apply filters:", err);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: DARK_MAP_STYLE,
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
              "#4F46E5", // 1-4 conflicts → deeper indigo
              5, "#7C3AED", // 5-9 → AI violet (design token)
              10, "#DC2626", // 10+ → deep red
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              16,      // 1-4 → 16px
              5, 22,   // 5-9 → 22px
              10, 28,  // 10+ → 28px
            ],
            "circle-opacity": 0.85,
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-opacity": 0.15,
            "circle-blur": 0.15,
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

        // ── Glow layer beneath markers (blurred, larger, low opacity) ──
        map.addLayer({
          id: UNCLUSTERED_GLOW_LAYER_ID,
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
              1, 8,
              3, 14,
              6, 22,
              10, 32,
            ],
            "circle-blur": 0.45,
            "circle-opacity": 0.35,
          },
        });

        // ── Pulse layer for active conflicts (animated via rAF) ──
        map.addLayer({
          id: UNCLUSTERED_PULSE_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          filter: [
            "all",
            ["!", ["has", "point_count"]],
            ["==", ["get", "status"], "active"],
          ],
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
              1, 10,
              3, 18,
              6, 28,
              10, 40,
            ],
            "circle-blur": 0.6,
            "circle-opacity": 0.25,
          },
        });

        // Start pulse animation loop
        const animatePulse = () => {
          const t = (performance.now() % 2000) / 2000; // 2-second cycle
          const pulse = Math.sin(t * Math.PI * 2) * 0.5 + 0.5; // 0 → 1 → 0
          const opacityVal = 0.1 + pulse * 0.25; // 0.1 → 0.35
          const radiusScale = 1 + pulse * 0.3; // 1x → 1.3x

          if (map.getLayer(UNCLUSTERED_PULSE_LAYER_ID)) {
            map.setPaintProperty(UNCLUSTERED_PULSE_LAYER_ID, "circle-opacity", opacityVal);
            map.setPaintProperty(UNCLUSTERED_PULSE_LAYER_ID, "circle-radius", [
              "interpolate",
              ["linear"],
              ["zoom"],
              1, 10 * radiusScale,
              3, 18 * radiusScale,
              6, 28 * radiusScale,
              10, 40 * radiusScale,
            ]);
          }
          pulseFrameRef.current = requestAnimationFrame(animatePulse);
        };
        pulseFrameRef.current = requestAnimationFrame(animatePulse);

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
              1, 4,
              3, 7,
              6, 12,
              10, 18,
            ],
            "circle-opacity": 0.9,
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
              1, 4,
              3, 7,
              6, 12,
              10, 18,
            ],
            "circle-stroke-width": 1.5,
            "circle-stroke-color": [
              "match",
              ["get", "intensity"],
              "high", "#FCA5A5",
              "medium", "#FDBA74",
              "low", "#FDE047",
              "tension", "#FDE047",
              "#9CA3AF",
            ],
            "circle-stroke-opacity": 0.5,
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

        // ── Click unclustered marker → cinematic flyTo then navigate ──
        map.on("click", UNCLUSTERED_LAYER_ID, (e) => {
          e.originalEvent.stopPropagation();
          const feature = e.features?.[0];
          const slug = feature?.properties?.slug;
          if (!slug) return;
          const geometry = feature?.geometry;
          if (geometry?.type === "Point") {
            map.flyTo({
              center: geometry.coordinates as [number, number],
              zoom: 5,
              duration: 1200,
              essential: true,
            });
            setTimeout(() => router.push(`/conflict/${slug}`), 900);
          } else {
            router.push(`/conflict/${slug}`);
          }
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

    // Resize map when container dimensions change
    const ro = new ResizeObserver(() => map.resize());
    ro.observe(mapContainer.current);

    return () => {
      cancelAnimationFrame(pulseFrameRef.current);
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0" role="application" aria-label="Interactive conflict map">
      <div ref={mapContainer} className="w-full h-full" />
      <MapFilters onChange={applyFilters} />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-border border-t-indigo-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-500 font-data tracking-wide">LOADING MAP</span>
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