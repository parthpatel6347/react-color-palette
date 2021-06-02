import sizes from "./sizes";

const styles = {
  main: {
    paddingBottom: "2rem",
    display: "flex",
    width: "100%",
    textAlign: "center",
    [sizes.down("sm")]: {
      paddingBottom: "1rem",
    },
  },
  saveBtn: {
    marginTop: "1rem",
    width: "90px",
    height: "2rem",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: ".8rem",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "15px",
    background: "#0D66D0",
    paddingTop: "9px",
    [sizes.down("md")]: {
      fontSize: ".7rem",
      width: "80px",
      height: "1.8rem",
      borderRadius: "14px",
    },
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
