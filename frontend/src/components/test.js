import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Popup, Marker, Tooltip, useMapEvent } from "react-leaflet";
import "./assets/style.css";
import L from "leaflet";

//화면 부드럽게 이동
function SetViewOnClick({ animateRef }) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

function Test() {
  const [testclick, setTestclick] = useState(["asd", "2", "3", "asdasdads"]);
  const animateRef = useRef(true);
  const [clicked, setClicked] = useState(true);
  const blackOptions = { color: "white" };
  const asd = ["asd", "2", "3", "asdasdads"];
  function icon() {
    return L.icon({
      iconUrl: require("./assets/icons/Group 25.png"),
      iconSize: [35, 45],
    });
  }
  return (
    <div>
      <MapContainer center={[37.541142, 126.876678]} zoom={18} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/yangoos/cl4dtnra5000115qqyeabj91d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA"
        />
        <Marker
          id="123"
          position={[37.541142, 126.876678]}
          icon={icon()}
          eventHandlers={{ click: (e) => setClicked(e.target.id) }}
        >
          <Popup direction="top" offset={[0, -10]}>
            {testclick.map((asd) => {
              return (
                <div>
                  {asd}
                  <br />
                </div>
              );
            })}
            <div
              style={{ background: "white", cursor: "pointer" }}
              onClick={() => {
                setClicked(!clicked);
                console.log(!clicked);
              }}
            >
              {" "}
              경로 이동.
            </div>
          </Popup>
        </Marker>
        <Marker
          position={[37.537868, 126.881409]}
          // icon={clicked === 61 ? icon(25) : icon(22)}
          eventHandlers={{ click: (e) => setClicked(e.target._leaflet_id) }}
        >
          <Popup direction="top" offset={[0, -10]}>
            {testclick.map((asd) => {
              return (
                <div>
                  {asd}
                  <br />
                </div>
              );
            })}
          </Popup>
        </Marker>

        {/* <Polyline pathOptions={blackOptions} positions={multiPolyline} /> */}
        <SetViewOnClick animateRef={animateRef} />
      </MapContainer>
    </div>
  );
}

export default Test;
