import { useParams,Link,useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import { gg } from "../DB/Users";
import { FaUser } from "react-icons/fa";
import Addemp from "./Addemp";
export default function MAN(){

    const[add,Setadd]=useState(false);

    const{id}=useParams();

    const Navigate=useNavigate();

    const r=gg.filter((a)=>a.manage_id==id);

    let e=gg.filter((a)=>a.manager_id==id);

    let f=e.map((A)=>A.name);

    let employees=e.map((a)=><div key={a.emp_id}><li><Link  className="emp" to={`/${a.emp_id}/employee`}>{a.name.toUpperCase()}</Link></li></div>);

    localStorage.setItem("employee",JSON.stringify(f));

    useEffect(()=>{
        if(!localStorage.getItem("auth")) Navigate("/login");
        });

    let y=localStorage.getItem("au")&&localStorage.getItem("auth");
        
    let name=r[0].name;

  
    return (
    <div style={{color:"black"}}>
      <div>
       <Link  className="flex align-items-center lo" to={`/${id}/logout`}>LOG OUT</Link>
       <FaUser style={{paddingTop:"5px",marginRight:"2px"}}/>:{y}
       <h1>MANAGER NAME:{name.toUpperCase()}</h1>
      </div>
      <h2>EMPLOYEE UNDER HIM</h2>
      <ol>
       {employees}
      </ol>
      
   </div>
 );}
   
