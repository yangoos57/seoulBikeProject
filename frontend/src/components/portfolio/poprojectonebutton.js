import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { ReactComponent as SeoulIcon } from "./assets/seoulIcon.svg";
import { ReactComponent as MoonIcon } from "./assets/moonIcon.svg";
import { ReactComponent as DashIcon } from "./assets/dashIcon.svg";
export default function BasicButtonGroup() {
  return (
    <div
      className="d-flex my-auto justify-content-center"
      style={{ backgroundColor: "#ffffff99", borderRadius: "20px", height: "80px", width: "250px" }}>
      <Button>
        <Link className="poButton" to="/bktitle" target="_blank" rel="noopener noreferrer">
          <SeoulIcon className="my-auto mx-2" width={"60px"} height={"60px"} />
        </Link>
      </Button>
      <Button>
        {" "}
        <Link className="poButton" to="/mltitle" target="_blank" rel="noopener noreferrer">
          <MoonIcon className="my-auto mx-2" width={"60px"} height={"60px"} />
        </Link>
      </Button>
      <Button>
        {" "}
        <Link className="poButton" to="/dash" target="_blank" rel="noopener noreferrer">
          <DashIcon className="my-auto mx-2" width={"60px"} height={"60px"} />
        </Link>
      </Button>
    </div>
  );
}
