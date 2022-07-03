import React from "react";
import ProjectTwoSlider from "./projecttwoslider";

const ProjectTwo = () => {
  return (
    <div className="d-flex flex-column">
      <div className="poTitleBox">
        <div className="d-flex ">
          <div className="m-auto poTitle fs-3">&nbsp; 전쟁데이터 기반의 항공무기추천 &nbsp;</div>
        </div>
        <div className="ms-2 pt-3 fs-6" style={{ fontFamily: "NEXON" }}>
          2017.08 - 2018.12
        </div>
      </div>
      <br />
      <div>
        {/* <div className="poTitle">둘러보기 </div> */}
        <ProjectTwoSlider />
      </div>
      <br />
      <br />
      <div>
        <div className="poSubTitle"> 프로젝트 소개 </div>
        <div>
          2018년, 한국 국방부는 미국으로부터 베트남전쟁부터 누적해온 전쟁데이터, 무장 실험데이터와 이를 분석 할 수 있는
          프로그램을 구매하였습니다. 당시 공군은 수천만원~수십억원에 호가하는 항공무장을 효율적으로 운용하기 위한
          무기추천 프로세스를 운영중에 있었으나, 관련 데이터 부족으로 무기효과 분석가의 경험과 논리에 의해 진행되고
          있었습니다. 무기효과 데이터를 확보함에 따라서 경험에 기반한 무기추천 프로세스를 데이터에 기반한 무기추천
          프로세스로 전환할 필요가 있었습니다.
        </div>
        <br />
        <br />
      </div>

      <div>
        <div className="poSubTitle"> 주요역할 </div>
        <ul>
          <li>
            팀의 주요 업무로는 무기추천 프로세스 개발, 업무 매뉴얼 작성, 북한 모든 표적에 대한 무기추천 프로세스 수행이
            있었습니다.
          </li>
          <br />
          <li>저는 프로젝트 팀장으로 참여해 프로세스 개발 및 운영 절차 수립, 무기추천 매뉴얼 작성을 담당하였습니다.</li>
        </ul>
      </div>

      <br />
      <div className="d-flex flex-column">
        <div className="poSubTitle">주요성과</div>
        <ul style={{ lineHeight: "180%" }}>
          <li>
            <strong>프로세스를 단축하고 비효율을 개선했습니다.</strong> 기존 프로세스는 분석에 앞서 모델을 우선
            제작해야했습니다. 모델 제작과정은 전체 분석의 80% 이상의 시간을 차지했으며 분석관의 재량이 많이 들어감에
            따라 객관성 확보에 어려움이 있었습니다. 제작시간 단축과 객관성 확보를 위해, 수십년간 쌓아온 표적
            정보데이터를 바탕으로수만 여개의 북한 목표물을 카테고리화 하였고 유형별 대표 모델을 제작하였습니다. 유형별
            대표모델은 모델 제작에 들어가는 시간과 인력을 절감시켰고, 별도의 사전 작업 없이 신속하게 무기효과 분석을
            수행할 수 있게 됐습니다.
            <br />
            <br />
          </li>
          <li>
            누구나 분석 결과를 이해할 수 있도록 Classification 기준을 수립했습니다. 분석 프로그램은 Regression 기반의
            알고리즘으로 학습되었기 때문에 확률로 결과를 제공하여, 분석가 외에는 결과를 이해하기에 어려움이 있었습니다.
            확률기반의 분석 결과를 아군이 달성하고자 하는 목표(건물 파괴, 건물 내 인원 살상, 주요 장비 파괴, 작전 수행
            능력 마비 등)에 맞게 분류하여 누구든 무장의 효과를 이해할 수 있도록 개선하였습니다.
            <br />
            <br />
          </li>
          <li>
            배포한 무기추천 매뉴얼은 무장관련 기본자료로 활용되고 있습니다. 개정된 무기추천 절차, classification 기준,
            대표모델 제작 기준이 수록된 매뉴얼을 전군 150개 부서에 배포하였으며 전시 항공무장 비축량 계산, 연간 작전계획
            수립, 전투 조종사 교육 교재등 다양한 영역에서 활용되고 있습니다
            <br />
            <br />
          </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ProjectTwo;
