import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import Routes from "./Routes";
import store from "./redux/store";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}
