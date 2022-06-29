import React, { useEffect, useState } from "react";
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
    record: 100,
    time: 20,
    dist: 16,
  },
  {
    label: "당산역 ", //
    index: "1",
    coor: [37.544563, 126.92541],
    record: 101230,
    time: 21230,
    dist: 20,
  },
];
const initalfilter = {
  mintime: 0,
  maxtime: 0,
  minrecord: 0,
  maxrecord: 0,
  mindist: 0,
  maxdist: 0,
};

//main
function BkArrival() {
  const [isBoxOn, setIsBoxOn] = useState(false); // silder box on off
  const [isMouseOn, setIsMouseOn] = useState(false); // infobox color
  const [isClicked, setIsClicked] = useState(false); // infobox click
  const [clickedName, setClickedName] = useState(false); // filter name
  const [onTimes, setOnRecord] = useState(undefined); // rangeslider value
  const [onTime, setOnTime] = useState(undefined); // rangeslider value
  const [onDistance, setOnDistance] = useState(undefined); // rangeslider value
  const [clickedItem, setClickedItem] = useState(undefined); // marker info
  const [markerClicked, setMarkerClicked] = useState(undefined); // marker index for clicked
  const [markerHoveredIndex, setMarkerHoveredIndex] = useState(undefined); // marker index for hover
  const [arrMarkers, setArrMarkers] = useState(initialMarker); // items

  const location = useLocation();
  const depParams = location.state;

  function arrMarker() {
    return L.icon({
      iconUrl: arrmarker,
      iconSize: [15, 15],
    });
  }

  function clickMarker() {
    return L.icon({
      iconUrl: arrmarkerclick,
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
              <div
                className="filterBox"
                style={{
                  display: isBoxOn ? "inline" : "none", //
                }}>
                <div
                  className="slider"
                  style={{
                    visibility: isBoxOn
                      ? clickedName === "도착시간" //
                        ? "visible"
                        : "hidden"
                      : "hidden",
                  }}>
                  <BkRangeSlider min={0} max={20} onChange={setOnTime} unit={"분"} />
                </div>
                <div
                  className="slider"
                  style={{
                    visibility: isBoxOn
                      ? clickedName === "대여기록" //
                        ? "visible"
                        : "hidden"
                      : "hidden",
                  }}>
                  <BkRangeSlider min={30} max={2222} onChange={setOnRecord} unit={"건"} />
                </div>
                <div
                  className="slider"
                  style={{
                    visibility: isBoxOn
                      ? clickedName === "이동거리" //
                        ? "visible"
                        : "hidden"
                      : "hidden",
                  }}>
                  <BkRangeSlider min={111} max={11111} onChange={setOnDistance} unit={"km"} />
                </div>
              </div>

              {markerClicked !== undefined && (
                <BkInfoBox
                  setIsMouseOn={setIsMouseOn} //
                  setIsClicked={setIsClicked}
                  setReset={setMarkerClicked}
                  isMouseOn={isMouseOn}
                  recordName={"대여소 이용기록"}
                  numOfRecord={clickedItem["num"]}
                  title={clickedItem["label"]}
                  // numOfBike={clickedItem["time"]}
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
                      data={val} // options.data에서 나오는 값
                      key={val["index"]}
                      position={val["coor"]}
                      // icon={arrMarker() }
                      icon={
                        (val["index"] === markerHoveredIndex) | (val["index"] === markerClicked)
                          ? clickMarker()
                          : arrMarker()
                      }
                      eventHandlers={{
                        click: (e) => {
                          setClickedItem(e.target.options.data);
                          setMarkerClicked(e.target.options.data.index);
                        },
                        mouseover: (e) => {
                          setMarkerHoveredIndex(e.target.options.data.index);
                        },
                        mouseout: () => {
                          setMarkerHoveredIndex(-1);
                        },
                      }}>
                      <Tooltip direction="right" offset={[5, 40]}>
                        <div className="flex">
                          <div className="my-auto"> 대여소명 : {val["label"]}</div>
                          <div className="my-auto"> 대여기록 : {val["record"]} 건 </div>
                          <div className="my-auto"> 하루평균 : {Math.round(val["record"] / 365)} 건</div>
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
