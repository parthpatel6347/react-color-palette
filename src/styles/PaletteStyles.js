import Slider from "@material-ui/core/Slider";
import sizes from "./sizes";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";

const styles = {
  root: {
    fontFamily: "'Josefin Sans', sans-serif",
    backgroundColor: "#323232",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  rootInit: {
    pointerEvents: "none",
    fontFamily: "'Josefin Sans', sans-serif",
    backgroundColor: "#323232",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    [sizes.down("xs")]: {
      alignItems: "flex-start",
      paddingTop: "40px",
    },
  },
  container: {
    width: "70%",
    height: "80%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#424242",
    borderRadius: "30px",
    overflow: "hidden",
    // boxShadow: " 20px 20px 60px #2b2b2b",
    [sizes.down("lg")]: {
      width: "80%",
      height: "70%",
    },
    [sizes.down("md")]: {
      width: "85%",
      height: "65%",
      borderRadius: "20px",
    },
    [sizes.down("sm")]: {
      flexDirection: "column",
    },
    [sizes.down("xs")]: {
      height: "80%",
    },
    [sizes.heightDown("lg")]: {
      height: "90%",
    },
    [sizes.heightDown("md")]: {
      height: "95%",
    },
  },
  colorsContainer: {
    height: "100%",
    width: "70%",
    display: "flex",
    [sizes.down("md")]: {
      width: "75%",
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "80%",
    },
    [sizes.down("xs")]: {
      flexDirection: "column",
    },
  },
  sidePanel: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "25%",
    padding: "0 2.5% 0",
    [sizes.down("md")]: {
      width: "20%",
    },
    [sizes.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: "20%",
      padding: "2.5% 0 2.5%",
    },
    [sizes.down("xs")]: {
      padding: "2.5% 0 2.5%",
    },
  },
  paletteName: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    [sizes.down("sm")]: {
      width: "40%",
    },
    [sizes.heightDown("sm")]: {
      height: "30%",
    },
    "& h1": {
      // display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "box",
      lineHeight: "33px", // to get ellipses on line 3
      lineClamp: "3",
      boxOrient: "vertical",
      height: "98px",
      color: "#979797",
      fontWeight: "500",
      [sizes.down("md")]: {
        fontSize: "24px",
      },
      [sizes.down("sm")]: {
        margin: "0 1rem 0 1.5rem",
        fontSize: "24px",
      },
      [sizes.down("xs")]: {
        fontSize: "20px",
      },
      [sizes.heightDown("md")]: {
        fontSize: "1.3rem",
      },
    },
  },
  adjustments: {
    height: "80%",
    color: "#979797",
    letterSpacing: ".08em",
    fontSize: ".8em",
    textTransform: "uppercase",
    "& p": {
      marginTop: "1em",
      marginBottom: "0",
    },
    [sizes.down("md")]: {
      fontSize: ".7em",
    },
    [sizes.down("sm")]: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "100%",
      width: "80%",
    },
    [sizes.heightDown("sm")]: {
      height: "70%",
    },
  },
  sliders: {
    [sizes.down("sm")]: {
      width: "40%",
    },
    [sizes.down("xs")]: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
      justifyContent: "space-around",
      width: "50%",
    },
  },
  radio: {
    [sizes.down("sm")]: {
      width: "40%",
    },
    [sizes.down("xs")]: {
      textAlign: "center",
      width: "30%",
    },
  },
  label: {
    marginTop: "2px",
    fontSize: "1em",
    fontFamily: "'Josefin Sans', sans-serif",
    letterSpacing: "0.08em",
    "&:hover": {
      color: "white",
    },
  },
};

const CustomSlider = withStyles({
  root: {
    color: "#979797",
    height: 8,
    marginBottom: "0",
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#3f51b5",
    border: "2px solid #2196f3",
    marginTop: -6,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    color: "#2196f3",
    // left: "calc(-50% + 4px)",
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider);

const CustomRadio = withStyles({
  root: {
    color: "#979797",
    "&$checked": {
      color: "#2196f3",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export { styles, CustomSlider, CustomRadio };
