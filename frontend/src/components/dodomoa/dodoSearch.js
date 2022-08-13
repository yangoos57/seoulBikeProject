import React, { useState } from "react";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const checkCondition = (values, navigate) => {
  if (values["keyword"].length === 0 && values["library"].length === 0) {
    return window.alert("도서관 선택 및 키워드를 검색해 주세요");
  } else if (values["keyword"].length === 0) {
    return window.alert("키워드를 검색하세요! ex) 파이썬, matplotlib, pandas");
  } else if (values["library"].length === 0) {
    return window.alert("도서관을 선택해주세요!");
  } else {
    navigate({
      pathname: "/dodo/searchresult",
      search: `?${createSearchParams({
        keyword: values["keyword"],
        library: values["library"],
      })}`,
    });
  }
};

// alert 분별
const handleEnter = (event, values, navigate) => {
  if (event.key.toLowerCase() === "enter") {
    checkCondition(values, navigate);
  }
};
const clickButton = (values, navigate) => {
  checkCondition(values, navigate);
};
const DodoSearch = ({ placeholder, setCheckedInputs, values }) => {
  // 도서 검색 시 result 페이지 이동
  const navigate = useNavigate();

  return (
    <div className="flex-container" style={{ position: "relative" }}>
      <input
        onKeyDown={(e) => handleEnter(e, values, navigate)}
        placeholder={placeholder}
        className="m-auto search-dodo"
        onChange={(e) => setCheckedInputs(e.target.value)}
      />
      <div
        onClick={(e) => clickButton(values, navigate)}
        className="d-flex"
        style={{
          // backgroundColor: "white",
          backgroundColor: "#F2B13D",
          border: "0px",
          padding: "0px",
          position: "absolute",
          height: "65%",
          width: "15%",
          right: "1%",
          bottom: "17%",
          textDecoration: "none",
          cursor: "pointer",
        }}>
        <i className="fa fa-search fa-lg m-auto" aria-hidden="true" style={{ color: "#FFF5EA" }} />
      </div>
      {/* <Link
        to="searchresultasdsd"
        className="d-flex"
        state={values}
        style={{
          // backgroundColor: "white",
          backgroundColor: "#F2B13D",
          border: "0px",
          padding: "0px",
          position: "absolute",
          height: "65%",
          width: "15%",
          right: "1%",
          bottom: "17%",
          textDecoration: "none",
        }}>
        <i className="fa fa-search fa-lg m-auto" aria-hidden="true" style={{ color: "#FFF5EA" }} />
      </Link> */}
    </div>
  );
};
export default DodoSearch;
