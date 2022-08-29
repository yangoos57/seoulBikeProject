import React from "react";

const poWorkExperience = () => {
  return (
    <div>
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
        <hr className="my-1 text-white" />
        {/* 세부항목 */}
        <div className="d-flex flex-column" style={{ fontSize: "17px" }}>
          {/* 실시간 위협상황 분석 및 지휘관 의사결정 지원 */}
          <hr className="my-3 text-white" />
          {/* 항공무장 살상효과 분석 및 추천 */}
          <div className="d-flex flex-column mb-5">
            <div className="me-auto mb-2 h5 NotoBold">항공무장 피해효과 분석 및 항공무장 추천</div>
            <div className="me-auto mb-4" style={{ color: "grey", lineHeight: "20px" }}>
              분석팀장<span style={{ fontsize: "14px !important" }}> 2016.9. - 2019.12.</span>
            </div>

            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">업무 소개</div>
              <div className="me-auto">
                최적의 항공무장 추천을 위한 가설 수립, 데이터 추출, 통계 모델에 기반한 실험 및 결과 분석
              </div>
            </div>
            <div className="me-auto mt-2 h6 NotoBold">경험 및 성과</div>
            <ul>
              <li>분석 결과를 누구나 이해할 수 있도록 시각화 된 리포트 작성 및 유관부서와 커뮤니케이션</li>
              <li>공군작전계획 및 조종사 임무계획 수립 시 주요 근거자료로 활용되는 무기효과 분석자료 생산</li>
              <li>4인으로 구성된 팀을 리딩하며 분석 방향 수립, 업무 우선순위 선정 등 운영/계획 분야 경험(1년)</li>
              <li>표적 모델링에 필요한 시간을 감소시켜 이전 프로세스 대비 분석 시간 40% 단축(기여도 70%)</li>
              <li>프로세스 개선에 관한 업무 매뉴얼 작성 및 국방과학연구소 등 100여개 부서에 배포(기여도 100%)</li>
            </ul>
          </div>
          <div className="d-flex flex-column ">
            <div className="me-auto mb-1 h5 NotoBold">실시간 위협상황 분석 및 Data-driven 의사결정 지원</div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              데이터 분석가 <span style={{ fontsize: "14px !important" }}> 2019.12. - 2021.5.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">업무 소개</div>
              <div className="me-auto">실시간 위협 대응 부서에서 지휘관의 Data-driven 의사결정을 지원</div>
            </div>
            <div className="me-auto mt-2 h6 NotoBold">경험 및 성과</div>
            <ul>
              <li className="me-auto">실시간 수집 데이터를 바탕으로 위협상황을 분석하여 의사결정에 필요한 정보 생산</li>
              <li className="me-auto">
                북 미사일 발사 예측, 주변국 전투기 침범 예측 등 지휘관이 선제적 조치를 할 수 있는 인사이트 도출
              </li>
              <li className="me-auto">
                조종사, 항공관제사, 미 공군 정보팀 등 다양한 직군의 구성원들과 협업해 문제해결 방안 도출{" "}
              </li>
              <li className="me-auto">
                위협상황과 특이활동을 요약한 일일단위 정보보고서 작성 및 관련 내용 핵심 지휘부에 보고
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default poWorkExperience;
