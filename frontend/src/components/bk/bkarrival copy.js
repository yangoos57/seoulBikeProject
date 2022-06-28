import React, { useEffect, useRef, useState } from "react";
import "./assets/bkstyle.css";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import BkMapData from "./bkmapdata";
import BkTitleName from "./bktitlename";
import BkFiltering from "./bkfiltering";
import BkRangeSlider from "./bkrangeslider";
import { useLocation } from "react-router-dom";
import arrmarker from "./assets/icons/arrMarker.svg";
import arrmarkerclick from "./assets/icons/arrmarkerclick.svg";
import bikegreen from "./assets/icons/bikegreen.svg";
import BkInfoBox from "./bkinfobox";
import { useNavigate } from "react-router-dom";
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function bikeIcon() {
  return L.icon({
    iconUrl: bikegreen,
    iconSize: [25, 25],
  });
}
const initialMarker = [
  {
    label: "여의도역 ", //
    index: "0",
    coor: [37.524563, 126.90541],
    num: 100,
    time: 20,
  },
  {
    label: "당산역 ", //
    index: "1",
    coor: [37.544563, 126.92541],
    num: 101230,
    time: 21230,
  },
];

//main
function BkArrival() {
  const [isBoxOn, setIsBoxOn] = useState(false);
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedName, setClickedName] = useState(false);
  const [onRecord, setOnRecord] = useState(undefined);
  const [onTime, setOnTime] = useState(undefined);
  const [onDistance, setOnDistance] = useState(undefined);
  const [clickedItem, setClickedItem] = useState(undefined);
  const [markerClicked, setMarkerClicked] = useState(false);
  const [markerHovered, setMarkerHovered] = useState(false);
  const [markerHoveredIndex, setMarkerHoveredIndex] = useState(undefined);
  const [arrMarkers, setArrMarkers] = useState(initialMarker);
  const location = useLocation();
  const depParams = location.state;

  function arrMarker() {
    return L.icon({
      iconUrl: markerClicked | markerHovered ? arrmarkerclick : arrmarker,
      iconSize: [15, 15],
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isClicked === true) {
      navigate("/bk/direction", { state: { dep: depParams, arr: clickedItem } }); //출*도착정보 모두 넣어주기
    }
  }, [isClicked]);

  return (
    <>
      <div className="whole-bk d-flex ">
        <div className="main-ml m-auto ">
          <div className="bg-white flex-column flex-container">
            <div className="flex-container flex-column" style={{ flexBasis: "30%" }}>
              <div className=" flex-container justify-content-between" style={{ flexBasis: "60%" }}>
                <div className="mx-2" style={{ flexBasis: "30%" }}>
                  <BkTitleName fontValue="30px" />
                </div>
                <div className=" flex-container mx-3" style={{ flexBasis: "30%" }}>
                  {/* weather Component */}
                  <div className="m-auto border border-2">날씨정보 API 넣기 </div>
                </div>
              </div>
              <div
                className="d-flex mx-auto"
                style={{
                  flexBasis: "30%",
                  width: "80%",
                }}>
                <div
                  className="flex-container m-auto "
                  style={{
                    flexBasis: "100%",
                    fontSize: "22px",
                    color: "var(--black-color)",
                  }}>
                  {/* filteringBox */}
                  <BkFiltering
                    setIsBoxOn={setIsBoxOn}
                    isBoxOn={isBoxOn}
                    setClickedName={setClickedName}
                    clickedName={clickedName}
                  />
                </div>
              </div>
            </div>

            {/* 지도부분 */}
            <div className="flex-container" style={{ flexBasis: "70%", position: "relative" }}>
              {/* filtering 내려오는 부분 */}
              {isBoxOn && (
                <div className="filterBox">
                  {clickedName === "도착시간" ? (
                    <div className="m-auto w-100">
                      <BkRangeSlider
                        value={{ middle: 20, max: 40 }}
                        unit="분"
                        setOnChange={setOnTime}
                        defaultValue={onTime}
                      />
                    </div>
                  ) : clickedName === "대여기록" ? (
                    <div className="m-auto w-100">
                      <BkRangeSlider
                        value={{ middle: 20000, max: 40000 }}
                        unit="건"
                        setOnChange={setOnRecord}
                        defaultValue={onRecord}
                      />
                    </div>
                  ) : (
                    <div className="m-auto w-100">
                      <BkRangeSlider
                        value={{ middle: 8, max: 16 }}
                        unit="km"
                        setOnChange={setOnDistance}
                        defaultValue={onDistance}
                      />
                    </div>
                  )}
                </div>
              )}
              {markerClicked && (
                <BkInfoBox
                  setIsMouseOn={setIsMouseOn} //
                  setIsClicked={setIsClicked}
                  setReset={setMarkerClicked}
                  isMouseOn={isMouseOn}
                  recordName={"대여소 이용기록"}
                  numOfRecord={clickedItem["num"]}
                  title={clickedItem["label"]}
                  numOfBike={clickedItem["time"]}
                  ButtonTitle={"도착 대여소 지정"}
                />
              )}

              <BkMapData>
                {/* <ChangeView
                  center={curLoca} //
                  zoom={14}
                /> */}
                <Marker position={[37.534863, 126.90241]} icon={bikeIcon()} />
                {arrMarkers.map((val) => {
                  return (
                    <Marker
                      data={val} // index로 활용하자
                      key={val["index"]}
                      position={val["coor"]}
                      icon={arrMarker()}
                      eventHandlers={{
                        click: (e) => {
                          setMarkerClicked(!markerClicked);
                          setClickedItem(e.target.options.data);
                        },
                        mouseover: (e) => {
                          setMarkerHovered(true);
                          setMarkerHoveredIndex(e.target.options.data.index);
                        },
                        mouseout: () => {
                          setMarkerHovered(false);
                        },
                      }}>
                      <Tooltip direction="right" offset={[5, 40]}>
                        <div className="flex">
                          <div className="my-auto"> 대여소명 : {val["label"]}</div>
                          <div className="my-auto"> 대여기록 : {val["num"]} 건 </div>
                          <div className="my-auto"> 하루평균 : {Math.round(val["num"] / 365)} 건</div>
                          <div className="my-auto"> 예상시간 : {val["time"]} 분</div>
                        </div>
                      </Tooltip>
                    </Marker>
                  );
                })}
              </BkMapData>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BkArrival;
