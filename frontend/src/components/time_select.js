import React, { useEffect, useState } from "react";
import Select from "react-select";

function TimeSelect({ onChange, values }) {
  const [val, setVal] = useState("img_2");

  // select options
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
      boxShadow: "none",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const color = "rgba(0, 0, 0, 0.615)";
      const fontSize = 16;
      return { ...provided, opacity, transition, color, fontSize };
    },

    placeholder: (styles) => ({ ...styles, color: "rgba(0, 0, 0, 0.615)" }),
  };

  // 자동으로 평일 불러오기
  useEffect(() => {
    onChange(values[val]);
  }, [values]);

  return (
    <div>
      <Select
        styles={customStyles}
        options={[
          { value: "img_2", label: "평일" },
          { value: "img_4", label: "주말" },
        ]}
        onChange={(e) => {
          onChange(values[e.value]);
          setVal(e.value);
        }}
        defaultValue={{ value: "img_2", label: "평일" }}
      />
    </div>
  );
}

export default TimeSelect;
