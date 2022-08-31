import React, { useEffect, useState } from "react";
import axios from "axios";
import Cloud from "../assets/icons/cloud.png";
import Sunny from "../assets/icons/sunny.png";
import Rain from "../assets/icons/rain.png";
import Night from "../assets/icons/night.png";

const BtWeather = () => {
  const [temp, setTemp] = useState(undefined);
  const [weatherIcon, setWeatherIcon] = useState(undefined);
  const [sky, setSky] = useState("");
  const [rain, setRain] = useState("");
  const [state, setState] = useState("");
  const hour = new Date().getHours();

  useEffect(() => {
    axios.get("api/weather").then((res) => {
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
      return setWeatherIcon(<img src={Rain} alt="" className="iconSize" />), setState("강 수");
    } else if ((parseInt(sky) >= 0) & (parseInt(sky) <= "5")) {
      if ((hour >= 19) & (hour <= 24) || (hour >= 0) & (hour <= 6)) {
        return setWeatherIcon(<img src={Night} alt="" className="iconSize " />), setState("맑 음");
      } else {
        return setWeatherIcon(<img src={Sunny} alt="" className="iconSize" />), setState("맑 음");
      }
    } else if (sky > 5) {
      return setWeatherIcon(<img src={Cloud} alt="" className="iconSize" />), setState("흐 림");
    }
  }, [temp]);

  return (
    <div className="flex-container justify-content-end">
      <div className="d-flex ms-auto my-auto weather" style={{ flexBasis: "65%" }}>
        <div className="d-flex" style={{ flexBasis: "40%" }}>
          <div className="m-auto">{weatherIcon}</div>
        </div>
        <div className="m-auto d-flex flex-column align-items-end pe-3" style={{ flexBasis: "60%" }}>
          <div className="fontSet">{temp}℃</div>
          <div className="fontSet"> {state} </div>
        </div>
      </div>
    </div>
  );
};

export default BtWeather;
