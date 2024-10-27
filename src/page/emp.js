import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import "../Style/S.css";
import { fetchData } from "../DB/API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function EMP() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  let loggedInUser = JSON.parse(localStorage.getItem("au"));
  if (loggedInUser.id != id && !localStorage.getItem("au")) Navigate("/login");
  const [dataApi, setDataApi] = useState("");
  let apiResult = useCallback(async () => {
    const response = await fetchData();
    await setDataApi(response);
  }, []);
  useEffect(() => {
    apiResult();
  }, [apiResult]);
  if (!dataApi) {
    return (
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  let userData = dataApi.filter((a) => a.id == id);

  let userManager = userData[0].managerId;
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
            to={`/${userData[0].id}/logout`}
          >
            LOG OUT
          </Link>
        </Button>

        <FaUser style={{ paddingTop: "5px", marginRight: "2px" }} />
        {loggedInUser.name}
        <div>
          {userManager ? (
            <p></p>
          ) : (
            <Button variant="contained">ADD MANAGER</Button>
          )}
        </div>
        <h1>EMPLOYEE NAME: {userData[0].name.toUpperCase()}</h1>
      </div>
    </div>
  );
}
