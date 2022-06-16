import React, { useState, useRef, useEffect } from "react";
import "./assets/style.css";
import Selector from "./selector";
import parse from "html-react-parser";
import Custom_table from "./custom_table";
import TimeSelect from "./time_select";

function Main() {
  const [Img, setImg] = useState(0);
  const [stationInfo, setStationInfo] = useState({});
  const [plotly, setPlotly] = useState(0);
  const mounted = useRef(false);
  const [imgOn, setimgOn] = useState(false);
  const [timeSelect, setTimeSelect] = useState(0);

  console.clear();
  console.log(Img);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (Img === 0) {
        console.log("hello world");
      } else {
        setPlotly(parse(String(Img.plotly_1.div_data)));
      }
    }
  }, [Img]);
  useEffect(() => {
    if (plotly === 0) {
      console.log("loading...");
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

  return (
    <div className="wrap">
      <div className="header d-flex justify-content-center"></div>
      <div className="content">
        <div className="main">
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
                  <div className=" flex-item flex-column me-1">
                    <div className="left-col-thr-left border border-1 text-center gray-box">
                      <div className="my-2">하루 평균 이용건수</div>
                      <div>{Img.count_day} 건</div>
                    </div>
                    <div className="left-col-thr-left border border-1 text-center gray-box mt-1">
                      <div className="my-2">총 이용건수</div>
                      <div>{Img.count_all} 건</div>
                    </div>
                  </div>
                  <div className="flex-item border border-1 gray-box flex-column p-1">
                    <div className="text-center mx-auto pt-2">반납 대여 비율</div>
                    <div className="img-box">
                      <img
                        className="chart-image"
                        src={"data:image/png;base64," + Img.img_3}
                        alt=""
                      />
                    </div>
                    {/* <div>ssd</div> */}
                  </div>
                </div>
                <div className="left-col border border-1 gray-box d-flex mb-1 h-100">
                  <div className="flex-item flex-column">
                    <div className="fs-6 text-center bg-white me-1 p-3">요일별 이용량</div>
                    <div className="img-box me-1 bg-white">
                      <img
                        className="chart-image"
                        src={"data:image/png;base64," + Img.img_1}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex-item flex-column ">
                    <div className="fs-6 text-center bg-white ms-1 p-3 d-flex align-items-center">
                      <div className="col-7 my-0 text-end">시간별 이용량</div>
                      <TimeSelect onChange={setTimeSelect} value={Img} />
                    </div>
                    <div className="img-box ms-1 bg-white">
                      <img
                        className="chart-image"
                        src={"data:image/png;base64," + timeSelect}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="left-col d-flex h-100">
                  <div className="flex-item border border-1 flex-column gray-box me-1">
                    <div className=" pt-3 fs-7 text-center mb-2">
                      <i className="fa-solid fa-train-subway me-2 icon-gray"></i>가까운 지하철역
                    </div>
                    <div className="img-box">
                      <div className="chart-image">
                        {imgOn && (
                          <Custom_table
                            raw_data={JSON.parse(Img.table_1)}
                            style={{ padding: "0.2rem" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex-item border border-1 flex-column gray-box ms-1">
                    <div className=" pt-3 fs-7 text-center mb-2">
                      <i className="fa-solid fa-bicycle me-2 icon-gray"></i>자주가는 대여소
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
                    className="d-flex align-items-center justify-content-center"
                  >
                    <div className="box-green fs-7 p-2 w-100 mx-4 text-center fw-bold">
                      {" "}
                      <Selector
                        setStationInfo={setStationInfo}
                        stationInfo={stationInfo}
                        set_img={setImg}
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
        </div>
      </div>
    </div>
  );
}

export default Main;
