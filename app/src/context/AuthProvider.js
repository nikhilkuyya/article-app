import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  function checkIsAuthenticated() {
    if (
      !authState.token ||
      !authState.expiresAt ||
      Object.keys(authState.userInfo).length == 0
    ) {
      return false;
    }

    const currentTime = new Date();

    return currentTime.getTime() / 1000 < authState.expiresAt;
  }

  const [authState, setAuthState] = useState(() => {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
      token: sessionStorage.getItem("token") || "",
      expiresAt: sessionStorage.getItem("expiresAt") || null,
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    checkIsAuthenticated()
  );

  useEffect(() => {
    setIsAuthenticated(checkIsAuthenticated());
  }, [authState]);

  const handleSetAuthState = ({ token, userInfo, expiresAt }) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.setItem("expiresAt", expiresAt);

    setAuthState({ token, userInfo, expiresAt });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("expiresAt");
    setAuthState({ token: "", expiresAt: null, userInfo: {} });
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: handleSetAuthState,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};
