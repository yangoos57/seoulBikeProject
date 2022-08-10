import React from "react";
// className="m-auto search-dodo"
const DodoSearch = ({ placeholder }) => {
  return (
    <div className="flex-container" style={{ position: "relative" }}>
      <input placeholder={placeholder} className="m-auto search-dodo" />
      <button
        style={{
          backgroundColor: "#F2B13D",
          border: "0px",
          position: "absolute",
          height: "65%",
          width: "15%",
          right: 1,
          bottom: 12,
        }}>
        <i className="fa fa-search fa-lg" aria-hidden="true" style={{ color: "#FFF5EA" }} />
      </button>
    </div>
  );
};
export default DodoSearch;
