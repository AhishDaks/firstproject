import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/S.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { SignInPage } from "@toolpad/core";
import Moda from "../modal/Moda";
import { fetchData } from "../DB/API";

export default function LOGIN() {
  const Navigate = useNavigate();
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let showMsg = "invalid username or password!";

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetchData();
    let validate = response.filter(
      (a) => a.email == mail && a.password == password,
    );
    if (validate.length) {
      let userData = JSON.stringify(...validate);

      if (!validate[0].isManager) {
        localStorage.setItem("au", userData);
        Navigate(`/${validate[0].id}/employee`);
      } else {
        localStorage.setItem("au", userData);
        localStorage.setItem("auth", userData);
        Navigate(`/${validate[0].id}/manager`);
      }
    } else {
      setError(true);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          width: "768px",
          height: "780px",
          marginTop: "45px",
          backgroundColor: "white",
        }}
      >
        <div style={{}}>
          <h1>
            <SignInPage />
          </h1>
          <center>
            <form onSubmit={handleLogin}>
              <p style={{ color: "red" }}>{error && showMsg}</p>
              <MdEmail style={{ height: "50px", marginRight: "2px" }} />{" "}
              <TextField
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label="email"
                type="email"
                variant="outlined"
              />
              <br></br>
              <br></br>
              <RiLockPasswordFill
                style={{ height: "50px", marginRight: "6px" }}
              />
              <TextField
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                type="password"
                variant="outlined"
              />
              <br></br>
              <br></br>
              {mail.length >= 2 && password.length >= 2 ? (
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
            <br></br>
            <Moda />
          </center>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "blue",
          opacity: "70%",
          width: "768px",
          height: `{window.innerHeight}px`,
        }}
      >
        <center style={{ marginTop: "300px", color: "white" }}>
          <h1>
            <i>Tech Global</i>
          </h1>
        </center>
      </div>
    </div>
  );
}
