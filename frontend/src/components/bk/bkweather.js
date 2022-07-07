import React, { useEffect, useState } from "react";
import axios from "axios";
import Cloud from "./assets/icons/cloud.png";
import Sunny from "./assets/icons/sunny.png";
import Rain from "./assets/icons/rain.png";
import Night from "./assets/icons/night.png";

const BkWeather = () => {
  const [temp, setTemp] = useState(undefined);
  const [weatherIcon, setWeatherIcon] = useState(undefined);
  const [sky, setSky] = useState("");
  const [rain, setRain] = useState("");
  const [state, setState] = useState("");
  const key = "kweaR5p7XFQ3hpE2XziQSArbOXvFHfhOyD46cjNj1ntsPN%2B5agxteHVt6nU5Ur0OBxaVAlQYNMx9q8wEBMOdLw%3D%3D";
  const date = "20220706";
  const coor = [57, 127];
  const hour = new Date().getHours();
  const time = String(hour + "00");

  useEffect(() => {
    axios
      .get(
        `
      /1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${key}&pageNo=1&numOfRows=100&dataType=JSON&base_date=${date}&base_time=${time}&nx=${coor[0]}&ny=${coor[1]}
      
      `
      )
      .then((res) => {
        var data = res.data.response.body.items;
        console.log(data);
        if (data !== undefined) {
          setTemp(data.item[24].fcstValue);
          setSky(data.item[18].fcstValue);
          setRain(data.item[12].fcstValue);
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

export default BkWeather;
