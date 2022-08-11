import React, { useState, useEffect } from "react";
import DodoMainFrame from "./dodoMainFrame";
import DodoSearch from "./dodoSearch";
import DoDominiLib from "./dodominiLib";
import DoDoBookList from "./dodoBookList";
import { useLocation } from "react-router-dom";

// const item = ["1", "2", "3"];
const item = [
  {
    url: "http://image.kyobobook.co.kr/images/book/large/359/l9791158393359.jpg",
    title: "SQL로 시작하는 데이터 분석",
    author: "이기창 지음",
    lib: ["양천 ", "강서 "],
    num: "005.1",
  },
  {
    url: "http://image.kyobobook.co.kr/images/book/large/359/l9791158393359.jpg",
    title: "SQL로 시작하는 데이터 분석",
    author: "이기창 지음",
    lib: ["양천 ", "강서 "],
    num: "005.1",
  },
  {
    url: "http://image.kyobobook.co.kr/images/book/large/359/l9791158393359.jpg",
    title: "SQL로 시작하는 데이터 분석",
    author: "이기창 지음",
    lib: ["양천 ", "강서 "],
    num: "005.1",
  },
  {
    url: "http://image.kyobobook.co.kr/images/book/large/359/l9791158393359.jpg",
    title: "SQL로 시작하는 데이터 분석",
    author: "이기창 지음",
    lib: ["양천 ", "강서 "],
    num: "005.1",
  },
];

function DoDoResultPage() {
  const [keyword2, setKeyword2] = useState([]);
  const location = useLocation();
  const depParams = location.state;
  console.log(depParams);
  return (
    <div className="flex-container flex-column mx-auto" style={{ width: "80%", position: "relative" }}>
      <div className="flex-container" style={{ height: "120px" }}>
        <DoDominiLib libs={["양천도서관", "강서도서관"]} />
      </div>
      <div className="flex-container mx-auto" style={{ flexBasis: "10%" }}>
        <DodoSearch placeholder="키워드를 검색하세요. ex) 파이썬, SQL" setCheckedInputs={setKeyword2} />
      </div>
      <div className="flex-container mx-auto" style={{ flexBasis: "70%" }}>
        <DoDoBookList item={item} />
      </div>
    </div>
  );
}

// Main Function
const DoDoResult = () => {
  return <DodoMainFrame children={DoDoResultPage()} />;
};

export default DoDoResult;
