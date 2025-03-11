"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useScreenSize from "@/hooks/useScreenSize";

type Coordinate = {
  lat: number;
  lng: number;
};

type MapComponentProps = {
  coordinates: Coordinate[];
  zoom?: number;
};

const MapViewUpdater: React.FC<{ center: Coordinate; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setView([center.lat, center.lng], zoom, { animate: true });
    }
  }, [center, zoom, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  coordinates,
  zoom = 10,
}) => {
  const { breakpoint } = useScreenSize();
  const isMobile = breakpoint === "sm";
  const height = isMobile ? "300px" : "500px";

  const validCoordinates = coordinates?.filter(
    (coord) => !(coord.lat === 0 && coord.lng === 0)
  );

  const airportIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const center =
    validCoordinates.length > 0
      ? validCoordinates[0]
      : { lat: -6.1221525, lng: 106.6404166 };

  return (
    <MapContainer
      key={height}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ width: "100%", height }}
    >
      <MapViewUpdater center={center} zoom={zoom} />
      <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />

      {validCoordinates.map((coord, index) => (
        <Marker
          key={index}
          position={[coord.lat, coord.lng]}
          icon={airportIcon}
        />
      ))}

      {validCoordinates.length > 1 && (
        <Polyline
          positions={validCoordinates.map((c) => [c.lat, c.lng])}
          color="blue"
          weight={3}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
