import { useState,useEffect} from "react";
import {gg} from "./Users";
export default function LOGIN({a,b}){
    const [type,SetType]=useState();
    const [name,setName]=useState("");
    const [pass,setPass]=useState("");
    const[err,setErr]=useState(false);
    let aa="invalid username or password!";
    useEffect(()=>{
        setTimeout(()=> SetType(false),500)
       
    },[type])
     function asm(e){
        SetType(false);
      e.preventDefault();
      let r=gg.filter((a)=>a.name.toLowerCase()===name.toLowerCase()&&a.password===pass);
      if(r.length!==0){
      a();
      b(r);
      }
      else{
       setErr(true);
      }
     }
    return (<div className="flex "><center>{type?<h1>TYPING....</h1>:<h1 >LOG IN</h1>}
    <form onSubmit={asm}>
        <p style={{color:"red"}}>{err&&aa}</p>
        <label>USERNAME:</label>
    <input onChange={(e)=>{SetType(true);setName(e.target.value)}}/>
    <br></br>
    <br></br>
    <label>PASSWORD:</label>
    <input onChange={(e)=>{SetType(true);setPass(e.target.value)}}/>
    <br></br>
    <br></br>
    <div>
    submit:{name.length>=2&&pass.length>=2?<button >submit</button>:<button disabled>submit</button>}

    </div>
    
    </form>
    </center>
    </div>)
 
}