import { createContext } from "react";

export const FetchContext = createContext();
const { Provider } = FetchContext;

export const FetchProvider = ({children}) => {
  return <Provider value={{}}>
    {children}
  </Provider>
}