import React, { useState, useEffect } from "react";
import DodoMainFrame from "./dodoMainFrame";
import DodoSearch from "./dodoSearch";
import DoDominiLib from "./dodominiLib";
import DoDoBookList from "./dodoBookList";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function DoDoResultPage() {
  const [item, setItem] = useState([
    {
      url: "",
      title: "123123",
      author: "12312313",
      lib: "1231231",
      num: "123123",
    },
  ]);
  const [keyword, setKeyword] = useState("");
  const [libInfo, setLibInfo] = useState([]);
  const values = { keyword: keyword, library: libInfo };

  // get params
  const [searchParams] = useSearchParams();
  const searchedParams = [...searchParams];
  // lib 정보 가져오기
  const val = searchedParams
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
  // searchedParams update 될때마다 실행
  useEffect(() => {
    axios.post("api/book", { keyword: searchParams.get("keyword"), library: val }).then((res) => {
      setItem(res.data);
    });
  }, [searchParams]);

  return (
    <div className="flex-container flex-column mx-auto" style={{ width: "80%", position: "relative" }}>
      <div className="flex-container" style={{ height: "100px" }}>
        <DoDominiLib libs={libInfo} checkedInputs={libInfo} setCheckedInputs={setLibInfo} />
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
