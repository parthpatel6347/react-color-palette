import sizes from "./sizes";

const styles = {
  "@global": {
    ".fade-exit": {
      opacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 300ms ease-out",
    },
  },
  root: {
    backgroundColor: "#323232",
    height: "calc(100vh - 88px);",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: "2.5rem",
    overflow: "scroll",
    overflowX: "hidden",
  },
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    [sizes.down("lg")]: {
      width: "65%",
    },
    [sizes.down("l")]: {
      width: "75%",
    },
    [sizes.down("md")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "85%",
    },
    [sizes.down("xxs")]: {
      width: "60%",
    },
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2.5rem",
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2,45%)",
      gridGap: "2rem",
    },
    [sizes.down("xxs")]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1.8rem",
    },
  },
  dialog: {
    borderRadius: "15px",
    backgroundColor: "#424242",
    paddingBottom: "0.3rem",
  },
  title: {
    color: "#cccccc",
    paddingBottom: "5px",

    "& p": {
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: "1.3rem",
      fontWeight: "400",
      margin: "0",
    },
  },
  listText: {
    color: "#cccccc",
    "& span": {
      fontFamily: "'Josefin Sans', sans-serif",
    },
  },
  listItem: {
    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
  },
};

export default styles;
