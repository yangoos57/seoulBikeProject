import React from "react";
import { MapContainer, TileLayer, Polyline, Popup, Marker, useMapEvent, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

//화면 부드럽게 이동
function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}
const BtMapData = ({ children }) => {
  return (
    <MapContainer
      center={[37.534863, 126.90241]}
      zoom={12}
      scrollWheelZoom={true}
      attributionControl={false}
      zoomControl={false}>
      <TileLayer
        attribution='&copy; Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/yangoos/cl4vjjz0c001n14sk1ytnj9ix/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA"
      />
      {/* <SetViewOnClick animateRef={true} /> */}
      {children}
    </MapContainer>
  );
};

export default BtMapData;
