import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    font: "#293264",
    button: "#4D5B9E",
    borderAnswer: "#4D5B9E",
    borderQuestion: "#DBDEF0",
    buttonFont: "#FFFFFF",
    picked: "#D6DBF5",
    hover: "#dde0f2",
    incorrect: "#F8BCBC",
    correct: "#94D7A2",
    default: '#FFFFFF'
  },
  fonts: {
    karla: "karla, sans-serif",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { Theme };
