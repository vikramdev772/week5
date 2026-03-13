import React, { useState } from 'react'

function Login() {
    let [d,setD]=useState({
        email:"test@gmail.com",
        password:"12345"
    })
    console.log(d);
    function onChangeHandler(e){
        setD(...d,[e.target.name],e.target.value);

    }
    function loginHandler(){
        console.log(d);
        
    }
  return (
    <>
    <div>
        <h4>Login</h4>
        <br />
        <input type="text" placeholder='email' name='email' onChange={onChangeHandler}/>
        <br />
        <input type="text" placeholder='password' name='password' onChange={onChangeHandler}/>
        <br />
        <br />
        <button onClick={loginHandler}>login</button>
        <br />
        <br />
        <div>
            <h3>email:{d.email}</h3>
            <h3>password:{d.password}</h3>
        </div>
    </div>
    
    </>
  )
}

export default Login