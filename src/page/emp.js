import { useEffect} from "react";
import { gg } from "../DB/Users";
import { useParams } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Button from '@mui/material/Button';
import "../Style/S.css";
export default function EMP(){
  const Navigate=useNavigate();
   
  const {id}=useParams();

  let Manager;
  let tasks;
  let head="EMPLOYEE";
  let name;
 
   const r=gg.filter((a)=>a.emp_id==id);
    Manager=gg.filter((o)=>o.manage_id==r[0].manager_id);
    tasks=r[0].task.map(((p)=><><div style={{border:"2px solid black",display:"flex",width:"700px"}} key={p.name}><div style={{display:"flex",flexDirection:"column",width:"600px"}}><div><b>{p.name.toUpperCase()}</b><br></br>
   ASSIGNED:{p.assi}</div><div><p style={{ fontSize: 12 }}>{p.desc}</p></div></div>
   <div style={{display:"flex",flexDirection:"column",width:"100px",borderLeft:"2px solid black",marginLeft:"2px",backgroundColor:`${p.due.split("/")[0]}`<=`${new Date().getDate()}`&&`${p.due.split("/")[1]}`<=`${new Date().getMonth()+1}`?"red":"white"}}>{p.status}</div></div><br></br></>));
    head="EMPLOYEE";
    name=r[0].name;

  let y=localStorage.getItem("au");
  useEffect(()=>{
if(!localStorage.getItem("au")) Navigate("/login");
});

 
  
  return (
      <div>
         <div>
         <Button style={{marginRight:"500px"}}variant="contained" color="error"><Link style={{textDecoration:"none",color:"white"}} to={`/${id}/logout`}>LOG OUT</Link></Button>
          <FaUser style={{paddingTop:"5px",marginRight:"2px"}}/>:{y}
          <h1>{head} NAME: {name.toUpperCase()}</h1>
        </div>
         <h2 >MANAGER: {Manager[0].name.toUpperCase()}</h2>
         <h3>TASKS</h3>
        <ol>
         {tasks}
        </ol>
      </div>)
  
}





 