import { useParams,Link,useNavigate} from "react-router-dom";
import { useEffect,useState} from "react";
import { gg } from "../DB/Users";
import { FaUser } from "react-icons/fa";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { RiPencilFill } from "react-icons/ri";

const style = {
  position: 'absolute',
  
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexDirection: 'column'
};
export default function MAN(){
    
    const [open, setOpen] = useState(false);

    const[task,setTask]=useState("");

    const[desc,setDesc]=useState("");

    const[dead,setDe]=useState("");

    const[emp,setEmp]=useState(0);

    const handleOpen = () => setOpen(true);

    const handleClose = () =>{
      setTask("");
      setDesc("");
      setOpen(false);
    }
     
    const{id}=useParams();

    const Navigate=useNavigate();

    const r=gg.filter((a)=>a.manage_id==id);

    let e=gg.filter((a)=>a.manager_id==id);

    let f=e.map((o)=><option key={o.emp_id} value={o.emp_id}>{o.name}</option>)

    let employees=e.map((a)=><div key={a.emp_id}><li><Link  className="emp" to={`/${a.emp_id}/employee`}>{a.name.toUpperCase()}</Link></li><br></br></div>);

       function AssignTask(e){
      e.preventDefault();
      if(!task.length||!desc.length||!dead.length){
           alert("some field is ,missing enter that");
           setOpen(true);
           return;
      }
      let c=[];
      let curr=new Date();
      c.push(curr.getDate());
      c.push(curr.getMonth()+1);
      c.push(curr.getFullYear());
      let y=`${dead}`.split("-").reverse().join("/")
      let h=0;
      for(let y of gg){
        if(y.emp_id==emp){
            h=gg.indexOf(y);
        }
      }
     console.log([...gg[h].task]);
      if(task.length&&desc.length&&dead.length){
      gg[h].task.push({ name: task, desc, due: y, status: "Assigned", assi: c.join("/") });
      }
      console.log(gg[h].task);
      handleClose();
    }

    useEffect(()=>{
        if(!localStorage.getItem("auth")) Navigate("/login");
        });

    let y=localStorage.getItem("au")&&localStorage.getItem("auth");
        
    let name=r[0].name;
     
    function selectAssing(e){
      setEmp(e);
    }
  
    return (
    <div >
      <div>
       <Button style={{marginRight:"500px"}}variant="contained" color="error"><Link style={{textDecoration:"none",color:"white"}} to={`/${id}/logout`}>LOG OUT</Link></Button>
      
     
       <FaUser style={{paddingTop:"5px",marginRight:"2px"}}/>:{y}
       <h1>MANAGER NAME:{name.toUpperCase()}</h1>
      </div>
      <h2>EMPLOYEE UNDER HIM</h2>
      <div>
      <Button variant="contained" onClick={handleOpen}><RiPencilFill style={{marginRight:"3px"}}/>ASSIGN TASK</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{display:"flex",flexDirection:"column"}}sx={style}>
          <form onSubmit={AssignTask}>
          <b>TASK NAME:</b><input style={{marginLeft:"12px"}}onChange={(e)=>setTask(e.target.value)} value={task} placeholder="task" required type="text"></input>
          <br></br>
          <br></br>
          <b>DESCRIPTION:</b><input onChange={(e)=>setDesc(e.target.value)} value={desc} required placeholder="desc" type="text"></input>
          <br></br>
          <br></br>
          <b>DEADLINE:</b><input onChange={(e)=>setDe(e.target.value)} required type="date"></input>
          <br></br>
          <br></br>
          <b>ASSIGNING TO:</b><select onChange={(e)=>selectAssing(e.target.value)}>
            {f}
          </select>
          <br></br>
          <br></br><Stack style={{marginLeft:"100px",marginTop:"5px"}} spacing={2} direction="row">
          <Button type="submit" onClick={AssignTask}variant="contained">Save</Button>
          <Button onClick={handleClose}variant="contained">Cancel</Button>
          </Stack>
          </form>
        </Box>
      </Modal>
    </div>
      <ol>
       {employees}
      </ol>
      
   </div>
 );}




 

   


 

     
  