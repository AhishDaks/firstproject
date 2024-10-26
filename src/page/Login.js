import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/S.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { SignInPage } from "@toolpad/core";
import Moda from "../modal/Moda";
import { fetchDat } from "../DB/API";
export default function LOGIN() {
  const Navigate = useNavigate();

  const [type, SetType] = useState();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const [err, setErr] = useState(false);

  let aa = "invalid username or password!";

  async function asm(e) {
    SetType(false);
    e.preventDefault();
    const res = await fetchDat();
    let ko = res.filter((a) => a.email == name && a.password == pass);
    if (ko.length) {
      let g = JSON.stringify(...ko);

      if (!ko[0].isManager) {
        localStorage.setItem("au", g);
        Navigate(`/${ko[0].id}/employee`);
      } else {
        localStorage.setItem("au", g);
        localStorage.setItem("auth", g);
        Navigate(`/${ko[0].id}/manager`);
      }
    } else {
      setErr(true);
    }
  }

  return (
    <div className=" oo ">
      <h1>
        <SignInPage />
      </h1>

      <Moda />
      <form onSubmit={asm}>
        <p style={{ color: "red" }}>{err && aa}</p>
        <MdEmail style={{ height: "50px", marginRight: "2px" }} />{" "}
        <TextField
          label="Email"
          id="outlined-basic"
          onChange={(e) => {
            SetType(true);
            setName(e.target.value);
          }}
          type="email"
          variant="outlined"
        />
        <br></br>
        <br></br>
        <RiLockPasswordFill style={{ height: "50px", marginRight: "2px" }} />
        <TextField
          id="outlined-basic"
          onChange={(e) => {
            SetType(true);
            setPass(e.target.value);
          }}
          label="Password"
          variant="outlined"
        />
        <br></br>
        <br></br>
        {name.length >= 2 && pass.length >= 2 ? (
          <Button
            type="submit"
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        ) : (
          <Button
            disabled
            variant="contained"
            color="error"
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
