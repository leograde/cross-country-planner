import { useEffect, useRef, useState } from "react";
import L, { LeafletMouseEvent } from "leaflet";

interface MapProps {
  initialGeolocation: { lat: number; lng: number };
  markers: L.Marker[];
  polylines: L.Polyline[];
  onMapClicked: ({ lat, lng }: { lat: number; lng: number }) => void;
}

export function Map({
  initialGeolocation,
  markers,
  polylines,
  onMapClicked,
}: MapProps) {
  // We need a reference to the HTML Element in order to initialize our Map.
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [leafletMap, setLeafletMap] = useState<L.Map>();

  const markersLayerGroupRef = useRef<L.LayerGroup>();
  const polylinesLayerGroupRef = useRef<L.LayerGroup>();

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = L.map(mapContainerRef.current).setView(
        [initialGeolocation.lng, initialGeolocation.lat],
        15
      );

      L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }).addTo(map);

      map.on("click", (event: LeafletMouseEvent) => {
        onMapClicked({ lat: event.latlng.lat, lng: event.latlng.lng });
      });

      setLeafletMap(map);
    }

    return () => {
      leafletMap?.clearAllEventListeners();
    };
    // Explicitly initialize and display any initial markers once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (leafletMap) {
      const markersLayerGroup = L.layerGroup(markers);
      if (markersLayerGroupRef.current) {
        markersLayerGroupRef.current.clearLayers();
      }
      markersLayerGroup.addTo(leafletMap);
      markersLayerGroupRef.current = markersLayerGroup;

      const polylinesLayerGroup = L.layerGroup(polylines);
      if (polylinesLayerGroupRef.current) {
        polylinesLayerGroupRef.current.clearLayers();
      }
      polylinesLayerGroup.addTo(leafletMap);
      polylinesLayerGroupRef.current = polylinesLayerGroup;
    }
  }, [leafletMap, markers, polylines]);

  return <div ref={mapContainerRef} className="map-container"></div>;
}
