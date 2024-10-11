import { useState,useEffect } from "react";
import { gg } from "./Users";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./S.css";
export default function EMP(){
  const Navigate=useNavigate();

 
  const [login,setLogin]=useState(true);

  const {id}=useParams();

  let Manager;
  let tasks;
  let head="EMPLOYEE";
  let name;
 
   const r=gg.filter((a)=>a.emp_id==id);
    Manager=gg.filter((o)=>o.manage_id==r[0].manager_id);
    tasks=r[0].task.map(((p)=><div key={p}><li>{p.toUpperCase()}</li></div>));
    head="EMPLOYEE";
    name=r[0].name;

  
  useEffect(()=>{
if(!localStorage.getItem("au")) Navigate("/login");
},[login]);

 
  
  return (<div style={{backgroundColor:"gray"}}>
      <div>
      <Link   className="flex align-items-center lo" to={`/${id}/logout`}>LOG OUT</Link>
    </div>
    <div className="login">
      Loggedin User:{name}</div><center><div>
    <h1>{head} NAME: {name.toUpperCase()}</h1>
   
  </div>
  <h2 >MANAGER FOR HIM: {Manager[0].name.toUpperCase()}</h2>

<h3>TASKS ARE:</h3>

  <ol>
    {tasks}
  </ol>
  </center>
  </div>)
  
}





 