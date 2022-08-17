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
        <div className="">
          <div className="poSubTitle pb-2">ABOUT ME</div>
          <div className="mb-2" style={{ wordSpacing: "1px", letterSpacing: "1px", fontFamily: "NEXON" }}>
            공군사관학교를 졸업하고 정보장교로 5년간 한미연합부서에서 데이터분석가 업무를 담당했습니다. 전역 후 머신러닝
            기반의 mvp 제작 역량과 데이터 파이프라인을 구현 역량을 기르기 위해 스스로 커리큘럼을 구상해 필요한 내용을
            학습하고 프로젝트를 진행했습니다.
            <div className="mb-2"></div>
            데이터 분야에서 이루고 싶은 목표가 있습니다. 데이터 조직을 신설해 시스템을 갖춘 조직으로 성장시키는 경험을
            하고 싶습니다. 현재도 앞으로 목표를 이루기 위해 끊임없이 배우고 경험할 것입니다.
          </div>
        </div>

        <div className="my-5">
          <div className="poSubTitle d-flex flex-column mb-3">Work Experience</div>
          <div className="d-flex my-2 jusity-content-envenly">
            <div className="d-flex flex-column" style={{ flexBasis: "30%", fontFamily: "NEXON", fontSize: "20px" }}>
              <div style={{ fontSize: "24px" }}>공 군</div>
              <div style={{ fontSize: "18px" }}>2016.3 - 2021.5</div>
              <div style={{ color: "gray", fontSize: "17px" }}>5년 3개월</div>
            </div>
            {/* 항공무장 살상효과 분석 및 추천 */}
            <div className="d-flex flex-column" style={{ flexBasis: "70%", fontSize: "18px" }}>
              <div className="d-flex flex-column mb-5">
                <div className="me-auto" style={{ fontSize: "24px", fontFamily: "NEXON" }}>
                  항공무장 살상효과 분석 및 무장 추천
                </div>
                <div className="me-auto" style={{ color: "gray" }}>
                  정보단 무장추천팀 팀장
                </div>
                <div className="me-auto mb-2" style={{ color: "gray" }}>
                  2018.6. - 2019.12.
                </div>
                <div className="me-auto">
                  <div className="me-auto" style={{ fontFamily: "NEXON" }}>
                    업무 소개
                  </div>
                  장교 2명, 부사관 2명으로 구성된 분석팀의 팀장을 역임했습니다. 항공무기의 살상효과 데이터를 분석해
                  표적에 적합한 항공무장을 추천했습니다.
                </div>
                <div className="me-auto mt-2" style={{ fontFamily: "NEXON" }}>
                  주요 업무 및 성과
                </div>
                <ul>
                  <li className="me-auto">
                    최대 살상효과를 달성하는 항공무장을 선정하기 위한 가설 수립 및 통계 모델 기반의 실험/검증
                  </li>
                  <li className="me-auto">
                    분석 결과를 누구나 이해할 수 있도록 시각화 된 리포트 작성 및 유관부서와 커뮤니케이션
                  </li>
                  <li className="me-auto">
                    분석 프로세스 개선 및 개선사항을 반영한 업무 매뉴얼 작성 / 전군 100여개 부서에 배포
                  </li>
                </ul>
              </div>
              {/* 항공무장 살상효과 분석 및 추천 */}
              <div className="d-flex flex-column">
                <div className="me-auto" style={{ fontSize: "24px", fontFamily: "NEXON" }}>
                  실시간 위협상황 분석 및 지휘관 의사결정 지원
                </div>
                <div className="me-auto mb-2" style={{ color: "gray" }}>
                  작전사 전투운영팀 데이터분석가(2019.12. - 2020.12.)
                </div>
                <div className="me-auto" style={{ fontFamily: "NEXON" }}>
                  업무 소개
                </div>
                <div className="me-auto">
                  실시간 위협 대응 부서에서 근무하며 지휘관의 Data-driven 의사결정을 지원했습니다.
                </div>
                <div className="me-auto mt-2" style={{ fontFamily: "NEXON" }}>
                  주요 업무 및 성과
                </div>
                <ul>
                  <li className="me-auto">
                    영상정보, 신호정보, 전자정보, 인간정보 등 다출처 정보를 종합적으로 분석하여 지휘관에게 필요한 정보
                    지원
                  </li>
                  <li className="me-auto">
                    적 항공기 기동 패턴 분석 및 이동 경로 예측 등 아군이 선제적 대응을 할 수 있는 인사이트 도출
                  </li>
                  <li className="me-auto">실시간 수집되는 정보를 기반의 위협상황 분석 및 합참, 육군</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PoMainFrame>
  );
};

export default poHome;
