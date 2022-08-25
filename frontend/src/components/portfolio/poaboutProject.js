import React from "react";

const poProject = () => {
  return (
    <div className="">
      <div className="poSubTitle d-flex flex-column mb-3">PROJECTS</div>
      <div className="flex-column">
        {/* 프로젝트 목적 소개 */}

        <div className="d-flex justify-content-between">
          <div className="h6 my-auto ms-0" style={{ lineHeight: "30px" }}>
            프로젝트를 진행하며 데이터 분석, 머신러닝 파이프라인 구축, 웹 어플리케이션 개발부터 배포까지 전 과정을
            경험했습니다.
          </div>
        </div>
        <hr className="my-4 text-white" />
        {/* ---- */}
        {/* 세부항목 */}
        <div className="d-flex flex-column" style={{ fontSize: "17px" }}>
          {/* ---- */}
          {/* 실시간 위협상황 분석 및 지휘관 의사결정 지원 */}
          <div className="d-flex flex-column mb-5">
            <div className="me-auto mb-1 h5 NotoBold d-flex">
              <div>keyBert와 Word2Vec를 활용한 도서 검색 프로그램 개발</div>
              <a
                href="https://github.com/yangoos57/dodomoa"
                target="_blank"
                rel="noopener noreferrer"
                className="poGithubIcon ms-2">
                <i class="fa-brands fa-github fa-lg"></i>
              </a>
            </div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              <span style={{ fontsize: "14px !important" }}> 2022.07. - 2022.08.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">프로젝트 소개</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">keyBert와 Word2Vec를 활용해 키워드 기반의 도서 검색 기능 구현</li>
                  <li className="me-auto">
                    데이터 수집, 전처리, 모델 학습 및 저장 단계를 자동화하는 머신러닝 파이프라인 구축
                  </li>
                </ul>{" "}
              </div>
            </div>
            <div className="me-auto">
              <div className="me-auto h6 NotoBold">경험 및 느낀점</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">
                    word2vec 활용, 사용자 검색 키워드와 연관성 높은 키워드를 추출하여 도서 검색 정확도 향상
                  </li>
                  <li className="me-auto">
                    TF-IDF, Word2Vec, Bert 모델 이론 학습 및 문제해결을 위해 적용하며 모델 특징 및 장단점 이해
                  </li>
                  <li className="me-auto">데이터 수집에 Multi-Threading을 적용해 기존 대비 80% 이상 처리 시간 단축</li>
                  <li className="me-auto">Docker-Compose로 Django와 Mysql 연동 및 Azure로 배포</li>
                  <li className="me-auto">
                    {/* 프로젝트를 진행하며 텍스트 요약, 키워드 추출, 문서 분류에 있어서 NLP의 실용적 가치 파악 및 관심 증대 */}
                    머신러닝 관련해서 쓰기
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
                <span class="badge badgeGreen">Docker-compose</span>&nbsp;
                <span class="badge badgeGreen">Azure</span>
                &nbsp;
              </div>
            </div>
          </div>
          {/* ----- */}
          {/* 실시간 위협상황 분석 및 지휘관 의사결정 지원 */}
          <div className="d-flex flex-column mb-5">
            <div className="me-auto mb-1 h5 NotoBold">
              따릉이 대여기록 분석을 통한 집 인근 자전거 여행지 추천
              <a
                href="https://github.com/yangoos57/seoulBikeProject"
                target="_blank"
                rel="noopener noreferrer"
                className="poGithubIcon ms-2">
                <i class="fa-brands fa-github fa-lg"></i>
              </a>
            </div>
            <div className="me-auto mb-4" style={{ color: "gray" }}>
              <span style={{ fontsize: "14px !important" }}> 2022.06. - 2022.07.</span>
            </div>
            <div className="me-auto mb-3">
              <div className="me-auto h6 NotoBold">프로젝트 소개</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">
                    3,000만 건의 따릉이 대여기록을 분석해 동네 여행에 적합한 따릉이 대여소 추천
                  </li>
                  <li className="me-auto">상관관계 분석, Kmeans, DBSCAN을 적용해 대여소 추천 시스템 구현</li>
                  <li className="me-auto">프로젝트 결과물을 일상에서 활용하기 위해 웹 어플리케이션으로 제작</li>
                </ul>{" "}
              </div>
            </div>
            <div className="me-auto">
              <div className="me-auto h6 NotoBold">경험 및 느낀점</div>
              <div className="me-auto">
                <ul>
                  <li className="me-auto">
                    EDA를 통해 대여소 고도와 대여기록 간의 상관관계 파악 및 데이터 전처리에 활용
                  </li>
                  <li className="me-auto">
                    중첩 추천된 대여소를 제거하고 사용자에게 다양한 방향의 목적지를 추천하기 위해 KMeans 활용
                  </li>
                  <li className="me-auto">
                    따릉이 이용시간 및 이용거리 데이터에 대한 전처리 목적으로 DBSCAN 활용, 특정 군집을 추출해 목적지까지
                    정확한 예상도착시간 및 예상이동거리 계산
                  </li>
                  <li className="me-auto">
                    지리공간 분석 및 분석 결과를 지도에 반영하기 위한 시각화 툴(Leaflet.js, plotly) 숙달
                  </li>
                  <li className="me-auto">
                    React와 Django 연동 목적 REST API 활용 및 HTTP 규약, cors 등 관련 내용 학습{" "}
                  </li>
                  <li className="me-auto">Docker와 Azure를 활용해 웹어플리케이션 배포 및 트러블 슈팅</li>
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
