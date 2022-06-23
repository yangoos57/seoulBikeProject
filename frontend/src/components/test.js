import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";

function Test() {
  const sub = <Sub width="25" height="27" />;
  const bus = <Bus width="30" height="30" />;
  const bike = <Bike width="30" height="30" />;
  const [infoData, setInfoData] = useState(["0"]);
  const [datanew, setdatanew] = useState("");

  // useEffect(() => {
  //   axios.get("/api/departure_info").then((res) => setInfoData(res.data));
  // }, []);

  useEffect(() => {
    if (typeof infoData === "object") {
      function bike(asd) {
        return { ...asd, icon: bike };
      }
      function bus(asd) {
        return { ...asd, icon: bus };
      }
      function sub(asd) {
        return { ...asd, icon: sub };
      }
      const newData = [];
      infoData.filter((val) => {
        if (val.value < 3000) {
          return newData.push(bike(val));
        } else if (val.value > 4000) {
          return newData.push(bus(val));
        } else {
          return newData.push(sub(val));
        }
      });
      setdatanew(newData);
    }
  }, [infoData]);

  const options = [
    {
      value: 207,
      label: "207 여의도역 7번출구 대..",
    },
    {
      value: 3001,
      label: "208 여의도역 7번출구 대..22",
    },
  ];
  // console.log(infoData);
  // .map((val) => {
  //   newData.push(sib(val));
  // });

  // for (let num = 0; num < 2; num++) {
  //   console.log(num);
  // }

  // useEffect(() => {
  //   axios.get("/api/departure_info").then((res) => setInfoData(res.data));
  // }, []);

  // useEffect(() => {
  //   if (typeof infoData !== Array) {
  //     var a = Array.from(infoData).slice(0, 10);
  //     setusingdata(a);
  //     console.log("rendering");
  //     console.log(usingdata[0]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [infoData]);
  console.log(datanew);
  return <div className="fs-3"></div>;
}

export default Test;
