import Home from "./Pages/Home";
import GlobalStyle from "./Styles/Global";
import Theme from "./Styles/Theme";

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Home />
    </Theme>
  );
}

export default App;
