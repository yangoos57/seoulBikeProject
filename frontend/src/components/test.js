import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";

function Test() {
  const [InfoData, setInfoData] = useState("");
  useEffect(() => {
    axios.get("/api/ml/departureInfo").then((res) => setInfoData(res.data));
  }, []);
  console.log(InfoData);
  return <div className="fs-3"></div>;
}

export default Test;
