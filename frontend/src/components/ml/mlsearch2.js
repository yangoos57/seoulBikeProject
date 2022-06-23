import React, { useEffect, useState } from "react";
import SearchBoxMl from "./searchboxml";
import SearchItem from "./searchitem";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
import axios from "axios";

const MlSearch2 = ({ pageChange, setPageChange, ClickedItemName, searchTermEnd, setSearchTermEnd, setArrival }) => {
  // data 불러오기
  const bike = <Bike width="30" height="30" />;
  const options = [
    {
      value: 207,
      label: "207 여의도역 7번출구 대..",
      icon: bike,
    },
  ];
  // 받은 리스트
  const [infoData, setInfoData] = useState("");
  // img 추가
  const [dataNew, setDataNew] = useState(options);

  useEffect(() => {
    axios.get("api/selector_Options/").then((res) => setInfoData(res.data));
  }, []);

  useEffect(() => {
    if (typeof infoData === "object") {
      function bike_img(asd) {
        return { ...asd, icon: bike };
      }

      const newData = [];
      infoData.filter((val) => {
        newData.push(bike_img(val));
      });
      setDataNew(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoData]);

  useEffect(() => {
    setSearchTermEnd("");
    setArrival("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageChange]);

  return (
    <div className="flex-container flex-column">
      <div className="d-flex" style={{ height: "10%" }}></div>
      <div className="d-flex flex-column" style={{ height: "22%" }}>
        <SearchBoxMl
          icon={false} //
          placeholder={ClickedItemName}
          setPageChange={setPageChange}
        />
        <SearchBoxMl
          placeholder={"도착 대여소 검색"} //
          onChange={setSearchTermEnd}
          change={searchTermEnd}
          setPageChange={() => {}}
        />
      </div>
      <div
        className="d-flex fs-6 align-items-center justify-content-center"
        style={{ height: "5%", color: "#10E8C1B3", letterSpacing: "1px" }}
      >
        도착장소는 따릉이 대여소만 검색 가능합니다.
      </div>
      <div className="d-flex flex-column " style={{ height: "65%" }}>
        <SearchItem
          searchterm={searchTermEnd}
          options={dataNew}
          onClick={() => {}}
          appendDirection={setArrival}
          setClickedItemName={() => {}}
          setPageChange={() => {}}
        />
      </div>
    </div>
  );
};

export default MlSearch2;
