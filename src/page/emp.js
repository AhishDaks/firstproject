import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import "../Style/S.css";
import { fetchDat } from "../DB/API";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function EMP() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [ope, setOpe] = useState(true);
  let mmo = JSON.parse(localStorage.getItem("au"));
  if (mmo.id != id && !localStorage.getItem("au")) Navigate("/login");
  const [d, setD] = useState("");
  let res = useCallback(async () => {
    const resd = await fetchDat();
    await setD(resd);
  }, []);
  useEffect(() => {
    res();
  }, [res]);
  if (!d) {
    return (
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={ope}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  let mm = [mmo];
  let mmm = d.filter((a) => a.id == id);
  let mani = mmm[0].managerId;
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
            to={`/${mm[0].id}/logout`}
          >
            LOG OUT
          </Link>
        </Button>

        <FaUser style={{ paddingTop: "5px", marginRight: "2px" }} />
        {mm[0].name}
        <div>
          {mani ? <p></p> : <Button variant="contained">ADD MANAGER</Button>}
        </div>
        <h1>EMPLOYEE NAME: {mmm[0].name.toUpperCase()}</h1>
      </div>
    </div>
  );
}
