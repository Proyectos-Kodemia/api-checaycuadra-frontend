import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../scss/login.css'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(()=>{
  // if (localStorage.getItem('user-info')){
  //     navigate.push('/add')
  // }
  // },[])

  const login = async () => {
    let item = { username, password };
    let result = await fetch("http://localhost:8000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result.token));
    // navigate.push('/add')
  };

  return (
    <>
      <h1>Login Page</h1>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              placeholder="username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label>Password: </label>
            <br />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={login} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
