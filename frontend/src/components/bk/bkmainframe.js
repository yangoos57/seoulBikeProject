import React from "react";
import BkTitleName from "./bktitlename";
const BkMainFrame = ({ children, children2 }) => {
  return (
    <div className="whole-bk d-flex ">
      <div className="bg-white main-ml m-auto ">
        <div className="flex-column flex-container">
          <div className="flex-container flex-column" style={{ flexBasis: "30%" }}>
            <div className=" flex-container justify-content-between" style={{ flexBasis: "65%" }}>
              <div className="mx-2" style={{ flexBasis: "30%" }}>
                <BkTitleName fontValue="30px" />
              </div>
              <div className=" flex-container mx-3" style={{ flexBasis: "30%" }}>
                {/* weather Component */}
                <div className="m-auto border border-2">날씨정보 API 넣기 </div>
              </div>
            </div>
            {children}
          </div>
          <div className="flex-container" style={{ flexBasis: "70%", position: "relative" }}>
            {children2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkMainFrame;
