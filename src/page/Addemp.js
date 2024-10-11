import { useState } from "react";
export default function Addemp({o,p}){
    const [newEmp,SetEMP]=useState("");
    function om(event){
        event.preventDefault();
        let r=JSON.parse(localStorage.getItem("employee"));
        localStorage.setItem("employee",[...r,newEmp]);
        console.log(localStorage.getItem("employee"))
        o(!p);
    }
    return (<div>
        <form onSubmit={om}>
            name:<input onChange={(e)=>SetEMP(e.target.value)}type="name"></input>
        </form>
    </div>
)}