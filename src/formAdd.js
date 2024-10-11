
import { useState } from "react";
export default function FORMADD({as,ch,gg}){
    const [name,setName]=useState("");
  
    function fan(e){
        e.preventDefault();
  console.log(name);
   gg.push({name})
    }
    return (<>
    <div>
        <center>
        <form onSubmit={fan}>
            <label>USERNAME:</label>
            <input  onChange={(e)=>setName(e.target.value)}required/>
            <br></br>
            <br></br>
            <button >ADD</button>
        </form>
        </center>
        
    </div>
    </>
    )
}

