import React from "react";
import DodoMainFrame from "./dodoMainFrame";
import DodoSearch from "./dodoSearch";
import DoDominiLib from "./dodominiLib";
import DoDoBookList from "./dodoBookList";

// const item = ["1", "2", "3"];
const item = [
  {
    url: "http://image.kyobobook.co.kr/images/book/large/359/l9791158393359.jpg",
    title: "SQL로 시작하는 데이터 분석",
    author: "이기창 지음",
    lib: "양천도서관",
    num: "005.1",
  },
];

function DoDoLogo() {
  return (
    <div className="flex-container flex-column mx-auto" style={{ width: "80%" }}>
      <div className="flex-container" style={{ flexBasis: "15%" }}>
        <DoDominiLib />
      </div>
      <div className="flex-container mx-auto" style={{ flexBasis: "10%" }}>
        <DodoSearch placeholder="키워드를 검색하세요. ex) 파이썬, SQL" />
      </div>
      <div className="flex-container mx-auto" style={{ flexBasis: "70%" }}>
        <DoDoBookList item={item} />
      </div>
    </div>
  );
}

// Main Function
const DoDoResult = () => {
  return <DodoMainFrame children={DoDoLogo()} />;
};

export default DoDoResult;
