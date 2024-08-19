import LOGIN from "./Login";
import EMP from "./emp";

import { useState } from "react";
export default function  App(){
     const [show,setShow]=useState(true);
     const [val,setVal]=useState("");
    
     if(show){

          return <LOGIN a={()=>setShow(false)} b={(as)=>setVal(as)}/>
     }
    else{
     return <EMP as={val} bb={()=>setShow(true)} />
    }
}