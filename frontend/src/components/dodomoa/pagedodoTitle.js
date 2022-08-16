import mainLogo from "./assets/mainlogo.svg";
import DodoMainFrame from "./dodoMainFrame";
import DodoSearch from "./dodoSearch";
import DodoLibLabel from "./dodoLibLabel";
import { useState } from "react";

function DoDoLogo() {
  // 검색한 키워드 정보
  const [keyword, setKeyword] = useState([]);
  // 선택한 도서관 정보
  const [libInfo, setLibInfo] = useState([]);

  // 정보종합
  const values = { keyword: keyword, library: libInfo };

  return (
    <div className="flex-container flex-column mx-auto" style={{ width: "80%" }}>
      <div className="d-flex mx-auto align-items-end" style={{ flexBasis: "30%" }}>
        <img className="titleLogo" src={mainLogo} alt="" />
      </div>
      <div className="flex-container mx-auto mb-2" style={{ flexBasis: "10%" }}>
        <DodoSearch placeholder="키워드를 검색하세요. ex) 파이썬, SQL" setCheckedInputs={setKeyword} values={values} />
      </div>
      <div className="flex-container mx-auto " style={{ flexBasis: "60%" }}>
        <DodoLibLabel checkedInputs={libInfo} setCheckedInputs={setLibInfo} />
        {console.log(libInfo)}
      </div>
    </div>
  );
}

// Main Function
const DodoTitle = () => {
  return <DodoMainFrame children={DoDoLogo()} />;
};

export default DodoTitle;
