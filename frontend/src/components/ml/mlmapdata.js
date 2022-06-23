import React from "react";
import { MapContainer, TileLayer, Polyline, Popup, Marker, useMapEvent, useMap } from "react-leaflet";
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

// marker
function bike_icon() {
  return L.icon({
    iconUrl: require("./assets/icons/Group 25.png"),
    iconSize: [25, 35],
    iconAnchor: [10, 35],
  });
}
function bus_icon() {
  return L.icon({
    iconUrl: require("./assets/icons/Group 22.png"),
    iconSize: [25, 35],
    iconAnchor: [10, 35],
  });
}
function sub_icon() {
  return L.icon({
    iconUrl: require("./assets/icons/Group 22.png"),
    iconSize: [25, 35],
    iconAnchor: [10, 35],
  });
}

//main
const MlMapData = ({ mapdata }) => {
  //marker 출발도착지 변수설정
  var bike_route = mapdata["bike_coor"];
  if (bike_route !== undefined) {
    var bikeDepStation = bike_route[0];
    var bikeArrStation = bike_route[bike_route.length - 1];
  }

  var bus_route = mapdata["bus_coor"];
  if (bus_route !== undefined) {
    var busArrStation = bus_route[0];
    var busDepStation = bus_route[bus_route.length - 1];
  }

  var sub_route = mapdata["sub_coor"];
  if (sub_route !== undefined) {
    var subArrStation = sub_route[0];
    var subDepStation = sub_route[sub_route.length - 1];
  }

  var markers = [
    { bike: bikeArrStation }, //
    { bike: bikeDepStation },
    { bus: busArrStation },
    { bus: busDepStation },
    { sub: subArrStation },
    { sub: subDepStation },
  ];

  const result = markers //
    .filter((marker) => {
      if (Object.values(marker)[0] !== undefined)
        //
        return marker;
    });
  return (
    <div className="flex-container m-auto">
      <div className="map-ml">
        <MapContainer
          center={[37.541142, 126.876678]}
          zoom={14}
          scrollWheelZoom={true}
          attributionControl={false}
          zoomControl={false}>
          <SetViewOnClick animateRef={true} />
          {bike_route !== undefined && ( //
            <ChangeView
              center={bikeDepStation} //
              zoom={14}
            />
          )}

          <TileLayer
            attribution='&copy; Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/yangoos/cl4dtnra5000115qqyeabj91d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA"
          />
          {result.map((marker, index) => {
            var type = Object.keys(marker)[0];
            if (type === "bus") {
              var icon = bus_icon;
            } else if (type === "bike") {
              var icon = bike_icon;
            } else {
              var icon = sub_icon;
            }
            return (
              <div key={index}>
                <Marker position={marker[type]} icon={icon()}>
                  <Popup direction="top" offset={[0, -10]}>
                    <div
                      style={{ background: "white", cursor: "pointer" }} //
                      onClick={() => {}}>
                      {" "}
                      경로 이동.
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}

          {/* 경로 */}
          {mapdata["walk_coor"] !== undefined && (
            <Polyline
              pathOptions={{ color: "red" }} //
              positions={mapdata["walk_coor"]}
            />
          )}
          {mapdata["dep_arr_bike"] !== undefined && (
            <Polyline
              pathOptions={{ color: "yellow" }} //
              positions={mapdata["dep_arr_bike"]}
            />
          )}

          {mapdata["sub_coor"] !== undefined && (
            <Polyline
              pathOptions={{ color: "purple" }} //
              positions={mapdata["sub_coor"]}
            />
          )}

          {mapdata["bus_coor"] !== undefined && (
            <Polyline //
              pathOptions={{ color: "white" }} //
              positions={mapdata["bus_coor"]}
            />
          )}

          {mapdata["bike_coor"] !== undefined && (
            <Polyline
              pathOptions={{ color: "green" }} //
              positions={mapdata["bike_coor"]}
            />
          )}

          {mapdata["bike_coor_2"] !== undefined && (
            <Polyline
              pathOptions={{ color: "purple" }} //
              positions={mapdata["bike_coor_2"]}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MlMapData;
