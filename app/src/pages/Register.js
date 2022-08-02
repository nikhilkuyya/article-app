import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { publicFetch } from "../utils";

const Register = () => {
  const { setAuthState, isAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegister] = useState(false);

  useEffect(() => {
    setRegister(isAuthenticated);
  }, [isAuthenticated]);

  const handleChange = (evt, callBack) => {
    callBack(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    publicFetch
      .post("/user/register", {
        email,
        password,
        name,
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setAuthState(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClear = (evt) => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="vt">
        <label htmlFor="nameRegiter">
          Name
          <input
            type="text"
            id="nameRegister"
            name="name"
            onChange={(evt) => handleChange(evt, setName)}
            value={name}
          />
        </label>
        <label htmlFor="emailRegister">
          Email
          <input
            type="text"
            name="email"
            id="emailRegister"
            onChange={(evt) => handleChange(evt, setEmail)}
            value={email}
          />
        </label>
        <label htmlFor="passwordRegister">
          Password
          <input
            type="password"
            name="password"
            id="passwordRegister"
            onChange={(evt) => handleChange(evt, setPassword)}
            value={password}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>
            Cancel
          </button>
        </div>
      </form>
      {registered && <Navigate to="/home" />}
    </>
  );
};

export default Register;
