import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// alert 분별
const handleEnter = (event, values, navigate) => {
  if (event.key.toLowerCase() === "enter") {
    if (values["keyword"].length === 0 && values["lib"].length === 0) {
      return window.alert("도서관 선택 및 키워드를 검색해 주세요");
    } else if (values["keyword"].length === 0) {
      return window.alert("키워드를 검색하세요! ex) 파이썬, matplotlib, pandas");
    } else if (values["lib"].length === 0) {
      return window.alert("도서관을 선택해주세요!");
    } else {
      navigate("searchresult", { state: values });
    }
  }
};
const DodoSearch = ({ placeholder, setCheckedInputs, values }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-container" style={{ position: "relative" }}>
      <input
        onKeyDown={(e) => handleEnter(e, values, navigate)}
        placeholder={placeholder}
        className="m-auto search-dodo"
        onChange={(e) => setCheckedInputs(e.target.value)}
      />
      <Link
        to="searchresult"
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
      </Link>
    </div>
  );
};
export default DodoSearch;
