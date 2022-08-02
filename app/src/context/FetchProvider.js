import React,{ createContext, useContext } from "react";
import axios from 'axios';
import config from '../config.json'
import { AuthContext } from "./AuthProvider";

export const FetchContext = createContext();
const { Provider } = FetchContext;

export const FetchProvider = ({children}) => {
  
  const { authState } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: config.API_URL
  })
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${authState && authState.token}`
  },(err) => {
    return Promise.reject(err)
  })

  return <Provider value={{
    authAxios: axiosInstance
  }}>
    {children}
  </Provider>
}