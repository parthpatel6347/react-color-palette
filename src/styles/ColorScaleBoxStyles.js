import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
  colorScaleBox: {
    width: "100%",
    flexGrow: "1",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    transition: "all .1s",
    alignItems: "center",
    "& p": {
      color: (props) =>
        chroma(props.color).get("lab.l") <= 60 ? "white" : "#4B4B4B",
      margin: "auto",
      opacity: "0",
      fontSize: ".85rem",
      fontWeight: "400",
      letterSpacing: "1px",
      position: "absolute",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    "&:hover": {
      flexGrow: "1.5",
      transition: "all .1s",
      [sizes.down("xs")]: {
        flexGrow: "1",
      },
    },
    "&:hover p": {
      opacity: "1",
      position: "relative",
      [sizes.down("xs")]: {
        display: "none",
      },
    },
  },
  copyContainer: {
    [sizes.down("xs")]: {
      height: "100%",
      width: "100%",
    },
  },
};

export default styles;
