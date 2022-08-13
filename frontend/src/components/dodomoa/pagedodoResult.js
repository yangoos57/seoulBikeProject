import React, { useState, useEffect } from "react";
import DodoMainFrame from "./dodoMainFrame";
import DodoSearch from "./dodoSearch";
import DoDominiLib from "./dodominiLib";
import DoDoBookList from "./dodoBookList";
import { useSearchParams } from "react-router-dom";

const item = [
  {
    url: "http://image.kyobobook.co.kr/images/book/large/359/l9791158393359.jpg",
    title: "SQL로 시작하는 데이터 분석 데이터 분석 데이터 분석 데이터 분석",
    author: "이기창 지음 이기창 지음 이기창 지음 ",
    lib: "양천, 강서, 염창, 노량진 ",
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
  const [keyword, setKeyword] = useState("");
  const [libInfo, setLibInfo] = useState([]);
  const values = { keyword: keyword, library: libInfo };

  // get params
  const [searchParams] = useSearchParams();
  const searhedParams = [...searchParams];

  // lib 정보 가져오기
  const val = searhedParams
    .filter((e) => {
      if (e.includes("library")) return e;
    })
    .map((e) => {
      return e[1];
    });

  //default 값으로 searchParams에서 가지고 온 값 넣기
  useEffect(() => {
    setKeyword(searchParams.get("keyword"));
    setLibInfo(val);
  }, []);

  return (
    <div className="flex-container flex-column mx-auto" style={{ width: "80%", position: "relative" }}>
      <div className="flex-container" style={{ height: "100px" }}>
        <DoDominiLib libs={libInfo} checkedInputs={libInfo} setCheckedInputs={setLibInfo} />
        {console.log(keyword)}
      </div>
      <div className="flex-container mx-auto" style={{ flexBasis: "10%" }}>
        <DodoSearch placeholder={searchParams.get("keyword")} setCheckedInputs={setKeyword} values={values} />
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
