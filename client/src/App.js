import { createTheme, ThemeProvider } from "@material-ui/core";
import { amber, purple } from "@material-ui/core/colors";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./routes/PrivateRoute";
import InfoCard from "./components/InfoCard";
import { useContext } from "react";
import { CardContext, CardProvider } from "./context/cardInfoContext";
import Error404 from "./components/Error404";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: amber,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CardProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Login" component={Login} />
              <Route path="/Signup" component={SignUp} />
              <Route path="/card/:slug" component={InfoCard} />
              <PrivateRoute path="/Dashboard" component={Dashboard} />
              <Route path="*" component={Error404} />
            </Switch>
          </Router>
        </AuthProvider>
      </CardProvider>
    </ThemeProvider>
  );
}

export default App;
