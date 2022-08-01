import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isSubmit,setSubmit] = useState(false);
  const [loginStatus,setLoginStatus]= useState(false)
  
  useEffect(() => {
    if(isSubmit){      
      navigate('/')
    }
  },[isSubmit]);



  return <>
   <h2>Login !</h2>
   <form onSubmit={(evt) => {
    evt.preventDefault();
      setSubmit()
   }}>
    <label htmlFor="loginEmail">Email
      <input id="loginEmail" data-test="field-email" type="text" name="email" onChange={(evt) => setEmail(evt.target.value)} value={email} /> 
    </label>
    <label htmlFor="loginPassword"> Password
      <input type="password" data-test="field-password" name="password" onChange={(evt) => setPassword(evt.target.value)} value={password}/>
    </label>
    <div>
      <button>Submit</button>
      <button>Clear</button>
    </div> 
   </form>
   {loginStatus && <Navigate to="/" />}
  </>
}
export default Login;