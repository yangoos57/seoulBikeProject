import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function BkTitle() {
  const style = {
    fontSize: "40px",
    fontFamily: "NEXON",
    lineHeight: "120%",
  };
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/bk/departure"), 2000);
  }, [navigate]);

  return (
    <>
      <div className="whole-ml d-flex ">
        <div className="main-ml m-auto ">
          <div className="bg-white flex-column flex-container">
            <div className="m-auto">
              <div className="d-flex" style={style}>
                <div className="h2" style={{ color: "#4FC276" }}>
                  따릉이
                </div>
                <div className="h2" style={{ color: "#191a3dcd" }}>
                  로
                </div>
              </div>
              <div className="d-flex" style={style}>
                <div className="h2" style={{ color: "#191a3dcd" }}>
                  동네
                </div>
                <div className="h2" style={{ color: "#4FC276" }}>
                  투어
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BkTitle;
