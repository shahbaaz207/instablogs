import React from "react";
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import { UserContext } from "../../App";
function SinginScreen(props) {
  const {dispatch}=useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function show() {
    var pswrd = document.getElementById("pswrd");
    var icon = document.querySelector(".fas");
    if (pswrd.type === "password") {
      pswrd.type = "text";
      pswrd.style.marginTop = "20px";
      icon.style.color = "#7f2092";
    } else {
      pswrd.type = "password";
      icon.style.color = "grey";
    }
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user})
          setMessage(data.message);
          props.history.push("/");
        }
      });
  };
  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div>
          <h3 style={{ marginBottom: 20 }}>Sign-In</h3>
        </div>
        <div className="error">
          <span style={{ color: "red" }}>{error}</span>
          <span>{message}</span>
        </div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <i className="far fa-envelope"></i>
        <input
          id="pswrd"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <i className="" onClick={show}><span style={{fontSize:10}}>show</span></i>
        <input type="submit" value="Sign in" />
        <h4>
          Don't have an Account? <Link to="/signup">Sign-Up</Link>
        </h4>
      </form>
    </div>
  );
}

export default SinginScreen;
