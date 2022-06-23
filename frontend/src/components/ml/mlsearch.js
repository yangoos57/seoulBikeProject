import React, { useEffect, useState } from "react";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
import SearchBoxMl from "./searchboxml";
import SearchItem from "./searchitem";
import axios from "axios";

function MlSearch({
  pageChange,
  setPageChange,
  setClickedItemName,
  searchTermStart,
  setSearchTermStart,
  setDeparture,
}) {
  "list item에 들어갈 options 설정";
  " useeffect : 페이지 이동할때 쓰여있는 값들 자동으로 초기화하는 함수 pageChange는 왜 노란색일까 ";
  const sub = <Sub width="25" height="27" />;
  const bus = <Bus width="30" height="30" />;
  const bike = <Bike width="30" height="30" />;
  const options = [
    {
      value: 207,
      label: "207 여의도역 7번출구 대..",
      icon: bike,
    },
  ];

  const [infoData, setInfoData] = useState(options);
  const [datanew, setdatanew] = useState(options);

  useEffect(() => {
    axios.get("/api/departure_info").then((res) => setInfoData(res.data));
  }, []);

  useEffect(() => {
    if (typeof infoData === "object") {
      function bike_img(asd) {
        return { ...asd, icon: bike };
      }
      function bus_img(asd) {
        return { ...asd, icon: bus };
      }
      function sub_img(asd) {
        return { ...asd, icon: sub };
      }
      const newData = [];
      infoData.filter((val) => {
        if (val.value < 3000) {
          return newData.push(bike_img(val));
        } else if (val.value > 4000) {
          return newData.push(bus_img(val));
        } else {
          return newData.push(sub_img(val));
        }
      });
      setdatanew(newData);
      console.log(newData);
    }
  }, [infoData]);

  useEffect(() => {
    setSearchTermStart("");
    setDeparture("");
  }, [pageChange]);

  return (
    <div className="flex-container flex-column">
      <div className="d-flex" style={{ height: "10%" }}></div>
      <div className="d-flex" style={{ height: "11%" }}>
        <SearchBoxMl
          placeholder={"출발 대여소 검색"}
          onChange={setSearchTermStart} //
          change={searchTermStart}
          setPageChange={() => {}} //에러방지용
        />
      </div>

      <div className="d-flex flex-column " style={{ height: "80%" }}>
        <SearchItem
          searchterm={searchTermStart}
          options={datanew}
          setClickedItemName={setClickedItemName}
          setPageChange={setPageChange}
          appendDirection={setDeparture}
        />
      </div>
    </div>
  );
}

export default MlSearch;
