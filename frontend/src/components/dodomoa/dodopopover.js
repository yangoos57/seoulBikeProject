import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DodolibLabel from "./dodoLibLabel";

export default function BasicPopover({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="ms-auto libBox-mini-dodo"
        sx={{ backgroundColor: "transparent", color: "#4F4E4E", fontFamily: "NEXON", p: 0 }}>
        {name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Typography
          sx={{
            p: 0,
            width: "350px",
            height: "450px",
            "& .MuiPopover-paper": { backgroundColor: "transparent" },
          }}>
          <DodolibLabel />
        </Typography>
      </Popover>
    </div>
  );
}
