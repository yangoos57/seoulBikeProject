import React, { useEffect, useState } from "react";
import "./assets/btstyle.css";
import { Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import BkMapData from "./btmapdata";
import BkTitleName from "./bttitlename";
import BkFiltering from "./btfiltering";
import BkRangeSlider from "./btrangeslider";
import { useLocation } from "react-router-dom";
import arrmarker from "./assets/icons/arrMarker.svg";
import arrmarkerclick from "./assets/icons/arrmarkerclick.svg";
import bikegreen from "./assets/icons/bikegreen.svg";
import BkInfoBox from "./btinfobox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MarkerClusterGroup from "react-leaflet-cluster";
import BkWeather from "./btweather";

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, []);

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
    coor: "[0, 0]",
    record: 100,
    time: 20,
    dist: 16,
  },
  {
    label: "당산역 ", //
    index: "1",
    coor: "[0, 0]",
    record: 101230,
    time: 21230,
    dist: 20,
  },
];
const initalfilter = {
  mintime: undefined,
  maxtime: undefined,
  minrecord: undefined,
  maxrecord: undefined,
  mindist: undefined,
  maxdist: undefined,
};

//main
function BkArrival() {
  const [isBoxOn, setIsBoxOn] = useState(false); // silder box on off
  const [isMouseOn, setIsMouseOn] = useState(false); // infobox color
  const [isClicked, setIsClicked] = useState(false); // infobox click
  const [clickedName, setClickedName] = useState(undefined); // filter name
  const [clickedItem, setClickedItem] = useState(undefined); // marker info
  const [markerClicked, setMarkerClicked] = useState(undefined); // marker index for clicked
  const [markerHoveredIndex, setMarkerHoveredIndex] = useState(undefined); // marker index for hover
  const [arrMarkers, setArrMarkers] = useState(initialMarker); // items
  const [filterItem, setFilterItem] = useState(initalfilter); // items
  const [onRecord, setOnRecord] = useState([undefined, undefined]); // rangeslider value
  const [onTime, setOnTime] = useState([undefined, undefined]); // rangeslider value
  const [onDistance, setOnDistance] = useState([undefined, undefined]); // rangeslider value

  useEffect(() => {
    axios.post("api/info", { value: depParams["value"] }).then((res) => {
      setArrMarkers(res.data.data);
      setFilterItem(res.data.minmax);
      setClickedName("여행시간");
    });
  }, []);

  //filter default value
  useEffect(() => {
    setOnRecord([filterItem["minrecord"], filterItem["maxrecord"]]);
    setOnTime([filterItem["mintime"], filterItem["maxtime"]]);
    setOnDistance([filterItem["mindist"], filterItem["maxdist"]]);
  }, [filterItem]);

  const location = useLocation();
  const depParams = location.state;

  function arrMarker() {
    return L.icon({
      iconUrl: arrmarkerclick,
      iconSize: [18, 18],
      className: "svgTest",
    });
  }

  function clickMarker() {
    return L.icon({
      iconUrl: arrmarker,
      iconSize: [18, 18],
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isClicked === true) {
      navigate("/bikeTour/direction", { state: { dep: depParams, arr: clickedItem } }); //출도착정보 모두 넣어주기
    }
  }, [isClicked]);

  return (
    <>
      <div className="whole-bk d-flex ">
        <div className="main-ml m-auto ">
          <div className="bg-white flex-column flex-container">
            <div className="flex-container flex-column" style={{ flexBasis: "30%" }}>
              <div
                className="d-flex justify-content-between mx-auto"
                style={{ flexBasis: "60%", width: "80%", height: "100%" }}>
                <div className="">
                  <BkTitleName fontValue="28px" />
                </div>
                <div className="flex-container " style={{ flexBasis: "40%" }}>
                  {/* weather Component */}
                  <BkWeather></BkWeather>
                </div>
              </div>
              <div
                className="d-flex mx-auto"
                style={{
                  flexBasis: "40%",
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
                  <BkFiltering setClickedName={setClickedName} clickedName={clickedName} />
                </div>
              </div>
            </div>

            {/* 지도부분 */}
            <div className="flex-container" style={{ flexBasis: "70%", position: "relative" }}>
              <div
                className="filterBox"
                style={{
                  display: clickedName !== undefined ? "block" : "none", //
                }}>
                <div
                  className="slider"
                  style={{
                    visibility:
                      clickedName === "여행시간" //
                        ? "visible"
                        : "hidden",
                  }}>
                  <BkRangeSlider
                    min={filterItem["mintime"]}
                    max={filterItem["maxtime"]}
                    onChange={setOnTime}
                    unit={"분"}
                  />
                </div>
                <div
                  className="slider"
                  style={{
                    visibility:
                      clickedName === "대여기록" //
                        ? "visible"
                        : "hidden",
                  }}>
                  <BkRangeSlider
                    min={filterItem["minrecord"]}
                    max={filterItem["maxrecord"]}
                    onChange={setOnRecord}
                    unit={"건"}
                  />
                </div>
                <div
                  className="slider"
                  style={{
                    visibility:
                      clickedName === "여행거리" //
                        ? "visible"
                        : "hidden",
                  }}>
                  <BkRangeSlider
                    min={filterItem["mindist"]}
                    max={filterItem["maxdist"]}
                    onChange={setOnDistance}
                    unit={"km"}
                  />
                </div>
              </div>

              {markerClicked !== undefined && (
                <BkInfoBox
                  setIsMouseOn={setIsMouseOn} //
                  setIsClicked={setIsClicked}
                  setReset={setMarkerClicked}
                  isMouseOn={isMouseOn}
                  recordName={"대여소 이용기록"}
                  numOfRecord={clickedItem["record"]}
                  title={clickedItem["label"]}
                  estTime={clickedItem["time"]}
                  estOn={true}
                  ButtonTitle={"도착 대여소 선택"}
                />
              )}

              <BkMapData>
                <ChangeView
                  center={JSON.parse(depParams["coor"])} //
                  zoom={12}
                />
                <Marker position={JSON.parse(depParams["coor"])} icon={bikeIcon()} zIndexOffset={1000}>
                  <Tooltip direction="right" offset={[5, 40]} zIndexOffset={1000}>
                    <div className="p-1" style={{ backgroundColor: "var(--green-color)", color: "var(--black-color)" }}>
                      <div className="my-auto"> 대여소명 : {depParams["label"]}</div>
                      <div className="my-auto"> 대여기록 : {depParams["num"]} 건 </div>
                      <div className="my-auto"> 하루평균 : {Math.round(depParams["num"] / 365, 2)} 건</div>
                    </div>
                  </Tooltip>
                </Marker>
                <MarkerClusterGroup showCoverageOnHover={false} maxClusterRadius={50}>
                  {arrMarkers
                    .filter((val) => {
                      if (
                        (val["time"] >= onTime[0]) &
                        (val["time"] <= onTime[1]) &
                        (val["record"] >= onRecord[0]) &
                        (val["record"] <= onRecord[1]) &
                        (val["dist"] >= onDistance[0]) &
                        (val["dist"] <= onDistance[1])
                      ) {
                        return val;
                      }
                      // return val;
                    })
                    .map((val) => {
                      return (
                        <Marker
                          data={val} // options.data에서 나오는 값
                          key={val["value"]}
                          position={JSON.parse(val["coor"])}
                          // icon={arrMarker() }
                          icon={
                            (val["value"] === markerHoveredIndex) | (val["value"] === markerClicked)
                              ? clickMarker()
                              : arrMarker()
                          }
                          eventHandlers={{
                            click: (e) => {
                              setClickedItem(e.target.options.data);
                              setMarkerClicked(e.target.options.data.value);
                            },
                            mouseover: (e) => {
                              setMarkerHoveredIndex(e.target.options.data.value);
                            },
                            mouseout: () => {
                              setMarkerHoveredIndex(-1);
                            },
                          }}>
                          <Tooltip direction="right" offset={[5, 40]}>
                            <div className="m-1">
                              <div className="my-auto"> 대여소명 : {val["label"]}</div>
                              <div className="my-auto"> 대여기록 : {val["record"]} 건 </div>
                              <div className="my-auto"> 하루평균 : {Math.round(val["record"] / 365).toFixed(1)} 건</div>
                              <div className="my-auto"> 예상시간 : {val["time"]} 분</div>
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
export default BkArrival;
