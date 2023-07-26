import './App.css';

import React from 'react';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("student");

  function handleLogin() { 
    const user = {type: type, username: username, password: password};
    console.log(user);
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(async (result) => {
        console.log(await result.json());
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='form'>
      <select name="type" id="type" placeholder='User Type' defaultValue={"student"} onChange={(e)=>{setType(e.target.value);}}>
        <option value="student">User Type</option>
        <option
          value="student"
          onChange={(e) => {  
            setType(e.target.value)
          }}>
          Student
        </option>
        <option
          value="admin"
          onChange={(e) => { 
            setType(e.target.value)
          }}>
          Admin
        </option>
      </select>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter Username"
        onChange={
          (e) => {
            setUsername(e.target.value)
          }
        }
        value={username}
      />

      <input
        type="text"
        name="password"
        id="password"
        placeholder="Enter Password"
        onChange={
          (e) => {
            setPassword(e.target.value)
          }
        }
        value={password}
      />
      <button
        onClick={() => {
          handleLogin()
        }}>
        Login
      </button>
    </div>
  )
}

function App() {
  return (
    <>
      <h1>Login</h1>
      <Login />
    </>
  );
}

export default App;
