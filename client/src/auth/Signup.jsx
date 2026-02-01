import React, { use, useState } from "react";

function Signup() {
    let [n,setN]=useState("test");
    let [E,setE]=useState("test@gmail.com");
    let [P,setP]=useState("test123");
  function nameHandler(e) {
    // console.log(e.target.value);
      setN(e.target.value);
  }
    function emailHandler(e) {
    // console.log(e.target.value);
      setE(e.target.value);
  }
     function passwordHandler(e) {
    // console.log(e.target.value);
      setP(e.target.value);
  }

  async function submitHandler(){
  let sd={
    name:n,
    email:E,
    password:P
  }
  console.log(" data : "+JSON.stringify(sd));
  try{
    let res=await fetch("http://localhost:4040/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(sd)
    })
    let data=await res.text();
    if(res.ok){
      alert(" signup sucesss ✅");
    }
  }
  catch(error){
    alert(" signup failed ❌ : "+error);
  }
 }
  return (
    <>
      <h3>create account</h3>
      <br />
      <input type="text" placeholder="name" onChange={nameHandler} />
      <br />
      <input
        type="text"
        placeholder="email"
        onChange={emailHandler}
      />
      <br />
      <input type="text" placeholder="password" 
      onChange={passwordHandler}
      />
      <br />
      <br />
      <button onClick={submitHandler}>submit</button>
      <br />
      <div>
        <h4>name : {n}</h4>
        <h4>email : {E}</h4>
        <h4>password : {P}</h4>

      </div>
    </>
  );
}

export default Signup;
