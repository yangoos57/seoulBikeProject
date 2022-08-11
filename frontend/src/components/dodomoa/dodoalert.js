import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };



  return (
    <div>
      <Snackbar
        anchorOrigin={{ "top", "center" }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={"top" + "center"}
      />
    </div>
  );
}
