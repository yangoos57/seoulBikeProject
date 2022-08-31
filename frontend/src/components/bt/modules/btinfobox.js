import React from "react";
import { ReactComponent as Xbox } from "../assets/icons/xbox.svg";

const BtInfoBox = ({
  setIsMouseOn, //
  setIsClicked,
  setReset,
  isMouseOn,
  recordName,
  title,
  numOfRecord,
  estTime,
  estDist,
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
          className="m-auto px-5 pt-3 btInfoBox"
          style={{
            color: isMouseOn ? "var(--green-color)" : "var(--silver-color)",
            textAlign: "center",
          }}>
          {title}
          <div style={{ position: "absolute", right: "5%", top: "9%", cursor: "pointer" }}>
            <Xbox
              onClick={() => {
                setReset(undefined);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column btInfoBox"
        style={{
          flexBasis: "40%",
          color: "var(--silver-color)",
        }}>
        {estOn ? (
          <div className="m-auto fontSet">
            <div className="mb-1">예상시간 : {estTime} 분</div>
            <div>예상거리 : {estDist} km</div>
          </div>
        ) : (
          <div className="m-auto ">
            {recordName} : {numOfRecord.toLocaleString("en-US")} 건
          </div>
        )}
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
            <div className="m-auto btInfoBox">{ButtonTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtInfoBox;
