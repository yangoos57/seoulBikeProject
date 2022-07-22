import React from "react";

const BtDirctionInfo = ({ dep, arr }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "10%",
        backgroundColor: "var(--black-color)",
        height: "30%",
        width: "80%",
        zIndex: 1000,
        borderRadius: "5px",
        display: "flex",
      }}>
      <div
        className="d-flex flex-column p-2 justify-content-start ms-3" //
        style={{
          color: "var(--silver-color)", //
          paddingLeft: "20px",
          width: "90%",
          fontSize: "15px",
        }}>
        {/* 1 */}
        <div style={{ flexBasis: "5%" }}> </div>
        {/* 2 */}
        <div className="d-flex" style={{ flexBasis: "15%" }}>
          <div className="my-auto" style={{ fontFamily: "NEXON", flexBasis: "15%" }}>
            출발
          </div>
          <div className="my-auto ms-2" style={{ flexBasis: "80%" }}>
            {dep["label"]}
          </div>
        </div>
        {/* 3 */}
        <div className="my-2" style={{ flexBasis: "5%", marginLeft: "5px" }}>
          <i className="fa-solid fa-arrow-down"></i>
        </div>
        {/* 4 */}
        <div className="d-flex" style={{ flexBasis: "15%" }}>
          <div className="my-auto" style={{ fontFamily: "NEXON", flexBasis: "15%" }}>
            도착
          </div>
          <div className="my-auto ms-2" style={{ flexBasis: "80%" }}>
            {arr["label"]}
          </div>
        </div>
        {/* 5 */}
        <div className="p-1" style={{ flexBasis: "10%" }}></div>
        {/* 6 */}
        <div className="d-flex" style={{ flexBasis: "20%" }}>
          <div className="my-auto" style={{ fontFamily: "NEXON" }}>
            예상도착시간
          </div>
          <div className="my-auto ms-2" style={{ fontSize: "18px" }}>
            {arr["time"]} 분
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtDirctionInfo;
