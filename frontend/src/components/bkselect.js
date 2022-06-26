import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import ReactSelect, { components } from "react-select";
import { FixedSizeList as List } from "react-window";

const BkSelect = () => {
  const [bikeStation, setBikeStation] = useState([{ label: "여의나루 1번 출구 ", value: "0" }]);
  // useEffect(() => {
  //   axios.get("api/testing").then((res) => {
  //     setBikeStation(res.data);
  //   });
  // }, []);

  const style = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "black" : "gray",
      fontSize: "22px",
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
    }),
    input: (styles) => ({ ...styles, color: "black" }),
    container: (styles) => ({ ...styles, height: "100%", width: "100%", display: "flex" }),
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
      const fontSize = "22px";
      return { ...provided, opacity, transition, color, textAlign, fontSize };
    },
    placeholder: (styles) => ({ ...styles, color: "var(--black-color)", fontSize: "22px", textAlign: "center" }),
  };

  // selector options
  const height = 35;

  class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;

      return (
        <List height={maxHeight} itemCount={children.length} itemSize={height} initialScrollOffset={initialOffset}>
          {({ index, style }) => <div style={{ ...style }}>{children[index]}</div>}
        </List>
      );
    }
  }

  return (
    <div>
      <ReactSelect
        placeholder="출발 대여소 검색하기"
        options={bikeStation}
        styles={style}
        // components={{ MenuList, DropdownIndicator }}
        components={{ MenuList, DropdownIndicator: () => null, IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default BkSelect;
