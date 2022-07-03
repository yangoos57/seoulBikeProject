import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="my-auto">
      <Button onClick={handleClick} sx={{ color: "var(--silver-color)" }}>
        <i className="fa-solid fa-bars fa-lg"></i>
      </Button>
      <Menu
        sx={{ marginTop: "5px" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link className="poLink" to="/about">
            <div className="m-auto">Home</div>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Link className="poLink" to="/project">
            <div className="m-auto">Project</div>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a
            className="poLink"
            href="https://github.com/yangoos57" //
            target="_blank"
            rel="noreferrer noopener">
            <div className="m-auto">Github</div>
          </a>
        </MenuItem>
      </Menu>
    </div>
  );
}
