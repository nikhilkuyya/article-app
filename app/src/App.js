import { render } from "react-dom";
import { StrictMode, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Home } from "./pages/Home";
import "./index.css";
import Login from "./pages/Login";

import { AuthProvider } from "./context/AuthProvider";
import { FetchProvider } from "./context/FetchProvider";
import Welcome from "./pages/Welcome";
import Header from "./components/Header";
import Register from "./pages/Register";
import Article from "./pages/Article";

const App = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <FetchProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <AuthRoute>
                    <Home />
                  </AuthRoute>
                }
              />
              <Route
                path="/article/new"
                element={
                  <AuthRoute>
                    <Article heading="Create" />
                  </AuthRoute>
                }
              />
              <Route
                path="/article/:id"
                element={
                  <AuthRoute>
                    <Article heading="Edit" />
                  </AuthRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </FetchProvider>
      </AuthProvider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
