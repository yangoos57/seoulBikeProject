import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BkTitleName from "./bktitlename";
function BkTitle() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/bk"), 2500);
  }, []);

  return (
    <>
      <div className="whole-ml d-flex ">
        <div className="main-ml m-auto ">
          <BkTitleName />
        </div>
      </div>
    </>
  );
}
export default BkTitle;
