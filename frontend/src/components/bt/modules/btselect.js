import React, { Component, useEffect, useState } from "react";
import ReactSelect, { components } from "react-select";
import { FixedSizeList as List } from "react-window";
import axios from "axios";

const ValueContainer = ({ children, ...props }) => {
  // 화면 왼편에 돋보기 넣기
  return (
    components.ValueContainer && (
      <components.ValueContainer {...props}>
        {!!children && (
          <i
            className="fa fa-search fa-lg"
            aria-hidden="true"
            style={{ position: "absolute", left: 30, color: "var(--green-color)" }}
          />
        )}
        {children}
      </components.ValueContainer>
    )
  );
};
const BtSelect = ({ setStationInfo, reference }) => {
  const [bikeStation, setBikeStation] = useState([
    { label: "여의나루 1번 출구 ", value: "0" },
    { label: "여의나루 2번 출구 ", value: "1" },
  ]);
  useEffect(() => {
    axios.get("api/info").then((res) => {
      setBikeStation(res.data);
    });
  }, []);

  const style = {
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? "var(--black-color)" : "gray",
      color: "var(--black-color)",
      fontSize: "28px",
      fontFamily: state.isFocused ? "NEXON" : "NEXON Lighter",
      backgroundColor: state.isFocused ? "var(--green-color-70)" : "",
      width: "100%",
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 10000,
      textAlign: "center",
      fontSize: "28px",
      border: " 0.9px dashed black",
      borderTop: "0px",
      width: "100%",
      boxShadow: "0px",
      borderRadius: "0px",
    }),
    input: (styles) => ({ ...styles, height: "100%", paddingLeft: "15%", cursor: "text", fontSize: "28px" }),
    container: (styles) => ({
      ...styles,
      height: "100%", //
      width: "100%",
      display: "flex",
    }),
    control: (styles) => ({
      ...styles,
      border: "0px",
      width: "100%",
      boxShadow: "none",
      flexBasis: "100%",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "var(--black-color)";
      const textAlign = "center";
      const fontSize = "28px";
      return { ...provided, opacity, transition, color, textAlign, fontSize };
    },
    placeholder: (styles) => ({
      ...styles,
      color: "var(--black-color)",
      fontSize: "28px",
      textAlign: "center",
      fontFamily: "NEXON Lighter",
    }),
  };
  const style2 = {
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? "var(--black-color)" : "gray",
      color: "var(--black-color)",
      fontSize: "22px",
      fontFamily: state.isFocused ? "NEXON" : "NEXON Lighter",
      backgroundColor: state.isFocused ? "var(--green-color-70)" : "",
      width: "100%",
    }),
    menu: (styles) => ({
      ...styles,
      zIndex: 10000,
      textAlign: "center",
      fontSize: "22px",
      border: " 0.9px dashed black",
      borderTop: "0px",
      width: "100%",
      boxShadow: "0px",
      borderRadius: "0px",
    }),
    input: (styles) => ({ ...styles, height: "100%", paddingLeft: "18%", cursor: "text" }),
    container: (styles) => ({
      ...styles,
      height: "100%", //
      width: "100%",
      display: "flex",
    }),
    control: (styles) => ({
      ...styles,
      border: "0px",
      width: "100%",
      boxShadow: "none",
      flexBasis: "100%",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "var(--black-color)";
      const textAlign = "center";
      const fontSize = "20px";
      return { ...provided, opacity, transition, color, textAlign, fontSize };
    },
    placeholder: (styles) => ({
      ...styles,
      color: "var(--black-color)",
      fontSize: "22px",
      textAlign: "center",
      fontFamily: "NEXON Lighter",
    }),
  };

  // selector options
  const height = 45;

  class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;

      return (
        <List
          height={maxHeight} //
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}>
          {({ index, style }) => <div style={{ ...style, overflow: "hidden" }}> {children[index]}</div>}
        </List>
      );
    }
  }
  const chooseStyle = () => {
    // style = 해상도 1441 이상, style2는 이하
    if (window.innerWidth > 1441) return style;
    else return style2;
  };

  return (
    <div className="d-flex mx-auto btSelect">
      <div className="m-auto" style={{ flexBasis: "100%" }}>
        <div>
          <ReactSelect
            placeholder="출발 대여소 검색하기"
            options={bikeStation}
            // styles={chooseStyle()}
            styles={window.innerWidth > 1441 ? style : style2}
            components={{ MenuList, DropdownIndicator: () => null, IndicatorSeparator: () => null, ValueContainer }}
            onChange={(e) => setStationInfo(e)}
            ref={reference}
          />
        </div>
      </div>
    </div>
  );
};

export default BtSelect;
