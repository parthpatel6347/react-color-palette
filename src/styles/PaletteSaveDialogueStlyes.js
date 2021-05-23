import { TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  dialog: {
    borderRadius: "20px",
    backgroundColor: "#424242",
    paddingBottom: "0.3rem",
  },
  title: {
    color: "#cccccc",
    "& h1": {
      fontFamily: "'Josefin Sans', sans-serif",
      fontSize: "1.5rem",
      fontWeight: "400",
      margin: "0",
    },
  },
  content: {
    color: "#bebebe",
    fontFamily: "'Josefin Sans', sans-serif",
    letterSpacing: ".05rem",
    fontWeight: "300",
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  saveBtn: {
    width: "90px",
    height: "2rem",
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: ".8rem",
    letterSpacing: "0.07rem",
    fontWeight: "400",
    borderRadius: "15px",
    background: "#0D66D0",
    paddingTop: "9px",
    marginRight: "0.3rem",
  },
  cancelBtn: {
    color: "#0D66D0",
    fontFamily: "'Josefin Sans', sans-serif",
    fontWeight: "400",
    letterSpacing: "0.07rem",
    height: "2rem",
    fontSize: ".8rem",
    paddingTop: "9px",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "rgba(13,101,208,0.2)",
    },
  },
  inputContainer: {
    paddingTop: ".5rem !important",
  },
};

const CustomTextField = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0D66D0",
    },
    "& .MuiInputBase-root": {
      fontFamily: "'Josefin Sans', sans-serif",
      color: "#bebebe",
    },
  },
})(TextValidator);

export { styles, CustomTextField };
