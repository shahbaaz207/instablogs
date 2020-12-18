import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignupScreen(props) {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function show(){
    var pswrd = document.getElementById('pswrd');
    var icon = document.querySelector('.fas');
    if (pswrd.type === "password") {
      pswrd.type = "text";
      pswrd.style.marginTop = "20px";
      icon.style.color = "#7f2092";
    }else{
      pswrd.type = "password";
      icon.style.color = "grey";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          props.history.push("/signin");
        }
      });
  };
  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div>
          <h3 style={{ marginBottom: 20 }}>Sign-Up</h3>
        </div>
        <div className="error">
          <span style={{ color: "red" }}>{error}</span>
          <span>{message}</span>
        </div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          required
        />
      <i className="far fa-user"></i>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <i className="far fa-envelope"></i>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          id="pswrd"
        />
      <i className="" onClick={show}><span style={{fontSize:10}}>show</span></i>

        <input type="submit" value="Register" />
        <h4>
          have an account ?<Link to="/signin">Sign In</Link>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;
