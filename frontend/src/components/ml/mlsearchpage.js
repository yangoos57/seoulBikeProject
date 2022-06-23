import React, { useState } from "react";
import MlSearch from "./mlsearch";
import MlSearch2 from "./mlsearch2";
import { useNavigate } from "react-router-dom";

const MlSearchPage = () => {
  "pageChange : 초기값 true, mlsearch1 listitem onclick시 false 반환";
  "이후 mlsearch2 searchbox에서 첫번째 창 onclick시 true 반환";
  "ClickedItemName : mlsearch2에서 첫번째 검색 값에 넣는 변수. 다만들고 보니";
  "departure 변수를 사용해도 문제 없었음. 다만 4개를 전부 고쳐야하므로 현재는 귀찮아서 남겨둠";
  "searchterm start,end : input값 변화를 추적하는 용도 searchitem과 searchbox를 연결해줌";
  "departure,arrival : 최종 값을 저장하는 용도  두  값 모두 저장되면 다음 페이지로 넘어가도록 세팅";

  const [pageChange, setPageChange] = useState(true);
  const [ClickedItemName, setClickedItemName] = useState("");
  const [searchTermStart, setSearchTermStart] = useState("");
  const [searchTermEnd, setSearchTermEnd] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const navigate = useNavigate();
  // console.log("출발 : ", departure);
  // console.log("도착 : ", arrival);
  if (arrival !== "" && departure !== "") navigate("/ml/mapcard");

  return (
    <div className="whole-ml d-flex ">
      <div className="main-ml m-auto ">
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
      </div>
    </div>
  );
};

export default MlSearchPage;
