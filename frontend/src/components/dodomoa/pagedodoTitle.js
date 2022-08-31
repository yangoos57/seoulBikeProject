import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "./assets/mainlogo.svg";
function DoDoTitle() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/dodo/main"), 1000);
  }, [navigate]);

  return (
    <>
      <div className="whole-dodo d-flex ">
        <div className="main-dodo m-auto ">
          <div className="flex-column flex-container">
            <div className="m-auto">
              <div className="d-flex btTitle">
                <img className="titleLogo fade-out-box-dodo" src={mainLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DoDoTitle;
