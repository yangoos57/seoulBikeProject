import React, { useEffect, useState } from "react";
import axios from "axios";
import Cloud from "./assets/icons/cloud.png";
import Sunny from "./assets/icons/sunny.png";
import Rain from "./assets/icons/rain.png";
import Night from "./assets/icons/night.png";

const BtWeather = () => {
  const [temp, setTemp] = useState(undefined);
  const [weatherIcon, setWeatherIcon] = useState(undefined);
  const [sky, setSky] = useState("");
  const [rain, setRain] = useState("");
  const [state, setState] = useState("");
  const hour = new Date().getHours();

  useEffect(() => {
    axios.get("api/weather").then((res) => {
      console.log("hi", res.data);
      const data = res.data;
      if (data !== undefined) {
        setTemp(data[24].fcstValue);
        setSky(data[18].fcstValue);
        setRain(data[12].fcstValue);
      } else {
        console.log("error");
      }
    });
  }, []);
  useEffect(() => {
    if (rain === "") {
    } else if (rain !== "강수없음") {
      return setWeatherIcon(<img src={Rain} alt="" />), setState("강 수");
    } else if ((parseInt(sky) >= 0) & (parseInt(sky) <= "5")) {
      if ((hour >= 19) & (hour <= 24) || (hour >= 0) & (hour <= 6)) {
        return setWeatherIcon(<img src={Night} alt="" />), setState("맑 음");
      } else {
        return setWeatherIcon(<img src={Sunny} alt="" />), setState("맑 음");
      }
    } else if (sky > 5) {
      return setWeatherIcon(<img src={Cloud} alt="" />), setState("흐 림");
    }
  }, [temp]);

  return (
    <div className="m-auto w-100 weather justify-content-end">
      <div className="d-flex w-100 p-1" style={{ height: "60px" }}>
        <div className="m-auto" style={{ flexBasis: "10%" }}>
          {weatherIcon}
        </div>
        <div className="d-flex flex-column align-items-end pe-3" style={{ flexBasis: "60%" }}>
          <div className="fw-bold fs-7" style={{ color: "var(--black-color)" }}>
            {temp}℃
          </div>
          <div className="fw-bold fs-7" style={{ color: "var(--black-color)" }}>
            {" "}
            {state}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtWeather;
