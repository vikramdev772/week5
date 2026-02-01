let api = "http://40.0.16.155:4040/signup";

async function sendData() {
    let x=document.getElementById("n").value;
    let y=document.getElementById("e").value;
    let z=document.getElementById("p").value;
  let db = {
    name: x,
    email: y,
    password:z ,
  };
  console.log(" data : " + db);
  console.log("\n\t  JSON LOG  : " + JSON.stringify(db) + "\n\n");
  console.log(JSON.stringify(db, null, 2));

  try {
    let res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(db),
    });
    let data = await res.text();
    if(res.ok){
        localStorage.setItem("email",y);
        localStorage.setItem("password",z);
    }
    console.log("\n\t  api response : " + data);
  } catch (e) {
    console.log(" error : " + e);
  }
}

// sendData();
