import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PoMainFrame from "./pomainframe";
import portrait from "./assets/portrait.png";
import { fontFamily } from "@mui/system";

const poHome = () => {
  return (
    <PoMainFrame>
      <div className="poabout">
        {/* <div className="h2"> </div> */}
        <div className="photoIntro">
          <div className="my-auto h4" style={{ flexBasis: "70%", lineHeight: "160%" }}>
            " 안녕하세요! 데이터에 죽고 데이터에 사는 남자
            <br />
            <strong>이시대의 천재 데이터분석가 이양우입니다.</strong>
            <div>제 별명은 염소새끼 입니다. 매에에에~"</div>
          </div>
          <div className="m-auto d-flex" style={{ flexBasis: "20%" }}>
            <img src={portrait} alt="" className="map-ml" />
          </div>
        </div>
        <div>
          <br />
          <br />
          <div className="poTitle pb-2">ABOUT ME</div>
          <div style={{ wordSpacing: "1px", letterSpacing: "1px" }}>
            안녕 나는 공군에서 5년동안 쐬빠지게 일... 하진 않았고 그냥 띵가띵가 하다가 전역했어. 그치만 이 시기는 내게
            중요한 마음의 힌트를 제공했어 그건 바로 데이터가 주는 가치를 열광적으로 실감했다는거야. 모두들 데이터의
            핵심을 분석이라고 생각하지? 그건 틀렸어. 왜냐구? 데이터 분석가는 데이터를 만지지 않는 이상 그저 그런 평범한
            회사원이거든. 하지만 데이터를 만지는 순간 매말랐던 생각들이 샘물 솟듯 콸콸 터지고 큰 우물을 형성하지 데이터
            분석가의 상상력은 끝이 없어. 대신 그 상상력을 뒷밭침 해야하는 데이터가 있어야겠지.
            <br />
            <br />
            <div>
              그런 데이터는 어떻게 얻냐구? 현재에는 알수 없어{" "}
              <strong>
                지금 축적하고 있는 데이터가 어떤 목적으로 분석이 되겠지하는 생각은 바보같은 생각이야. 데이터는 데이터
                분석가들이 아이디어를 샘솟게 하는 원천이지만 분석가 조차도 무슨 아이디어를 떠오를지 모르거든 그저
                데이터를
              </strong>{" "}
              가지고 논다는 마음으로 이것 저것 적용해보면서 어느순간 뽝 하는 인사이트가 떠오르거든 그게 언제올지 어떤
              생각인지 분석가 애비도 모른다는게 핵심이야 내 생각에 동의해? 그럼 날 뽑아
            </div>
          </div>
          <br />
          {/* <div>
            안녕 나는 공군에서 5년동안 쐬빠지게 일... 하진 않았고 그냥 띵가띵가 하다가 전역했어. 그치만 이 시기는 내게
            중요한 마음의 힌트를 제공했어 그건 바로 데이터가 주는 가치를 열광적으로 실감했다는거야. 모두들 데이터의
            핵심을 분석이라고 생각하지? 그건 틀렸어. 왜냐구? 데이터 분석가는 데이터를 만지지 않는 이상 그저 그런 평범한
            회사원이거든. 하지만 데이터를 만지는 순간 매말랐던 생각들이 샘물 솟듯 콸콸 터지고 큰 우물을 형성하지 데이터
            분석가의 상상력은 끝이 없어. 대신 그 상상력을 뒷밭침 해야하는 데이터가 있어야겠지. 그런 데이터는 어떻게
            얻냐구? 현재에는 알수 없어 지금 축적하고 있는 데이터가 어떤 목적으로 분석이 되겠지하는 생각은 바보같은
            생각이야. 데이터는 데이터 분석가들이 아이디어를 샘솟게 하는 원천이지만 분석가 조차도 무슨 아이디어를
            떠오를지 모르거든 그저 데이터를 가지고 논다는 마음으로 이것 저것 적용해보면서 어느순간 뽝 하는 인사이트가
            떠오르거든 그게 언제올지 어떤 생각인지 분석가 애비도 모른다는게 핵심이야 내 생각에 동의해? 그럼 날 뽑아
          </div> */}
        </div>
        <br />
        <div className="mx-auto my-5">
          <Button variant="contained" sx={{ backgroundColor: "var(--green-color)" }}>
            <Link to="/project" className="poButton">
              포트폴리오 보러가기 <i class=" ms-2 fa-solid fa-angle-right"></i>
            </Link>
          </Button>
        </div>
        <br />
        <br />
        <div>
          <div className="poTitle d-flex flex-column">BIO</div>
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
              공군 정보장교 복무
              {/* <ul>
                <li>정보분석담당(2018.12-2019.12)</li>
                <li>무기효과분석담당(2017.7-2018.12)</li>
              </ul> */}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </PoMainFrame>
  );
};

export default poHome;
