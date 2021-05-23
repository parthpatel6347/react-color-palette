import sizes from "./sizes";

const styles = {
  colorScale: {
    height: "100%",
    width: "100%",
    position: "absolute",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflow: "hidden",
    zIndex: "2",
    [sizes.down("xs")]: {
      flexDirection: "row",
      height: "100%",
      zIndex: "2",
      width: "100%",
    },
  },
};

export default styles;
