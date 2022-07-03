import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";
export default function BasicButtonGroup() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>
        <Link className="poButton" to="/dash" target="_blank" rel="noopener noreferrer">
          따릉이로 동네투어
        </Link>
      </Button>
      <Button>
        {" "}
        <Link className="poButton" to="/ml" target="_blank" rel="noopener noreferrer">
          달빛 따릉이
        </Link>
      </Button>
      <Button>
        {" "}
        <Link className="poButton" to="/dash" target="_blank" rel="noopener noreferrer">
          따릉이 대시보드
        </Link>
      </Button>
    </ButtonGroup>
  );
}
