import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/S.css";
import Header from "../head&foot/header";
import { fetchData } from "../DB/API";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Footer from "../head&foot/footer";
import CircularProgress from "@mui/material/CircularProgress";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EMP() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  let loggedInUser = JSON.parse(localStorage.getItem("au"));
  if (loggedInUser.id != id && !localStorage.getItem("au")) Navigate("/login");
  const [dataApi, setDataApi] = useState("");
  const [taskApi, setTaskApi] = useState("");

  let apiResult = useCallback(async () => {
    const response = await fetchData();
    const res = await axios.get(
      `https://free-ap-south-1.cosmocloud.io/development/api/taskdetails?limit=100&offset=0`,
      {
        headers: {
          environmentId: "670e99ff59c9b368f802bb25",
          projectid: "670e99ff59c9b368f802bb24",
        },
      },
    );
    setDataApi(response);
    setTaskApi(res.data.data);
  }, []);
  useEffect(() => {
    apiResult();
  }, [apiResult]);
  if (!dataApi || !taskApi) {
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

  let userData = dataApi.filter((a) => a.id == id);

  const userTask = taskApi.filter((a) => a.assignedTo == id);

  const taskTitle = userTask.map((a) => (
    <div
      style={{
        display: "flex",
        border: "2px solid black",
        marginTop: "4px",
        marginLeft: "4px",
        width: "450px",
        height: `${a.title.length > 20 ? `${a.length * 3}px` : "60px"}`,
        textAlign: "left",
      }}
      key={a._id}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
        <div style={{ display: "flex" }}>{a.title}</div>
        <div>Due Date : {a.dueDate}</div>
      </div>
      <div
        style={{
          width: `200px`,
          marginLeft: "50px",
          marginTop: "5px",
          textAlign: "end",
        }}
      >
        <div>
          <Button
            variant="contained"
            onClick={() => setOpen(a._id)}
            style={{ padding: "0" }}
          >
            Status
          </Button>
          <Modal
            open={open == a._id}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                {a.status}
              </Typography>
            </Box>
          </Modal>
        </div>
        <div>
          <Button
            style={{ padding: "0", marginTop: "3px", color: "black" }}
            onClick={() => setDetailsModal(a._id)}
          >
            Details
          </Button>
          <Modal
            open={detailsModal == a._id}
            onClose={() => setDetailsModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                {a.description}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  ));

  let userManager = userData[0].managerId;

  let managerName = dataApi.filter((a) => userManager == a.id);

  let coWorkersList = dataApi.filter(
    (m) => m.managerId == userManager && userData[0].id !== m.id,
  );

  let coWorkersName = coWorkersList.map((a) => <li key={a.id}>{a.name}</li>);

  let coWorkersID = coWorkersList.map((a) => <li key={a.id}>{a.id}</li>);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Header name={loggedInUser} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ display: "flex", marginLeft: "150px" }}>
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
            <p>Name: {userData[0].name}</p>
            <p>Employee Id:{userData[0].id}</p>
            <p>Email:{userData[0].email}</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              Password:
              <div style={{ marginTop: "5px", marginBottom: "0px" }}>
                {userData[0].password
                  .split("")
                  .map((a) => "*")
                  .join("")}
              </div>
            </div>
            <p>Age:{userData[0].age}</p>
          </div>
          <br></br>
          <br></br>

          <div
            id="2"
            style={{
              marginLeft: "25px",

              borderRadius: "20px",
              width: "500px",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            <p>
              Manager Name:
              {managerName[0] ? managerName[0].name : " Not Assigned"}
            </p>
            <div>
              Co Workers:
              {!userManager ? (
                <p>NO CO-WORKERS</p>
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
                      <ol style={{ paddingLeft: "5px" }}>{coWorkersName}</ol>
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
                      <ol style={{ paddingLeft: "25px" }}>{coWorkersID}</ol>
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
            marginLeft: "150px",
            width: "480px",
            height: "500px",
            borderRadius: "10px",
            backgroundColor: "gray",
            overflow: "auto",
          }}
        >
          <div>Tasks</div>
          <div>
            {taskTitle.length ? (
              taskTitle
            ) : (
              <center>
                <p>NO TASKS FOUND</p>
              </center>
            )}
          </div>
        </div>
      </div>

      <Footer style={{ justifyContent: "end" }} />
    </div>
  );
}
