import { useState,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import {gg,rr} from "./Users";
import "./S.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
export default function LOGIN(){
    const Navigate=useNavigate();
    const [type,SetType]=useState();
    const [name,setName]=useState("");
    const [pass,setPass]=useState("");
      console.log(rr);
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
       
        if(r[0].emp_id){
          localStorage.setItem("au",true);
          Navigate(`/${r[0].emp_id}/employee`);
        }
        else{
          
          localStorage.setItem("au",true);
          localStorage.setItem("auth",true);
          Navigate(`/${r[0].manage_id}/manager`);
        }
        
        
      }
      else{
       setErr(true);
      }
     }
    return (<div className=" oo flex items-center">{type?<h1 className="as">TYPING....</h1>:<h1 >LOG IN</h1>}
    <form onSubmit={asm}>
        <p style={{color:"red"}}>{err&&aa}</p>
        <div >
        <FaUser style={{height:"50px",marginRight:"2px"}}/> <TextField label="Username" id="outlined-basic" onChange={(e)=>{SetType(true);setName(e.target.value)}} variant="outlined" />
        
    <br></br>
    <br></br>
    <RiLockPasswordFill style={{height:"50px",marginRight:"2px"}}/><TextField id="outlined-basic" onChange={(e)=>{SetType(true);setPass(e.target.value)}}label="Password" variant="outlined" />
 
    <br></br>
    <br></br>
    <div>
    {name.length>=2&&pass.length>=2? <Button onClick={asm} variant="contained" color="success">Submit</Button>: <Button disabled variant="contained" color="error">
        Submit
      </Button>}
    </div>
    </div>
    
    </form>
  
   </div>)
    
 
}
