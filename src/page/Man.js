import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import { fetchData } from "../DB/API";
import Backdrop from "@mui/material/Backdrop";

import CircularProgress from "@mui/material/CircularProgress";

import Checkbox from "@mui/material/Checkbox";
import Footer from "../head&foot/footer";
import { MdWork } from "react-icons/md";
import { TbPencilPlus } from "react-icons/tb";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Header from "../head&foot/header";
export default function MAN() {
  const [circular, setCircular] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [render, setRender] = useState(true);
  const [checkBoxEmployee, setCheckBoxEmployee] = useState([]);

  const handleClose = () => {
    SetDisplayMessage("");
    setRender(!render);
    setOpen(false);
  };

  const [displayMessage, SetDisplayMessage] = useState("");
  const Navigate = useNavigate();

  const [apiData, setApiData] = useState("");
  let response = useCallback(async () => {
    const response = await fetchData();
    await setApiData(response);
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("auth")) Navigate("/login");
    response();
  }, [response, render]);

  const { id } = useParams();
  let loggedIn = JSON.parse(localStorage.getItem("au"));

  if (!apiData) {
    return (
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  const managerName = apiData.filter((m) => m.id == id);

  const data = apiData.filter((m) => m.id == [loggedIn][0].id);
  let managerEmployees = apiData.filter((a) => a.managerId == id);

  let noManagerEmployee = apiData.filter(
    (a) => a.managerId == null && !a.isManager,
  );
  function om(a) {
    setCheckBoxEmployee((prev) => {
      if (prev.includes(a)) {
        return prev.filter((id) => id !== a);
      } else {
        return [...prev, a];
      }
    });
  }
  let empemp = noManagerEmployee.map((v) => (
    <div
      key={v.id}
      style={{ display: "flex" }}
    >
      <Checkbox
        onChange={() => {
          om(v.id);
        }}
      />
      <div style={{ marginTop: "8px" }}>{v.name}</div>
    </div>
  ));
  let successMsg = (
    <Alert severity="success">
      {checkBoxEmployee.length}{" "}
      {checkBoxEmployee.length > 1 ? "employees" : "employee"} assinged
      successfully
    </Alert>
  );

  let failureMsg = <Alert severity="error">error in assinging</Alert>;
  async function asn(e) {
    e.preventDefault();
    if (!checkBoxEmployee.length) {
      handleClose();
    }
    setCircular(true);
    setTimeout(() => setCircular(false), 1000);
    let arrayOfEmptyEmployee = checkBoxEmployee;
    if (arrayOfEmptyEmployee.length <= 0) {
      handleClose();
      return;
    }
    await axios.patch(
      `https://free-ap-south-1.cosmocloud.io/development/api/userdetails/${data[0]._id}`,
      { employees: arrayOfEmptyEmployee },
      {
        headers: {
          environmentId: "670e99ff59c9b368f802bb25",
          projectid: "670e99ff59c9b368f802bb24",
        },
      },
    );

    let logginedUser = JSON.parse(localStorage.getItem("auth"));

    let checkPromise = [];
    for (let a of checkBoxEmployee) {
      let patchId = apiData.filter((b) => b.id == a);
      console.log(patchId);
      checkPromise.push(
        Promise.resolve(
          axios.patch(
            `https://free-ap-south-1.cosmocloud.io/development/api/userdetails/${patchId[0]._id}`,
            { managerId: parseInt(logginedUser.id) },
            {
              headers: {
                environmentId: "670e99ff59c9b368f802bb25",
                projectid: "670e99ff59c9b368f802bb24",
              },
            },
          ),
        ),
      );
    }
    Promise.all(checkPromise)
      .then(() => SetDisplayMessage(successMsg), setModalContent(true))
      .catch(() => {
        SetDisplayMessage(failureMsg);
      });
  }
  let linkForEmployee = managerEmployees.map((a) => (
    <div key={a.id}>
      <li>
        <Link
          className="emp"
          to={`/${a.id}/employee`}
        >
          {a.name}
        </Link>
      </li>
    </div>
  ));

  let idForWorkers = managerEmployees.map((a) => <li key={a.id}>{a.id}</li>);
  function handleSuccess() {
    setModalContent(true);
    setCircular(true);
    handleClose();
    setModalContent(false);
    setCircular(false);
  }

  return (
    <div>
      <div style={{ color: "white" }}>
        <Header name={[loggedIn][0]} />{" "}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ display: "flex", marginLeft: "200px" }}>
        <div
          id="col"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            id="1"
            style={{
              marginLeft: "25px",

              borderRadius: "20px",
              width: "500px",
              backgroundColor: "gray",
            }}
          >
            <p>Name: {managerName[0].name}</p>
            <p>Employee Id: {id}</p>
            <p>Email: {managerName[0].email}</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Password:
              <div style={{ marginTop: "5px", marginBottom: "0px" }}>
                {managerName[0].password
                  .split("")
                  .map((a) => "*")

                  .join("")}
              </div>
            </div>
            <p>Age: {managerName[0].age}</p>
          </div>
          <br></br>
          <br></br>
          <div
            id="2"
            style={{
              marginLeft: "25px",

              borderRadius: "10px",
              width: "500px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            <div>
              Employees under him:
              {!managerEmployees ? (
                <p>NO EMPLOYEES</p>
              ) : (
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginLeft: "60px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Name
                    <div>
                      <ol style={{ paddingLeft: "5px" }}>{linkForEmployee}</ol>
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "55px",
                      marginBottom: "2px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Emplyee ID
                    <div>
                      <ol style={{ paddingLeft: "25px" }}>{idForWorkers}</ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          id="3 row"
          style={{
            marginLeft: "50px",
            width: "480px",
            height: "500px",
            borderRadius: "10px",
            backgroundColor: "gray",
            overflow: "auto",
          }}
        >
          <div>Quick Links</div>
          <center style={{ marginTop: "60px" }}>
            <div>
              <MdWork
                className="hover"
                style={{
                  border: "2px solid white",
                  borderRadius: "45px",
                  padding: "20",
                }}
                onClick={() => console.log("ji")}
                size="40px"
              />
              <p>Add task</p>
            </div>
            <div>
              <TbPencilPlus
                className="hover"
                style={{
                  border: "2px solid white",
                  borderRadius: "45px",
                  padding: "20",
                }}
                onClick={() => console.log("hi")}
                size="40px"
              />
              <p>Update employee</p>
            </div>
          </center>
        </div>
      </div>
      <Footer />
    </div>
  );
}
