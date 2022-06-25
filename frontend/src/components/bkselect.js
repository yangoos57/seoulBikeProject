import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import ReactSelect, { components } from "react-select";
import { FixedSizeList as List } from "react-window";

const BkSelect = () => {
  const [bikeStation, setBikeStation] = useState([]);
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
      fontSize: 16,
      // backgroundColor : 'black'
    }),
    menu: (styles) => ({ ...styles }),
    input: (styles) => ({ ...styles, color: "white" }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      border: 0,
      width: "100%",
      display: "flex",
      flex: 1,
      overflow: "auto",
      fontSize: "16px",
      color: "white",
      boxShadow: "none",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "#F5F5F5";
      return { ...provided, opacity, transition, color };
    },
    placeholder: (styles) => ({ ...styles, color: "#F5F5F5" }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </components.DropdownIndicator>
    );
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
          {({ index, style }) => <div style={style}>{children[index]}</div>}
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
        components={{ MenuList, DropdownIndicator }}
      />
    </div>
  );
};

export default BkSelect;
