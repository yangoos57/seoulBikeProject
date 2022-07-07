import React, { useState, useRef, useEffect } from "react";
import "./assets/style.css";
import Selector from "./selector";
import parse from "html-react-parser";
import Custom_table from "./custom_table";
import TimeSelect from "./time_select";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

function Main() {
  const [loading, setLoading] = useState(false);
  const [Img, setImg] = useState(0);
  const [stationInfo, setStationInfo] = useState({ label: "여의나루역 1번출구 앞" });
  const [plotly, setPlotly] = useState(0);
  const mounted = useRef(false);
  const [imgOn, setimgOn] = useState(false);
  const [timeSelect, setTimeSelect] = useState(0);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (Img === 0) {
      } else {
        setPlotly(parse(String(Img.plotly_1.div_data)));
      }
    }
  }, [Img]);

  useEffect(() => {
    if (plotly === 0) {
    } else {
      setimgOn(true);
      const script = document.createElement("script");
      script.innerHTML = String(Img.plotly_1.script_data);
      script.type = "text/javascript";
      script.async = "async";
      let temp = document.getElementsByClassName("plotly-graph-div");
      console.log("null? :", temp[0]);
      temp[0].classList.add("map-image");
      temp[0].appendChild(script);
    }
  }, [plotly]);

  // station 정보를 요청하는 api
  useEffect(() => {
    axios.get("ml/api/departureInfo").then((res) => {
      setStations(res.data);
    });
  }, []);

  // station 정보를 불러오면 default 값으로 여의나루역을 불러온다.
  useEffect(() => {
    axios.post("api/testing/", { values: 90 }).then((res) => {
      setImg(res.data);
      setLoading(true);
    });
  }, [stations]);

  return (
    <div className="wrap">
      <div className="header d-flex justify-content-center"></div>
      <div className="content">
        <div className="main">
          {loading ? (
            <div className="dash">
              <div className="space-box"></div>
              <div className="justify-content-evenly flex-item d-flex w-100">
                <div className="total-col"></div>
                <div className="total-col d-flex flex-column">
                  <div className="left-col my-3 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center">
                      <div className="box-green d-flex " style={{ width: "35px", height: "35px" }}>
                        <i className="fa-solid fa-bicycle m-auto icon-gray"></i>
                      </div>{" "}
                      <div className="flex-item fs-5 ms-2">따릉이 대여소</div>
                    </div>
                  </div>
                  <div className="left-col mb-1 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center gray-box fw-bold border border-2 py-2 px-3">
                      <div className="flex-item gray-box">{stationInfo.label}</div>
                    </div>
                  </div>
                  <div className="left-col mb-1 d-flex h-100">
                    <div className=" flex-item flex-column">
                      <div className="left-col-thr-left border border-1 text-center gray-box d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="mb-1">하루 평균 이용건수</div>
                          <div>{Img.count_day} 건</div>
                        </div>
                      </div>
                      <div className="left-col-thr-left border border-1 text-center gray-box mt-1 d-flex">
                        <div className="d-flex flex-column m-auto">
                          <div className="mb-1">총 이용건수</div>
                          <div>{Img.count_all} 건</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-item border border-1 gray-box flex-column ms-1">
                      <div className="text-center mx-auto pt-2">반납 대여 비율</div>
                      <div className="img-box d-flex">
                        <div className="d-flex" style={{ width: "60px" }}></div>
                        <img
                          className="chart-image"
                          style={{ width: "80%", objectFit: "contain" }}
                          src={"data:image/png;base64," + Img.img_3}
                          alt=""
                        />
                        <div className="d-flex flex-column justify-content-start h-100" style={{ width: "25%" }}>
                          <div className="d-flex w-100">
                            <div
                              className="my-auto me-1 pie_legend"
                              style={{
                                backgroundColor: "#35C768",
                              }}>
                              {" "}
                            </div>
                            <div className="flex-item my-auto ms-1" style={{ fontSize: 10 }}>
                              출발
                            </div>
                          </div>
                          <div className="d-flex w-100">
                            <div
                              className="pie_legend my-auto me-1"
                              style={{
                                backgroundColor: "#35C76880",
                              }}>
                              {" "}
                            </div>
                            <div className="flex-item my-auto ms-1" style={{ fontSize: 10 }}>
                              도착
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="left-col border border-1 bg-white d-flex mb-1 h-100">
                    <div className="flex-item flex-column justify-content-center">
                      <div className="fs-6 bg-white me-1 p-3 pb-4 text-center mt-1 ">요일별 이용량</div>
                      <div className="img-box me-1 bg-white">
                        <img className="chart-image" src={"data:image/png;base64," + Img.img_1} alt="" />
                      </div>
                    </div>
                    <div className="flex-item flex-column ">
                      <div className="fs-6 text-center bg-white ms-1 p-3 pb-4 d-flex align-items-center">
                        <div className="col-7 text-end">시간별 이용량</div>
                        <TimeSelect onChange={setTimeSelect} values={Img} />
                      </div>
                      <div className="img-box ms-1 bg-white">
                        <img className="chart-image" src={"data:image/png;base64," + timeSelect} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="left-col d-flex h-100">
                    <div className="flex-item border border-1 flex-column gray-box me-1">
                      <div className=" pt-2 fs-7 text-center mb-2">
                        <i className="fa-solid fa-train-subway me-2 icon-gray pt-2"></i>자주가는 지하철역
                      </div>
                      <div className="img-box">
                        <div className="chart-image">
                          {imgOn && <Custom_table raw_data={JSON.parse(Img.table_1)} />}
                        </div>
                      </div>
                    </div>
                    <div className=" flex-item border border-1 flex-column gray-box ms-1">
                      <div className=" pt-2 fs-7 text-center mb-2">
                        <i className="fa-solid fa-bicycle me-2 icon-gray pt-2"></i>자주가는 대여소
                      </div>
                      <div className="img-box">
                        <div className="chart-image">
                          {imgOn && <Custom_table raw_data={JSON.parse(Img.table_2)} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="total-col"></div>
                <div className="total-col d-flex flex-column">
                  <div className="flex-item w-100" style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: 80,
                        top: "7%",
                        left: "0",
                        background: "#ebeef280",
                        zIndex: 100,
                      }}
                      className="d-flex align-items-center justify-content-center">
                      <div className="box-green fs-7 p-2 w-100 mx-4 text-center fw-bold">
                        {" "}
                        <Selector
                          setStationInfo={setStationInfo}
                          stationInfo={stationInfo}
                          setImg={setImg}
                          stations={stations}
                        />{" "}
                      </div>
                    </div>
                    <div className="img-box" style={{ zIndex: 10 }}>
                      {plotly}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-box"></div>
            </div>
          ) : (
            <ClipLoader color={"#35C768"} size={150} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
