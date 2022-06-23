import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SearchBoxMl = ({
  icon = true,
  placeholder,
  onChange = () => {},
  change,
  Ref = true,
  setPageChange = () => {},
}) => {
  "icon : true 화살표 아이콘 false 목적지 아이콘 화살표 아이콘은 이전 페이지 이동용";
  "placholder : placholder";
  "onChange : input 쓰여있는 값 제거 및 searchterm start&end 제거 목적";
  "change : input value에 넣는 값";
  "Ref : autofocus 기능. 정상작동해서 굳이 props로 넣을 필요 없을듯. 마지막에 제거하자";
  "setPageChange : 첫번째 검색창 클릭하면 true로 바뀌어서 첫번째 검색 화면으로 넘어감";

  // searchclick : auto focus 목적
  const searchclick = useRef();
  const focusing = () => searchclick.current.focus();

  useEffect(() => {
    focusing();
  }, []);

  return (
    <div
      style={{ position: "relative" }} //
      className="flex-container align-items-center"
      onClick={() => {
        change !== "" && onChange("");
        focusing();
      }}>
      <div className="search-box px-4 d-flex m-auto">
        <div className="search-box-inner mx-auto py-3 px-4 flex-item justify-content-start ">
          {icon ? (
            <Link to={"/ml"} style={{ color: "white" }} className="my-auto">
              <i className="fa-solid fa-angle-left fa-lg my-auto me-3"></i>
            </Link>
          ) : (
            <i className="fa-solid fa-location-dot fa-lg my-auto me-3"></i>
          )}
          <input
            value={change}
            ref={Ref && searchclick}
            type="text"
            placeholder={placeholder}
            className="search-input"
            onChange={(e) => onChange(e.target.value)}
            onClick={() => {
              setPageChange(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBoxMl;
