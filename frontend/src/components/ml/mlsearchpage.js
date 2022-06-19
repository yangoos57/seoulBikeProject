import React, { useState } from "react";
import MlSearch from "./mlsearch";
import MlSearch2 from "./mlsearch2";

const MlSearchPage = () => {
  "pageChange : 초기값 true, mlsearch1 listitem onclick시 false 반환";
  "이후 mlsearch2 searchbox에서 첫번째 창 onclick시 true 반환";
  "";

  const [pageChange, setPageChange] = useState(true);
  const [ClickedItemName, setClickedItemName] = useState("");
  const [searchTermStart, setSearchTermStart] = useState("");
  const [searchTermEnd, setSearchTermEnd] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  // console.log("출발 : ", departure);
  // console.log("도착 : ", arrival);
  if (arrival !== "" && departure !== "") console.log("hello world");

  return (
    <div className="flex-container flex-column">
      {pageChange ? (
        <MlSearch
          pageChange={pageChange}
          setPageChange={setPageChange}
          setClickedItemName={setClickedItemName}
          setSearchTermStart={setSearchTermStart}
          searchTermStart={searchTermStart}
          setDeparture={setDeparture}
        />
      ) : (
        <MlSearch2
          pageChange={pageChange}
          setPageChange={setPageChange}
          ClickedItemName={ClickedItemName}
          setSearchTermEnd={setSearchTermEnd}
          searchTermEnd={searchTermEnd}
          setArrival={setArrival}
        />
      )}
    </div>
  );
};

export default MlSearchPage;
