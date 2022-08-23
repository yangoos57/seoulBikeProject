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
            <div className="me-auto mb-1 h5 NotoBold">keyBert와 Word2Vec를 활용한 도서 검색 프로그램 개발</div>
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
                  <li className="me-auto">
                    word2vec 활용, 사용자 검색 키워드와 연관성 높은 키워드를 추출하여 도서 검색 정확도 향상
                  </li>
                  <li className="me-auto">
                    TF-IDF, Word2Vec, Bert 등 NLP의 핵심 모델의 이론을 배우고 문제 해결을 위해 적용해보면서 개별 모델의
                    특징과 장단점을 이해했다.
                  </li>
                  <li className="me-auto">
                    ETL 파이프라인 구축 과정에서 여러 테이블에 있는 데이터를 활용해 원하는 테이블을 만드는 과정에서
                    다양한 시행 착오를 통해 MYSQL을 숙달
                  </li>
                  <li className="me-auto">
                    NLP 모델을 활용해 일상의 문제를 해결하는 과정에서 텍스트를 요약하는 분야에서 NLP의 실용적 가치를
                    이해
                  </li>
                  <li className="me-auto">
                    데이터 수집과 키워드 추출에 각각 Multi-Threading과 Multi-Processing을 적용해 기존 대비 80% 이상의
                    처리 시간을 단축했음{" "}
                  </li>
                  <li className="me-auto">
                    Docker-Compose를 사용해 Django와 Mysql 연동 및 AZURE에 웹 어플리케이션 업로드
                  </li>
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
            <div className="me-auto mb-1 h5 NotoBold">따릉이로 동네투어</div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              <span style={{ fontsize: "14px !important" }}> 2022.06. - 2022.07.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">프로젝트 소개</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">3,000만 건의 따릉이 대여기록을 분석해 동네 여행에 적합한 대여소를 추천</li>
                  <li className="me-auto">
                    상관관계 분석, Kmeans, dbscan을 적용해 여행 목적에 적합하지 않은 대여소 제거
                  </li>
                </ul>{" "}
              </div>
            </div>
            <div className="me-auto">
              <div className="me-auto h6 NotoBold">경험 및 성과</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">
                    따릉이 데이터에 서울 고도 데이터를 적용해 EDA를 진행, 대여소 고도와 대여 건수 간의 상관관계 파악,
                    이를 여행 적합하지 않은 대여소를 제거하는데 활용
                  </li>
                  <li className="me-auto">
                    자전거 이용시간, 이용거리를 DBSCAN을 활용해 군집화 한 뒤 선별하여 사용자에게 정확한 예상도착시간 및
                    예상 거리 정보를 제공
                  </li>
                  <li className="me-auto">분석, 프론트엔드 구현, 백엔드 구현, 클라우드에 업로드 등 경험</li>
                  <li className="me-auto">Kmeans를 활용해 중첩된 대여소들을 제거</li>
                  <li className="me-auto">REST API 사용 경험</li>
                  <li className="me-auto">
                    대여소를 지도에 띄우고 거리를 파악하고 Leaflet.js, plotlyy, folium 등 지도시각화 툴을 활용하면서 Geo
                    Spatial Analysis에 숙달 하였음
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
