import React, { useEffect, useRef, useState } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import BkTitleName from "./bttitlename";
import L from "leaflet";
import BkMapData from "./btmapdata";
import "./assets/btstyle.css";
import BkSelect from "./btselect";
import { useLocation, useNavigate } from "react-router-dom";
import BkInfoBox from "./btinfobox";
import bikegreen from "./assets/icons/bikegreen.svg";
import bikewhite from "./assets/icons/bikewhite.svg";
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-cluster";
import arrmarkerclick from "./assets/icons/arrmarkerclick.svg";
import BkWeather from "./btweather";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
// main function
function BtDeparture() {
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

  // 현재 위치 500m 반경 내 대여소 표시
  const initialMarker = [
    {
      label: "여의도역 ", //
      index: "0",
      coor: "[0, 0]",
      record: 100,
      time: 20,
      dist: 16,
    },
  ];
  const [near500m, setNear500m] = useState(initialMarker);

  useEffect(() => {
    if (curLoca !== [37.534863, 126.90241])
      axios.post("api/near500m", { value1: curLoca }).then((res) => setNear500m(res.data));
  }, [curLoca]);

  //stationInfo = bksearch 값 저장=> 선택되면 여러 값들이 변함..
  const [stationInfo, setStationInfo] = useState(undefined);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function bikeIcon() {
    return L.icon({
      iconUrl: isMouseOn ? bikewhite : bikegreen,
      iconSize: window.innerWidth > 1441 ? [40, 40] : [28, 28],
    });
  }
  function current_icon() {
    return L.icon({
      iconUrl: require("./assets/icons/current_icon.png"),
      iconSize: window.innerWidth > 1441 ? [80, 80] : [55, 55],
      iconAnchor: [10, 35],
    });
  }
  function arrMarker() {
    return L.icon({
      iconUrl: arrmarkerclick,
      iconSize: window.innerWidth > 1441 ? [26, 26] : [22, 22],
    });
  }

  const navigate = useNavigate();

  if (isClicked) {
    navigate("/bikeTour/arrival", { state: stationInfo });
  }

  // 경로 검색 이후 다시 정보 받아서 /bk arrival로 쏘아주기
  const location = useLocation();

  if (location.state !== null) {
    var item = location.state;
  }
  useEffect(() => {
    setStationInfo(item);
  }, [item]);

  const focusSelect = useRef();

  useEffect(() => {
    if (stationInfo === undefined) {
      focusSelect.current.focus();
    }
  }, [stationInfo]);

  return (
    <>
      <div className="btWhole d-flex ">
        <div className="btMain m-auto ">
          <div className="bg-white flex-column flex-container">
            <div className="flex-container flex-column" style={{ flexBasis: "30%" }}>
              <div
                className="d-flex justify-content-between mx-auto"
                style={{ flexBasis: "60%", width: "80%", height: "100%" }}>
                <div>
                  <BkTitleName />
                </div>
                <div className="flex-container " style={{ flexBasis: "60%" }}>
                  {/* weather Component */}
                  <BkWeather />
                </div>
              </div>
              {stationInfo === undefined ? (
                <BkSelect setStationInfo={setStationInfo} reference={focusSelect} />
              ) : (
                <div
                  onClick={() => setStationInfo(undefined)}
                  className="d-flex mx-auto btStationInfo"
                  style={{ backgroundColor: isMouseOn ? "var(--green-color)" : "var(--silver-color)" }}>
                  <div
                    className="d-flex m-auto fontSet"
                    style={{
                      flexBasis: "100%",
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
                  <Marker position={curLoca} icon={current_icon()} zIndexOffset={10} />
                ) : (
                  <Marker position={JSON.parse(stationInfo["coor"])} icon={bikeIcon()} zIndexOffset={2000} />
                )}
                {stationInfo === undefined ? (
                  <ChangeView
                    center={curLoca} //
                    zoom={15}
                  />
                ) : (
                  <ChangeView
                    center={JSON.parse(stationInfo["coor"])} //
                    zoom={15}
                  />
                )}
                <MarkerClusterGroup showCoverageOnHover={false} maxClusterRadius={50}>
                  {near500m.map((val, i) => {
                    return (
                      <Marker
                        data={val} // options.data에서 나오는 값
                        key={i}
                        zIndexOffset={1000}
                        position={JSON.parse(val["coor"])}
                        // icon={arrMarker() }
                        icon={arrMarker()}
                        eventHandlers={{
                          click: () => {
                            setStationInfo(val);
                          },
                        }}>
                        <Tooltip direction="right" offset={[5, 40]}>
                          <div className="m-1">
                            <div className="my-auto btTooltipInfo"> 대여소명 : {val["label"]}</div>
                            <div className="my-auto btTooltipInfo"> 대여기록 : {val["num"]} 건 </div>
                          </div>
                        </Tooltip>
                      </Marker>
                    );
                  })}
                </MarkerClusterGroup>
              </BkMapData>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BtDeparture;
