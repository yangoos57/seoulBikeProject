import React from "react";

const poProject = () => {
  return (
    <div className="">
      <div className="poSubTitle d-flex flex-column mb-3">PROJECTS</div>
      <div className="flex-column">
        {/* 프로젝트 목적 소개 */}

        <div className="d-flex justify-content-between">
          <div className="h6 my-auto ms-0" style={{ lineHeight: "30px" }}>
            머신러닝 기반 MVP 개발 및 데이터 파이프라인 설계 역량을 기르기 위해 프로젝트를 진행했습니다. 일상의 문제에
            대해 머신러닝 툴을 활용해 실용적으로 적용할 수 있는 방법을 고민했습니다. 제목 우측 깃허브 아이콘을
            클릭하시면 프로젝트의 세부 설명과 코드가 있는 repository로 이동합니다.
          </div>
        </div>
        <hr className="my-4 text-white" />
        {/* ---- */}
        {/* 세부항목 */}
        <div className="d-flex flex-column" style={{ fontSize: "17px" }}>
          {/* ---- */}
          {/* 실시간 위협상황 분석 및 지휘관 의사결정 지원 */}
          <div className="d-flex flex-column mb-5">
            <div className="me-auto mb-1 h5 NotoBold">키워드에 기반한 도서 추천 프로그램 개발</div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              <span style={{ fontsize: "14px !important" }}> 2022.07. - 2022.08.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">프로젝트 소개</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">keyBert와 Word2Vec를 활용해 키워드 기반의 도서 추천 구현</li>
                  <li className="me-auto">매월 업데이트된 도서 목록을 자동으로 처리하는 ETL 파이프라인 구축</li>
                </ul>{" "}
              </div>
            </div>
            <div className="me-auto">
              <div className="me-auto h6 NotoBold">경험 및 성과</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">word2vec을 활용해 적은 개수의 키워드로도 도서 추천 정확도를 향상</li>
                  <li className="me-auto">ETL 파이프라인 구축 및 자동화를 경험하며 (데이터 정합성의 중요성) 인식</li>
                  <li className="me-auto">일상의 문제를 NLP를 적용해 해결하면서 NLP분야의 실용적 가치를 이해 </li>
                </ul>
              </div>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">사용 툴</div>
              <div>
                <span class="badge badgeGreen">keyBert</span>&nbsp;
                <span class="badge badgeGreen">Word2Vec</span>
                &nbsp;
                <span class="badge badgeGreen">React.js</span>&nbsp;
                <span class="badge badgeGreen">Django</span>
                &nbsp;
                <span class="badge badgeGreen">Docker</span>&nbsp;
                <span class="badge badgeGreen">Azure</span>
                &nbsp;
              </div>
            </div>
          </div>
          {/* ----- */}
          {/* 실시간 위협상황 분석 및 지휘관 의사결정 지원 */}
          <div className="d-flex flex-column mb-5">
            <div className="me-auto mb-1 h5 NotoBold">따릉이를 활용해 집 주변 여행지를 추천하는 프로그램 개발</div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              <span style={{ fontsize: "14px !important" }}> 2022.06. - 2022.07.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">프로젝트 소개</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">3,000만 건의 따릉이 대여기록을 분석해 동네 여행에 적합한 대여소를 추천</li>
                  <li className="me-auto">추천 알고리즘 내 KMeans와 DBSCAN을 활용 </li>
                </ul>{" "}
              </div>
            </div>
            <div className="me-auto">
              <div className="me-auto h6 NotoBold">경험 및 성과</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">클러스터링 기법 활용, 오염된 대여 데이터를 제거함으로써 추천 신뢰도 제고</li>
                  <li className="me-auto">지도 시각화 숙달...(내용추가) </li>
                  <li className="me-auto">
                    백엔드,프론트엔드 분야를 학습하고 숙달함으로서 MVP 개발에 대한 기초 역량 함양
                  </li>
                </ul>
              </div>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto mt-2 h6 NotoBold">사용 툴</div>
              <div>
                <span class="badge badgeGreen">KMeans</span>&nbsp;<span class="badge badgeGreen">DBSCAN</span>&nbsp;
                <span class="badge badgeGreen">React.js</span>&nbsp;<span class="badge badgeGreen">Leaflet.js</span>
                &nbsp;
                <span class="badge badgeGreen">Django</span>&nbsp;<span class="badge badgeGreen">Docker</span>&nbsp;
                <span class="badge badgeGreen">Azure</span>&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default poProject;
