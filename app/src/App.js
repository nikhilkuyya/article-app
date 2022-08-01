import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import { Home } from "./pages/Home";
import './index.css'
import Login from "./pages/Login";

import { AuthProvider } from "./context/AuthProvider";
import { FetchProvider } from "./context/FetchProvider";

const App = () => {
  return (
    <StrictMode>
      <FetchProvider>
        <AuthProvider>
          <BrowserRouter>
            <header>
              <Link to="/"><h1>Articles !</h1></Link>
            </header>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path='/' element={<AuthRoute>
                <Home />
              </AuthRoute>}/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FetchProvider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
