import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import BkTitleName from "./bktitlename";
import L from "leaflet";
import BkMapData from "./bkmapdata";
import "./assets/bkstyle.css";
import BkSelect from "./bkselect";
import { useLocation, useNavigate } from "react-router-dom";
import BkInfoBox from "./bkinfobox";
import bikegreen from "./assets/icons/bikegreen.svg";
import bikewhite from "./assets/icons/bikewhite.svg";
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function current_icon() {
  return L.icon({
    iconUrl: require("./assets/icons/current_icon.png"),
    iconSize: [55, 55],
    iconAnchor: [10, 35],
  });
}

// main function
function BkDeparture() {
  // 현재좌표 불러오기
  const [curLoca, setCurLoca] = useState([37.534863, 126.90241]);
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setCurLoca([crd.latitude, crd.longitude]);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  // 현재좌표 불러오기 여기까지

  //stationInfo = bksearch 값 저장=> 선택되면 여러 값들이 변함..
  const [stationInfo, setStationInfo] = useState(undefined);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function bikeIcon() {
    return L.icon({
      iconUrl: isMouseOn ? bikegreen : bikewhite,
      iconSize: [25, 25],
    });
  }

  const navigate = useNavigate();

  if (isClicked) {
    navigate("/bk/arrival", { state: stationInfo });
  }

  // 경로 검색 이후 다시 정보 받아서 /bk arrival로 쏘아주기
  const location = useLocation();
  console.log("??? :", location.state);
  if (location.state !== null) {
    var item = location.state;
  }
  useEffect(() => {
    setStationInfo(item);
  }, [item]);

  useEffect(() => {
    if (stationInfo !== undefined) console.log(JSON.parse(stationInfo["coor"]));
  }, [stationInfo]);
  return (
    <>
      <div className="whole-bk d-flex ">
        <div className="main-ml m-auto ">
          <div className="bg-white flex-column flex-container">
            <div className="flex-container flex-column" style={{ flexBasis: "30%" }}>
              <div className=" flex-container justify-content-between" style={{ flexBasis: "65%" }}>
                <div className="mx-2" style={{ flexBasis: "30%" }}>
                  <BkTitleName fontValue="30px" />
                </div>
                <div className=" flex-container mx-3" style={{ flexBasis: "30%" }}>
                  {/* weather Component */}
                  <div className="m-auto border border-2">날씨정보 API 넣기 </div>
                </div>
              </div>
              {stationInfo === undefined ? (
                <div
                  className="d-flex mx-auto"
                  style={{ flexBasis: "30%", border: "0.9px dashed black", width: "90%" }}>
                  <div className="m-auto" style={{ flexBasis: "100%" }}>
                    <BkSelect setStationInfo={setStationInfo} />
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex mx-auto"
                  style={{
                    flexBasis: "30%",
                    backgroundColor: isMouseOn ? "var(--green-color)" : "var(--silver-color)",
                    width: "80%",
                  }}>
                  <div
                    className="d-flex m-auto"
                    style={{
                      flexBasis: "100%",
                      fontSize: "22px",
                      color: "var(--black-color)",
                    }}>
                    <div className="m-auto">{stationInfo.label}</div>
                  </div>
                </div>
              )}
            </div>

            {/* 지도부분 */}
            <div className="flex-container" style={{ flexBasis: "70%", position: "relative" }}>
              {stationInfo !== undefined && (
                <BkInfoBox
                  setIsClicked={setIsClicked}
                  setIsMouseOn={setIsMouseOn}
                  isMouseOn={isMouseOn}
                  setReset={setStationInfo}
                  recordName={"대여소 이용기록"}
                  numOfRecord={stationInfo["num"]}
                  title={stationInfo["label"]}
                  numOfBike={stationInfo["time"]} //따릉이 API
                  ButtonTitle={"출발 대여소 지정"}
                />
              )}

              <BkMapData>
                {stationInfo === undefined ? (
                  <Marker position={curLoca} icon={current_icon()} />
                ) : (
                  <Marker position={JSON.parse(stationInfo["coor"])} icon={bikeIcon()} />
                )}
                {stationInfo === undefined ? (
                  <ChangeView
                    center={curLoca} //
                    zoom={14}
                  />
                ) : (
                  <ChangeView
                    center={JSON.parse(stationInfo["coor"])} //
                    zoom={14}
                  />
                )}
              </BkMapData>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BkDeparture;
