import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Popup, Marker, Tooltip, useMapEvent } from "react-leaflet";
import L, { map } from "leaflet";

// console.clear();

//화면 부드럽게 이동
function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}
const MlMapData = () => {
  //
  const [mapdata, setMapData] = useState("");
  // const showLine = useRef(false);
  const [poly, setPoly] = useState(false);
  useEffect(() => {
    axios.post("api/ml/leafletMap", { value1: 125, value2: 754 }).then((res) => setMapData(res.data));
  }, []);

  useEffect(() => {
    if (typeof mapdata === "object") {
      setPoly(true);
      console.log(mapdata);
    }

    // showLine.current = true;
  }, [mapdata]);

  function icon() {
    return L.icon({
      iconUrl: require("./assets/icons/Group 25.png"),
      iconSize: [35, 45],
    });
  }

  return (
    <div className="flex-container m-auto">
      <div className="map-ml">
        <MapContainer center={[37.541142, 126.876678]} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/yangoos/cl4dtnra5000115qqyeabj91d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA"
          />
          <Marker
            position={[37.541142, 126.876678]}
            icon={icon()}
            // eventHandlers={{ click: (e) => setClicked(e.target.id) }}
          >
            <Popup direction="top" offset={[0, -10]}>
              <div style={{ background: "white", cursor: "pointer" }} onClick={() => {}}>
                {" "}
                경로 이동.
              </div>
            </Popup>
          </Marker>
          {/* {poly === true ? <Polyline pathOptions={{ color: "orange" }} positions={mapdata["walk_coor"]} /> : ""} */}
          {/* {poly === true ? <Polyline positions={mapdata["bus_coor"]} /> : ""} */}
          {poly === true ? <Polyline pathOptions={{ color: "green" }} positions={mapdata["bike_coor"]} /> : ""}
          {/* {poly === true ? <Polyline pathOptions={{ color: "orange" }} positions={mapdata["bike_coor_2"]} /> : ""} */}
          <SetViewOnClick animateRef={true} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MlMapData;
