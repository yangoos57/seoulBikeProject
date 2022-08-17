import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PoMainFrame from "./pomainframe";
import portrait from "./assets/portrait.png";
import portraitMobile from "./assets/portraitMobile.png";

const poHome = () => {
  return (
    <PoMainFrame>
      <div className="poabout">
        <div className="photoIntro my-5">
          <div className="poTitle" style={{ flexBasis: "70%", lineHeight: "180%", wordSpacing: "1px" }}>
            {/* 제가 생각하는 데이터 분석이란 사방팔방으로 뻣어나가는 생각을 하나의 흐름으로 정제해나가는 과정입니다. */}
            {/* 데이터 분석은 생각의 발산과 수렴을 거쳐 하나의 완전한 생각을 가능케 하는 과정이다. */}
            <div>
              <i className="fa-solid fa-quote-left" /> 데이터 분석이란 <strong>발산하는 생각을</strong>
            </div>
            <div className="ms-5">
              <strong>하나의 흐름으로 수렴하는 과정</strong>이다. <i class="fa-solid fa-quote-right" />
            </div>
            <div className="mt-3">
              <span className="fs-5 fw-bold">Baby Goat</span>
              <span className="fs-6 fw-bold"> (1992 - )</span>
            </div>
          </div>
          <div className="m-auto d-flex pb-2" style={{ flexBasis: "40%" }}>
            <img src={portrait} alt="" className="pc map-ml" />
            <img
              src={portraitMobile}
              alt=""
              className="mobile map-ml"
              style={{ width: "100%", height: "60%", margin: 0 }}
            />
          </div>
        </div>
        <div className="my-5">
          <div className="poSubTitle pb-2">ABOUT ME</div>
          <div className="mb-2" style={{ wordSpacing: "1px", letterSpacing: "1px" }}>
            <div className="mt-4"></div>
          </div>
        </div>

        <div className="mx-auto my-5">
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "var(--green-color)",
              "&:hover": {
                backgroundColor: "var(--green-color-70)",
                borderColor: "#0062cc",
                color: "var(--silver-color)",
              },
            }}>
            <Link to="/project" className="poButton">
              포트폴리오 보러가기 <i class=" ms-2 fa-solid fa-angle-right"></i>
            </Link>
          </Button>
        </div>

        <div className="my-5">
          <div className="poSubTitle d-flex flex-column">BIO</div>
          <div className="d-flex my-2 jusity-content-envenly">
            <div style={{ flexBasis: "25%", fontFamily: "NEXON" }}>2012.3-2016.3</div>
            <div style={{ flexBasis: "70%" }}>공군사관학교 군사전략학 졸업 </div>
          </div>
          <div className="d-flex my-2 jusity-content-envenly">
            <div style={{ flexBasis: "25%", fontFamily: "NEXON" }}> 2015.12-2016.9</div>
            <div style={{ flexBasis: "70%" }}> 공군 비행훈련 입과 </div>
          </div>
          <div className="d-flex my-2 jusity-content-envenly">
            <div style={{ flexBasis: "25%", fontFamily: "NEXON" }}> 2016.9-2021.5</div>
            <div style={{ flexBasis: "70%" }}>
              {" "}
              공군 정보장교
              {/* <ul>
                <li>정보분석담당(2018.12-2019.12)</li>
                <li>무기효과분석담당(2017.7-2018.12)</li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </PoMainFrame>
  );
};

export default poHome;
