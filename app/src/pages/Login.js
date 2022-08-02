import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { publicFetch } from "../utils";

const Login = () => {
  const { setAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setSubmit] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    async function handleLogin() {
      const response = await publicFetch.post("/user/login", {
        email: email,
        password: password,
      });
      console.log("response", response.data);
      return response.data;
    }

    try {
      if (isSubmit) {
        handleLogin()
          .then((data) => setAuthState(data))
          .then(() => {
            setLoginStatus(isSubmit);
          })
          .catch((e) => {
            console.error(e);
            setSubmit(false);
          });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isSubmit, setAuthState, setLoginStatus]);

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2>Login !</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          setSubmit(true);
        }}
      >
        <label htmlFor="loginEmail">
          Email
          <input
            id="loginEmail"
            data-test="field-email"
            type="text"
            name="email"
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="loginPassword">
          {" "}
          Password
          <input
            type="password"
            data-test="field-password"
            name="password"
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      {loginStatus && <Navigate to="/home" />}
    </>
  );
};
export default Login;
