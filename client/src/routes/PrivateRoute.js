import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function PrivateRoute({ component: Component, ...props }) {
  const authContext = useContext(AuthContext);
  const { authState, setAuthState, tokenSetter } = authContext;

  useEffect(() => {
    tokenSetter(localStorage.getItem("token"));
    //eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !authState.token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
