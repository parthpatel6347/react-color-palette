import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
  root: {
    flexGrow: "1",
    height: "100%",
    display: "inline-block",
    position: "relative",
    margin: "0 auto",
    textTransform: "uppercase",
    overflow: "hidden",
    transition: "all .1s ease-in",
    "&:hover": {
      flexGrow: "2",
      transition: "all .1s ease-in",
      [sizes.down("xs")]: {
        flexGrow: "none",
      },
      "& $icons": {
        opacity: "0.6",
        [sizes.down("xs")]: {
          opacity: ".7",
        },
      },
    },
    "&:active": {
      [sizes.down("xs")]: {
        flexGrow: "2",
      },
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "unset",
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      marginTop: "1rem",
      fontSize: ".85rem",
      width: "70px",
      textAlign: "center",
      fontWeight: "500",
      [sizes.down("md")]: {
        fontSize: ".8em",
      },
      [sizes.down("xs")]: {
        bottom: "0",
        left: "0",
        position: "absolute",
        marginLeft: "0.5em",
        marginBottom: "0.5em",
        width: "unset",
        fontSize: ".8em",
      },
    },
    [sizes.down("xs")]: {
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  },
  icons: {
    marginTop: "30px",
    fontSize: "1rem",
    opacity: "0",
    "&:hover": {
      opacity: "1 !important",
      cursor: "pointer",
      transform: "scale(1.1)",
      transition: "0s",
    },
    [sizes.down("md")]: {
      fontSize: "0.8rem",
    },
    [sizes.down("xs")]: {
      fontSize: "1.3rem",
      marginTop: "unset",
    },
  },
  copiedMsg: {
    width: "100%",
    height: "0px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    position: "absolute",
    bottom: "0",
    opacity: "1",
    textAlign: "center",
    transition: "all .3s ease-in-out",
    "& h1": {
      fontSize: "1rem",
      fontWeight: "500",
      margin: "9px auto 0",
      [sizes.down("xs")]: {
        fontSize: ".9rem",
      },
    },
  },
  showCopiedMsg: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    height: "35px",
    transition: "all .3s ease-in-out",
    [sizes.down("xs")]: {
      height: "30px",
    },
  },
  checkIcon: {
    marginLeft: "5px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "rgba(2, 192, 2)",
  },
  dynamicColor: {
    color: (props) =>
      chroma(props.background).get("lab.l") <= 60 ? "white" : "#4B4B4B",
  },
};

export default styles;
