import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from "./Routes";


const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
