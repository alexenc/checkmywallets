import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    _id: "",
    username: "",
    avatar: "",
  });

  const tokenSetter = (token_) => {
    if (token_) {
      setAuthState({ ...authState, token: token_ });
    } else {
      localStorage.removeItem("token");
      setAuthState({ token: null });
    }
  };

  const getIdFromjwt = (token) => {
    const tokenDecoded = jwt_decode(token);

    return tokenDecoded.user.id;
  };

  return (
    <AuthContext.Provider
      value={{ authState: authState, setAuthState, tokenSetter, getIdFromjwt }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
