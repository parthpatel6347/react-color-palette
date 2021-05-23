import sizes from "./sizes";

const styles = {
  root: {
    backgroundColor: "#424242",
    fontFamily: "'Josefin Sans', sans-serif",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: "150px",
    "&:hover svg": { opacity: "0.7" },
    boxShadow: " 10px 10px 20px #282828",
    "&:hover": {
      boxShadow: " 3px 3px 5px #232323",
    },
  },
  palette: {
    backgroundColor: "grey",
    height: "75%",
    width: "100%",
    display: "flex",
  },
  title: {
    height: "25%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    fontSize: "1rem",
    position: "relative",
    padding: "0 12px 0",
  },
  name: {
    color: "#979797",
    fontWeight: "500",
    paddingTop: "4px",
    width: "85%",
    fontSize: ".95rem",
    height: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  miniColor: {
    height: "100%",
    flexGrow: "1",
  },
  deleteIcon: {
    color: "grey",
    opacity: "0",
    "&:hover": {
      color: "#eb3d30",
      opacity: "1",
      transform: "scale(1.1)",
    },
    [sizes.down("sm")]: {
      opacity: "1",
    },
  },
};

export default styles;
