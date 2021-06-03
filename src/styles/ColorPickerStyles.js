import sizes from "./sizes";

const styles = {
  root: {
    touchAction: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    overflow: "hidden",
    width: "100%",
    border: "1px solid #323232",
    [sizes.down("sm")]: {
      height: "100%",
      width: "50%",
    },
    [sizes.down("xs")]: {
      width: "50%",
      height: "95%",
    },
    [sizes.heightDown("md")]: {
      height: "240px",
      width: "80% ",
    },
  },
  colorPicker: {
    width: "100% !important",
    background: "#424242 !important",
    boxShadow: "none !important",
    fontFamily: "'Josefin Sans', sans-serif !important",
    [sizes.down("sm")]: {
      height: "85%",
    },
  },
  addColorBtn: {
    width: "100% !important",
    fontFamily: "'Josefin Sans', sans-serif",
    height: "75px",
    fontSize: ".8rem",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "0",
    [sizes.down("lg")]: {
      height: "65px",
    },
    [sizes.down("md")]: {
      fontSize: ".7rem",
    },
    [sizes.down("xs")]: {
      fontSize: ".65rem",
      letterSpacing: "0.06rem",
      fontWeight: "600",
      height: "15%",
    },
    [sizes.heightDown("md")]: {
      height: "30%",
      fontSize: ".7rem",
      alignItems: "center",
      padding: 0,
    },
  },
  icon: {
    marginRight: "6px",
  },
  disabledBtn: {
    color: "#979797 !important",
  },
  popover: {
    color: "#b9b9b9",
    backgroundColor: "RGBa(37,37,37,0.9)",
    fontFamily: "'Josefin Sans', sans-serif",
    paddingRight: "1rem",
    paddingLeft: "1rem",
  },
};

export default styles;
