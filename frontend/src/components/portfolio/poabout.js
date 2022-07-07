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
            {/* <div>
              <i className="fa-solid fa-quote-left" /> 데이터 분석은 발산과 수렴을 거쳐 하나의
            </div>
            <div className="ms-2">
              <strong className="poStrongTest"> 완전한 생각을 가능케 하는 과정</strong>이다.{" "}
              <i class="fa-solid fa-quote-right" />
            </div> */}
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
            공군에서 5년 간 데이터를 활용해 북한을 분석하는 업무를 담당하였습니다. 데이터 수집 부서, 분석 부서, 활용
            부서에 근무한 경험으로 데이터가 수집되고 활용되는 전반의 과정을 이해할 수 있었습니다. 감사하게도 이 기간동안
            미국의 정보기관과 함께 일하며 부서의 일원으로서 그들의 데이터 수집, 분석 체계를 활용해보는 경험을
            하였습니다. 이러한 경험들은 데이터의 중요성과 그 가치를 깨닫게 하는 밑바탕이 되었습니다. 데이터에 대한
            관심이 증가할수록 북한 뿐만 아니라 다양한 분야의 데이터를 다뤄보고 싶은 열망도 커졌습니다. 오랜 고민 끝에
            개인의 성장을 위해서 여러 분야의 데이터를 접하고 제한없이 분석할 수 있는 환경을 찾고자 결심했습니다.
            <div className="mt-4">
              무언가를 상상하는 일에 흥미를 느낍니다. 여러 분야의 데이터를 접하고자 하는 열망은 이러한 성향에
              기인합니다. 저는 데이터를 상상력을 자극하는 재료라 생각합니다. 데이터를 이리저리 만저보고 다양한 생각을
              접목하다보면 마르지 않는 우물처럼 생각이 끊임없이 떠오릅니다. 머리속에 가득찬 생각을 하나씩 점검하고
              줄여나가는 과정도 재밌습니다. 분석이 깊어질수록 생각이 구체화되고 하나의 논리체계가 정립되며 하나의 완전한
              생각을 가능케 하는 과정이기 때문입니다.
            </div>
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
