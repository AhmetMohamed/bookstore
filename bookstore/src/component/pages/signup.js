import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { grantAdminPrivileges } from "../../firebase.js";
import Header from "../global/header";

const Signup = () => {
 const [error, setError] = useState(null);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [role, setRole] = useState("user"); // Default role is "user"
 const navigate = useNavigate();

 const handleSignup = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
   setError("Passwords do not match");
   return;
  }

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    const user = userCredential.user;

    // Create user document in Firestore
    const userRef = doc(db, "users", user.uid);
    setDoc(userRef, {
     email: user.email,
     role: role, // Save the selected role in Firestore
    })
     .then(() => {
      console.log("User document created successfully");

      // Grant admin privileges to the user (if selected role is "admin")
      // if (role === "admin") {
      //  grantAdminPrivileges(user.uid);
      // }

      navigate("/");
     })
     .catch((error) => {
      console.error("Error creating user document:", error);
      setError("Error creating user document");
     });
   })
   .catch((error) => {
    console.error("Error signing up:", error);
    setError(error.message);
   });
 };

 return (
  <>
   <Header />
   <div className="login">
    <form onSubmit={handleSignup}>
     <h1>Sign Up Page</h1>
     <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
     />
     <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
     />
     <input
      type="password"
      placeholder="Confirm Password"
      onChange={(e) => setConfirmPassword(e.target.value)}
     />
     {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="user">User</option>
      <option value="admin">Admin</option>
     </select> */}
     <button className="button button__primary" type="submit">
      <span>Sign Up</span>
     </button>
     <p>
      Already have account? <Link to="/login">Login</Link>
     </p>
     {error && <span className="error">{error}</span>}
    </form>
   </div>
  </>
 );
};

export default Signup;
