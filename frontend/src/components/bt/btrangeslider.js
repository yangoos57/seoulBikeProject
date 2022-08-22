import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

function valuetext(value) {
  return `${value}°C`;
}

//main
export default function RangeSlider({ min, max, onChange, unit }) {
  const middle = Math.round((max + min) / 2);
  const [value, setValue] = React.useState([0, 0]);

  React.useEffect(() => {
    setValue([min, max]);
  }, [min]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(event.target.value);
  };
  const marks = [
    {
      value: min,
      label: min + unit,
    },
    {
      value: middle,
      label: middle + unit,
    },
    {
      value: max,
      label: max + unit,
    },
  ];
  const sx1 = {
    color: "var(--green-color)",
    height: "15px",
    "& .MuiSlider-rail": {
      color: "var(--silver-color)",
    },
    "& .MuiSlider-markLabel": {
      color: "var(--silver-color)",
      fontSize: "24px",
      marginTop: "10px",
    },
    "& .MuiSlider-mark": {
      backgroundColor: "transparent",
      width: "20px",
    },
    "& .MuiSlider-thumb": {
      border: "1px solid var(--black-color)",
      width: "30px",
      height: "30px",
      "&:hover, &.Mui-focusVisible": {
        boxShadow: "0px 0px 0px 5px var(--green-color-30)",
      },
    },
    "&.Mui-focused": {
      boxShadow: "0px 0px 0px 5px var(--green-color-30)",
    },
  };
  const sx2 = {
    color: "var(--green-color)",
    height: "8px",
    "& .MuiSlider-rail": {
      color: "var(--silver-color)",
    },
    "& .MuiSlider-markLabel": {
      color: "var(--silver-color)",
    },
    "& .MuiSlider-mark": {
      backgroundColor: "transparent",
    },
    "& .MuiSlider-thumb": {
      border: "1px solid var(--black-color)",
      "&:hover, &.Mui-focusVisible": {
        boxShadow: "0px 0px 0px 5px var(--green-color-30)",
      },
    },
    "&.Mui-focused": {
      boxShadow: "0px 0px 0px 5px var(--green-color-30)",
    },
  };
  return (
    <div className="m-auto w-100">
      <Box sx={{ width: "72%" }}>
        <Slider
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
          sx={window.innerWidth > 1441 ? sx1 : sx2}
        />
      </Box>
    </div>
  );
}
