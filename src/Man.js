import { useParams,Link,useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";
import { gg } from "./Users";
import Logout from "./Logout";
export default function MAN(){
    const [login,setLogin]=useState(true);
    const{id}=useParams();
    const Navigate=useNavigate();
    const r=gg.filter((a)=>a.manage_id==id);
    let employees=gg.filter((a)=>a.manager_id==id).map((a)=><div key={a.emp_id}><li><Link  className="emp" to={`/${a.emp_id}/employee`}>{a.name.toUpperCase()}</Link></li></div>);

    
    useEffect(()=>{
        if(!localStorage.getItem("auth")) Navigate("/login");
        },[login]);

          function ok(){
           localStorage.removeItem("auth");
           localStorage.removeItem("au");
            setLogin(false);
          }
   let name=r[0].name;
    return (<div style={{backgroundColor:"rosybrown"}}><div><div>
    <Link  className="flex align-items-center lo" to={`/${id}/logout`}>LOG OUT</Link>
  </div>
  <div className="login">
      Loggedin User:{name}</div>
  <center><div>
     <h1>MANAGER</h1>
     <h2>{name.toUpperCase()}</h2>
   </div>
   <h2>EMPLOYEE UNDER HIM</h2>
   <ol>
     {employees}
   </ol>
   </center>
   </div></div>);}
   
