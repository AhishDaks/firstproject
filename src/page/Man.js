import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { fetchData } from "../DB/API";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function MAN() {
  const [circular, setCircular] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [render, setRender] = useState(true);
  const [checkBoxEmployee, setCheckBoxEmployee] = useState([]);
  const handleOpen = () => setOpen(true);
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
          {a.name.toUpperCase()}
        </Link>
      </li>
      <br></br>
    </div>
  ));
  function handleSuccess() {
    setModalContent(true);
    setCircular(true);
    handleClose();
    setModalContent(false);
    setCircular(false);
  }

  return (
    <div>
      <div>
        <Button
          style={{ marginRight: "500px" }}
          variant="contained"
          color="error"
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/${[loggedIn][0].id}/logout`}
          >
            LOG OUT
          </Link>
        </Button>
        <FaUser style={{ paddingTop: "5px", marginRight: "2px" }} />
        {[loggedIn][0].name}
        <h1>MANAGER NAME: {managerName[0].name.toUpperCase()}</h1>
      </div>
      <ol>{linkForEmployee}</ol>
      <div>
        {data[0].employees !== null && linkForEmployee.length ? (
          <p></p>
        ) : (
          <div>
            <Button onClick={handleOpen}>ADD EMPLOYEE</Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",

                  width: 400,
                  height: `${noManagerEmployee.length}*100`,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                {modalContent ? (
                  <form onSubmit={handleSuccess}>
                    {displayMessage}
                    <Button
                      style={{ marginTop: "5px" }}
                      type="submit"
                      variant="contained"
                    >
                      OK
                    </Button>
                  </form>
                ) : (
                  <>
                    <form onSubmit={asn}>
                      {noManagerEmployee.length ? empemp : <p>NO EMPLOYEES</p>}

                      <Button
                        type="submit"
                        variant="contained"
                      >
                        {noManagerEmployee.length ? "Submit" : "OK"}
                      </Button>
                    </form>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                    ></Typography>
                    <Backdrop
                      sx={(theme) => ({
                        color: "#fff",
                        zIndex: theme.zIndex.drawer + 1,
                      })}
                      open={circular}
                      onClick={handleClose}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                  </>
                )}
              </Box>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
