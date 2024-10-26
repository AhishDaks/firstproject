import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Style } from "../Style/sty";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleAlert from "./Alert";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
export default function Moda() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [pas, setPas] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [ope, setOpe] = useState(false);
  const handeClose = () => {
    setOpe(false);
  };
  const [show, setShow] = useState();

  const [emp, setEmp] = useState(false);
  const [ma, setMa] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setShow("");
    setOpen(false);
  };

  async function adddb(e) {
    e.preventDefault();
    setOpe(true);
    setTimeout(() => setOpe(false), 3000);
    let i = Math.floor(Math.random() * 10000 - 1);
    let a = {
      name,
      password: pas,
      email,
      age: parseInt(age),
      id: i,
      isManager: ma,
    };
    await axios
      .post(
        "https://free-ap-south-1.cosmocloud.io/development/api/userdetails",
        a,
        {
          headers: {
            environmentId: "670e99ff59c9b368f802bb25",
            projectid: "670e99ff59c9b368f802bb24",
          },
        },
      )
      .then((re) => {
        setShow(<SimpleAlert />);
        console.log(i);
        if (!a.isManager) {
          console.log("emplo");
          localStorage.setItem("au", JSON.stringify(a));
          Navigate(`/${i}/employee`);
        } else {
          console.log("manager");
          localStorage.setItem("au", JSON.stringify(a));
          localStorage.setItem("auth", JSON.stringify(a));
          Navigate(`/${i}/manager`);
        }
      })
      .catch((er) =>
        setShow(<Alert severity="error">submission failed</Alert>),
      );
  }

  function decide() {
    setEmp(true);
    setMa(false);
  }

  function decide1() {
    setMa(true);
    setEmp(false);
  }
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <p>new user?</p>
        <Button
          variant="contained"
          style={{ height: "30px", marginTop: "13px" }}
          onClick={handleOpen}
        >
          Sign up
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Style}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                variant="outlined"
                onClick={decide}
                style={{ height: "30px", marginTop: "13px" }}
              >
                Employee
              </Button>
              <Button
                variant="outlined"
                onClick={decide1}
                style={{ height: "30px", marginTop: "13px" }}
              >
                Manager
              </Button>
            </div>
            <br></br>
            {show}
            {emp == true ? <p>Employee</p> : <p>Manager</p>}
            <div>
              <form onSubmit={adddb}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    required
                    id="outlined-required"
                    label="Name"
                  />
                  <br></br>
                  <TextField
                    onChange={(e) => setPas(e.target.value)}
                    required
                    id="outlined-required"
                    label="Password"
                  />
                  <br></br>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="outlined-required"
                    label="Email"
                    type="email"
                  />
                  <br></br>
                  <TextField
                    onChange={(e) => setAge(e.target.value)}
                    required
                    id="outlined-required"
                    label="Age"
                  />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <Button
                        variant="contained"
                        style={{ height: "30px", marginTop: "13px" }}
                        onClick={adddb}
                      >
                        Submit
                      </Button>
                      <Backdrop
                        sx={(theme) => ({
                          color: "#fff",
                          zIndex: theme.zIndex.drawer + 1,
                        })}
                        open={ope}
                        onClick={handeClose}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>
                    </div>
                    <Button
                      variant="contained"
                      style={{
                        height: "30px",
                        marginTop: "13px",
                        marginLeft: "4px",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
