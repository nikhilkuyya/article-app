import { createContext } from "react";

export const AuthContext = createContext();
const { Provider } = AuthContext;

export const AuthProvider = ({children}) => {
  return <Provider value={{
    userInfo : {}
  }}>
    {children}
  </Provider>
}