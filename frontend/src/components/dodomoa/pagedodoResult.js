import React, { useState, useEffect } from "react";
import DodoMainFrame from "./modules/dodoMainFrame";
import DodoSearch from "./modules/dodoSearch";
import DoDominiLib from "./modules/dodominiLib";
import DoDoBookList from "./modules/dodoBookList";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function DoDoResultPage() {
  const [item, setItem] = useState([
    {
      url: "",
      title: "",
      author: "",
      lib: "",
      num: "",
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
      console.log(res.data);
      setItem(res.data);
    });
  }, [searchParams]);

  const noSearchResult = () => {
    return (
      <div className=" d-flex resultBox-dodo px-2 w-100" style={{ color: "var(--background-dodo-color)" }}>
        <div className="d-flex m-auto flex-column ">
          <div className="h3 m-auto my-4 ">검색 결과가 없습니다.</div>
          <div className="m-auto noSearchInfo  mb-3">띄어쓰기 또는 쉼표로 키워드를 분류해주세요.</div>
          <div className="m-auto noSearchInfo ">특수문자 또는 숫자 검색은 불가합니다.</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-container flex-column mx-auto fade-in-box-dodo" style={{ width: "80%", position: "relative" }}>
      <div className="d-flex" style={{ flexBasis: "10%" }}>
        <DoDominiLib libs={libInfo} checkedInputs={libInfo} setCheckedInputs={setLibInfo} />
      </div>
      <div className="d-flex mx-auto" style={{ flexBasis: "10%", width: "100%" }}>
        <DodoSearch placeholder={searchParams.get("keyword")} setCheckedInputs={setKeyword} values={values} />
      </div>
      <div className="flex-container mx-auto" style={{ flexBasis: "75%" }}>
        {item[0].title === "null" ? noSearchResult() : <DoDoBookList item={item} />}
      </div>
    </div>
  );
}

// Main Function
const DoDoResult = () => {
  return <DodoMainFrame children={DoDoResultPage()} />;
};

export default DoDoResult;
