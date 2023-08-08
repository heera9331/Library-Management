import './App.css';
import React from 'react';
import { useState } from 'react';
import cors from 'cors';




function Login() {
  const [username, setUsername] = useState("kamlesh");
  const [password, setPassword] = useState("lodhi");


  function handleLogin() {
    console.log(username, password);


    fetch("http:/localhost:8000", {
      method
        : "POST",
      headers: {
        "contant-type": "application/josn"

      },

      body: JSON.stringify({ username, password })
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <h1>heading</h1>
      <div className='form'>
        <input type='text' name='username' id='username' placeholder='username'
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <input type='text' name='username' id='password' placeholder='username'
          onChange={(e) => {
            setPassword(e.target.value)
          }} />
        <button onClick={() => {
          handleLogin()
        }}>login</button>


      </div>



    </>
  )

}


function App() {
  return (<>
    <Login />
  </>

  );
}

export default App;
