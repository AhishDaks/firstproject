
import { gg } from "./Users";
export default function EMP({as,bb}){
  let rp=as[0].isManager;
  let employee;
  let mana;
  if(!rp){
     let i=as[0].manager_id;
     let man=gg.filter((a)=>a.manage_id===i);
     mana=man[0].name;
  }
  if(rp){
   let mm=as[0].employees.map((ma)=> gg.filter((al)=>al.emp_id===ma));
  
   employee=mm.map((a)=>a[0].name)

   employee=employee.map((m)=>{ return <li><a href="/.com ">{m}</a></li>})
   
  }
  let rr=as.map((a)=><div style={{backgroundColor:"yellow"}}>
    <button style={{backgroundColor:"red"}}onClick={bb}>LOGOUT</button>
    <center>
    <h1>{a.isManager===true?<h2>MANAGER</h2>:<h2>EMPLOYEE</h2>}</h1>
   
    <div>
      NAME:{a.name}
    </div>
    <br></br>
    <div>
      AGE:{a.age}
    </div>
    <br></br>
    <div>
      TASK:{a.task?<ol  type="1">{a.task.map((a)=><li>{a}</li>)}</ol>:"no"}
    </div>
    <br></br>
    <div>
      {rp?"MANAGER ID":"EMPLOYEE ID"}:{rp?a.manage_id:a.emp_id}
    </div>
    <br></br>
    <div>
        {rp?"Employee under him":"Manger for him"}:{rp?<ol type="1">{employee}</ol>:<div>{mana}</div>}
    </div>
    </center>
    </div>);
  return <h1>{rr}</h1> 
}