import React, { useState, useEffect, Component } from "react";
import Select, { components } from "react-select";
import axios from "axios";
import { FixedSizeList as List } from "react-window";

function Selector({ set_img, stationInfo, setStationInfo }) {
  //state 정보
  const [stations, setStations] = useState([]);

  // 자료 요청하는 api
  // function img_load(value) {
  //   axios.post("http://localhost:8000/api/testing", { values: value }).then((res) => {
  //     set_img(res.data);
  //   });
  // }

  // list 요청하는 api station info가 바뀌면 set_img도 바뀜
  useEffect(() => {
    axios.post("http://localhost:8000/api/testing", { values: stationInfo.value }).then((res) => {
      set_img(res.data);
    });
  }, [stationInfo]);

  // list 요청하는 api
  useEffect(() => {
    axios.get("http://localhost:8000/api/selector_Options/").then((response) => {
      setStations(response.data);
    });
  }, []);

  // selector options
  const height = 35;

  class MenuList extends Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;

      return (
        <List
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }

  const customStyles = {
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
      border: 0,
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
  return (
    <div>
      <Select
        placeholder="대여소 번호 또는 이름을 검색해주세요."
        classNamePrefix="react-select"
        options={stations}
        styles={customStyles}
        components={{ MenuList, DropdownIndicator }}
        onChange={(e) => setStationInfo(e)}
        // onChange={(e) => img_load(e.value)}
      />
    </div>
  );
}

export default Selector;
