import React from "react";
import { ReactComponent as Xbox } from "./assets/icons/xbox.svg";

const BkInfoBox = ({
  setIsMouseOn, //
  setIsClicked,
  setReset,
  isMouseOn,
  recordName,
  title,
  numOfRecord,
  estTime,
  estOn,
  ButtonTitle,
}) => {
  return (
    <div
      className="d-flex flex-column"
      style={{
        position: "absolute",
        bottom: "5%",
        height: "35%",
        width: "80%",
        zIndex: 1000,
        backgroundColor: "var(--black-color)",
        left: "10%",
        borderRadius: "5px",
      }}>
      <div className="d-flex justify-content-end" style={{ flexBasis: "25%" }}>
        <div
          className="m-auto px-4 py-2"
          style={{
            color: isMouseOn ? "var(--green-color)" : "var(--silver-color)",
            fontSize: "18px",
          }}>
          {title}
          <div style={{ position: "absolute", right: "3%", top: "3%", cursor: "pointer" }}>
            <Xbox
              onClick={() => {
                setReset(undefined);
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column" style={{ flexBasis: "40%", color: "var(--silver-color)" }}>
        {estOn && <div className="m-auto py-1">예상시간 : {estTime} 분</div>}
        <div className="m-auto py-1">
          {recordName} : {numOfRecord.toLocaleString("en-US")} 건
        </div>
      </div>
      <div className="d-flex" style={{ flexBasis: "35%" }}>
        <div className="d-flex m-auto" style={{ flexBasis: "100%" }}>
          <div
            className="p-2 mb-1 mx-auto d-flex"
            style={{
              flexBasis: "50%",
              borderRadius: "5px",
              backgroundColor: isMouseOn ? "var(--green-color)" : "var(--silver-color)",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsClicked(true);
            }}
            onMouseOver={() => {
              setIsMouseOn(true);
            }}
            onMouseOut={() => {
              setIsMouseOn(false);
            }}>
            <div className="m-auto">{ButtonTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkInfoBox;
