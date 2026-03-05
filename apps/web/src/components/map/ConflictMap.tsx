"use client";

import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { fetchMapMarkers } from "@/lib/api/map";

const SOURCE_ID = "conflicts";
const LAYER_ID = "conflict-markers";
const STROKE_LAYER_ID = "conflict-markers-stroke";

export default function ConflictMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        });

        // Marker fill layer — color by intensity
        map.addLayer({
          id: LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
          paint: {
            "circle-color": [
              "match",
              ["get", "intensity"],
              "high", "#EF4444",
              "medium", "#F97316",
              "low", "#EAB308",
              "tension", "#EAB308",
              "#6B7280", // fallback (historical)
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

        // Stroke layer for visibility
        map.addLayer({
          id: STROKE_LAYER_ID,
          type: "circle",
          source: SOURCE_ID,
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
      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-900/80 text-red-200 text-sm px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}