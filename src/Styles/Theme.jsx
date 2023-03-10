import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    font: "#293264",
    button: "#4D5B9E",
    buttonFont: "#FFFFFF",
    picked: "#D6DBF5",
  },
  fonts: {
    karla: "karla, sans-serif",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
