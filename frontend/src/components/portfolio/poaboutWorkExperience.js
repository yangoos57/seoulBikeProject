import React from "react";

const poWorkExperience = () => {
  return (
    <div className="mt-5">
      <div className="poSubTitle d-flex flex-column">WORK EXPERIENCE</div>
      <div className="flex-column">
        {/* 공군 항목 */}
        <div className="d-flex justify-content-between mt-4 NotoBold">
          <div className="h4 my-auto">
            공 군
            <span className="ms-2 h6" style={{ color: "gray" }}>
              5년 3개월
            </span>
          </div>
          <div className="h6 my-auto">2016.3 - 2021.5</div>
        </div>
        <hr className="my-3 text-white" />
        {/* 세부항목 */}
        <div className="d-flex flex-column" style={{ fontSize: "17px" }}>
          {/* 실시간 위협상황 분석 및 지휘관 의사결정 지원 */}
          <div className="d-flex flex-column ">
            <div className="me-auto mb-1 h5 NotoBold">실시간 위협상황 분석 및 지휘관 의사결정 지원</div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              데이터 분석가 <span style={{ fontsize: "14px !important" }}> 2019.12. - 2020.12.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">업무 소개</div>
              <div className="me-auto">
                실시간 위협 대응 부서에서 근무하며 지휘관의 Data-driven 의사결정을 지원했습니다.
              </div>
            </div>
            <div className="me-auto mt-2 h6 NotoBold">주요 업무 및 성과</div>
            <ul>
              <li className="me-auto">
                영상정보, 신호정보, 인간정보 등 다출처 정보를 종합적으로 분석하여 지휘관에게 필요한 정보 지원
              </li>
              <li className="me-auto">
                적 항공기 기동 패턴 분석 및 이동 경로 예측 등 아군이 선제적 대응을 할 수 있는 인사이트 도출
              </li>
              <li className="me-auto">
                실시간 수집 데이터 활용 위협상황 분석 및 유관부서와의 공유를 통한 신속대응태세 확립에 기여
              </li>
              {/* <li className="me-auto">
                한국방공식별구역 내 중•러 항공기 진입 시 실시간 수집된 데이터를 분석하여 지휘관에 제공함으로써 우리군의
                성공적인 대응조치에 기여
              </li> */}
            </ul>
          </div>
          <hr className="my-3 text-white" />
          {/* 항공무장 살상효과 분석 및 추천 */}
          <div className="d-flex flex-column mb-5">
            <div className="me-auto mb-2 h5 NotoBold">항공무장 살상효과 분석 및 무장 추천</div>
            <div className="me-auto mb-4" style={{ color: "grey", lineHeight: "20px" }}>
              효과분석팀장<span style={{ fontsize: "14px !important" }}> 2018.4. - 2019.12.</span>
            </div>

            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">업무 소개</div>
              <div className="me-auto">항공무장 살상효과 데이터를 분석해 표적에 적합한 항공무장을 추천했습니다.</div>
            </div>
            <div className="me-auto mt-2 h6 NotoBold">주요 업무 및 성과</div>
            <ul>
              <li>최적의 항공무장을 추천하기 위한 가설 수립 및 통계 모델 기반의 실험/검증</li>
              <li>분석 결과를 누구나 이해할 수 있도록 시각화 된 리포트 작성 및 유관부서와 커뮤니케이션</li>
              <li>분석 프로세스 개선 및 개선사항을 반영한 업무 매뉴얼 작성/전군 100여개 부서에 배포</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default poWorkExperience;
