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
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const handeClose = () => {
    setOpen(false);
  };
  const [show, setShow] = useState();

  const [employee, setEmployee] = useState(true);
  const [manager, setManager] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setShow("");
    setModalOpen(false);
  };

  async function newUser(e) {
    e.preventDefault();
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
    let randomId = Math.floor(Math.random() * 10000 - 1);
    let apiPostData = {
      name,
      password: password,
      email,
      age: parseInt(age),
      id: randomId,
      isManager: manager,
    };
    await axios
      .post(
        "https://free-ap-south-1.cosmocloud.io/development/api/userdetails",
        apiPostData,
        {
          headers: {
            environmentId: "670e99ff59c9b368f802bb25",
            projectid: "670e99ff59c9b368f802bb24",
          },
        },
      )
      .then(() => {
        setShow(<SimpleAlert />);
        if (!apiPostData.isManager) {
          console.log("emplo");
          localStorage.setItem("au", JSON.stringify(apiPostData));
          Navigate(`/${randomId}/employee`);
        } else {
          console.log("manager");
          localStorage.setItem("au", JSON.stringify(apiPostData));
          localStorage.setItem("auth", JSON.stringify(apiPostData));
          Navigate(`/${randomId}/manager`);
        }
      })
      .catch(() => setShow(<Alert severity="error">submission failed</Alert>));
  }

  function decide() {
    setEmployee(true);
    setManager(false);
  }

  function decide1() {
    setManager(true);
    setEmployee(false);
  }
  const [modalOpen, setModalOpen] = useState(false);
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
        open={modalOpen}
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
            {employee == true ? <p>Employee</p> : <p>Manager</p>}
            <div>
              <form onSubmit={newUser}>
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
                    onChange={(e) => setPassWord(e.target.value)}
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
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Backdrop
                        sx={(theme) => ({
                          color: "#fff",
                          zIndex: theme.zIndex.drawer + 1,
                        })}
                        open={open}
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
