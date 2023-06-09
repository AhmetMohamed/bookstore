import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import Header from "../global/header";

const Login = () => {
 const [error, setError] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
   .then(async (res) => {
    navigate("/");
   })
   .catch((err) => {
    setError(err.message);
   });
 };

 return (
  <>
   <Header />
   <div className=" login">
    <form onSubmit={handleLogin} action="">
     <h1>Login Page</h1>
     <input
      type="email"
      placeholder="email"
      onChange={(e) => setEmail(e.target.value)}
     />
     <input
      type="password"
      placeholder="password"
      onChange={(e) => setPassword(e.target.value)}
     />
     <button className="button button__primary" type="submit">
      <span>Login</span>
     </button>
     <p>
      Don't have account ? <Link to="/signup">Register</Link>
     </p>
     {error && <span className="error">Wrong email or password!</span>}
    </form>
   </div>
  </>
 );
};

export default Login;
