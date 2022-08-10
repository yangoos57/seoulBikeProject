import React from "react";
import mainLogo from "./assets/mainlogo.svg";
import DodoMainFrame from "./dodoMainFrame";
import DodoSearch from "./dodoSearch";
import DodoLibLabel from "./dodoLibLabel";

function DoDoLogo() {
  return (
    <div className="flex-container flex-column mx-auto" style={{ width: "80%" }}>
      <div className="d-flex mx-auto align-items-end" style={{ flexBasis: "30%" }}>
        <img width="200px" src={mainLogo} alt="" />
      </div>
      <div className="flex-container mx-auto mb-2" style={{ flexBasis: "10%" }}>
        <DodoSearch placeholder="키워드를 검색하세요. ex) 파이썬, SQL" />
      </div>
      <div className="flex-container mx-auto " style={{ flexBasis: "60%" }}>
        <div className="mx-auto libBox-dodo flex-column">
          <div class=" libBox-title-dodo" style={{ flexBasis: "18%" }}>
            <div className="m-auto">도서관을 선택하세요</div>
          </div>
          <div class="libBox-names-dodo">
            <DodoLibLabel />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Function
const DodoTitle = () => {
  return <DodoMainFrame children={DoDoLogo()} />;
};

export default DodoTitle;
