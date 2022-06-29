import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

function valuetext(value) {
  return `${value}°C`;
}

//main
export default function RangeSlider({ min = 0, max = 2, onChange, unit }) {
  const middle = Math.round(max / 2);
  const [value, setValue] = React.useState([0, max]);

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

  return (
    <div className="m-auto w-100">
      <Box sx={{ width: 300 }}>
        <Slider
          min={min}
          max={max}
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
          sx={{
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
          }}
        />
      </Box>
    </div>
  );
}
