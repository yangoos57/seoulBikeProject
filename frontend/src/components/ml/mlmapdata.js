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
const MlMapData = ({ mapdata, change, children }) => {
  //marker 출발도착지 변수설정
  var bike_route = mapdata["bike"];
  if (bike_route !== undefined) {
    var bikeDepStation = bike_route[0];
    var bikeArrStation = bike_route[bike_route.length - 1];
  }

  var bus_route = mapdata["bus"];
  if (bus_route !== undefined) {
    var busArrStation = bus_route[0];
    var busDepStation = bus_route[bus_route.length - 1];
  }

  var sub_route = mapdata["sub"];
  if (sub_route !== undefined) {
    var subArrStation = sub_route[0];
    var subDepStation = sub_route[sub_route.length - 1];
  }
  var bike_route_2 = mapdata["bike2"];
  if (bike_route_2 !== undefined) {
    var bike2DepStation = bike_route_2[0];
    var bike2ArrStation = bike_route_2[bike_route_2.length - 1];
  }

  // 복잡하지만 bike2 때문에 어쩔 수 없다.
  // bus인 경우만 bike2가 있고 bus만 slide swipe이 가능하다.
  // slide swipe 변화는 change 라는 변수로 통제됨
  // chane on인 경우 filteredmarkers가, off인 경우 bike2markers가 선택된다.

  var markers = [
    { bike: bikeArrStation }, //
    { bike: bikeDepStation },
    { bus: busArrStation },
    { bus: busDepStation },
    { sub: subArrStation },
    { sub: subDepStation },
  ];
  var filteredmarkers = markers //
    .filter((marker) => {
      if (Object.values(marker)[0] !== undefined)
        //
        return marker;
    });
  var bike2markers = [
    { bike2: bike2ArrStation }, //
    { bike2: bike2DepStation },
  ];
  var result = change ? filteredmarkers : bike2markers;
  return (
    <div className="flex-container m-auto">
      <div className="map-ml">
        <MapContainer
          center={[37.12345, 126.876678]}
          zoom={12}
          scrollWheelZoom={true}
          attributionControl={false}
          zoomControl={false}>
          <SetViewOnClick animateRef={true} />
          {bike_route !== undefined && ( //
            <ChangeView
              center={change ? mapdata["center"] : mapdata["center2"]} //
              zoom={12}
            />
          )}

          {/* 현재위치 marker */}
          {bike_route === undefined ? children : ""}

          <TileLayer
            attribution='&copy; Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/yangoos/cl4dtnra5000115qqyeabj91d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA"
          />

          {result.map((marker, index) => {
            var type = Object.keys(marker)[0];
            if (type === "bus") {
              var icon = bus_icon;
            } else if (type === "bike" || type === "bike2") {
              var icon = bike_icon;
            } else {
              var icon = sub_icon;
            }
            return (
              <div key={index}>
                <Marker position={marker[type]} icon={icon()}></Marker>
              </div>
            );
          })}
          {/* 
          경로 
          change = bike2 선택
           */}

          {mapdata["sub"] !== undefined && (
            <Polyline
              pathOptions={{ color: "purple" }} //
              positions={mapdata["sub"]}
            />
          )}
          {change && mapdata["sub"] !== undefined && (
            <Polyline
              pathOptions={{ color: "purple" }} //
              positions={mapdata["sub"]}
            />
          )}

          {change && mapdata["bus"] !== undefined && (
            <Polyline //
              pathOptions={{ color: "white" }} //
              positions={mapdata["bus"]}
            />
          )}
          {change && mapdata["walk"] !== undefined && (
            <Polyline
              pathOptions={{ color: "red" }} //
              positions={mapdata["walk"]}
            />
          )}

          {change && mapdata["bike"] !== undefined && (
            <Polyline
              pathOptions={{ color: "green" }} //
              positions={mapdata["bike"]}
            />
          )}
          {!change && mapdata["bike2"] !== undefined && (
            <Polyline
              pathOptions={{ color: "yellow" }} //
              positions={mapdata["bike2"]}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MlMapData;
