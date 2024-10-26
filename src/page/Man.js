import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { fetchDat } from "../DB/API";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function MAN() {
  const [ope, setOpe] = useState(true);
  const [mk, SetMk] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Navigate = useNavigate();

  const [d, setD] = useState("");
  let res = useCallback(async () => {
    const resd = await fetchDat();
    await setD(resd);
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("auth")) Navigate("/login");
    res();
  }, [res, mk]);

  const { id } = useParams();
  let mmo = JSON.parse(localStorage.getItem("au"));
  let mm = [mmo];
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
  let nm = {};
  const data = d.filter((m) => m.id == mm[0].id);
  let hve = data[0].employees;
  let e = d.filter((a) => a.managerId == id);
  let empty = d.filter((a) => a.managerId == null && !a.isManager);
  function om(a) {
    if (nm[a]) {
      delete nm[a];
    } else {
      nm[a] = true;
    }
  }
  let empemp = empty.map((v) => (
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

  async function asn(e) {
    e.preventDefault();
    let p = Object.keys(nm).map((l) => parseInt(l));
    await axios.patch(
      `https://free-ap-south-1.cosmocloud.io/development/api/userdetails/${data[0]._id}`,
      { employees: p },
      {
        headers: {
          environmentId: "670e99ff59c9b368f802bb25",
          projectid: "670e99ff59c9b368f802bb24",
        },
      },
    );

    let g = JSON.parse(localStorage.getItem("auth"));
    for (let a in nm) {
      let n = d.filter((b) => b.id == a);
      await axios.patch(
        `https://free-ap-south-1.cosmocloud.io/development/api/userdetails/${n[0]._id}`,
        { managerId: parseInt(g.id) },
        {
          headers: {
            environmentId: "670e99ff59c9b368f802bb25",
            projectid: "670e99ff59c9b368f802bb24",
          },
        },
      );
    }
    SetMk(!mk);
    handleClose();
  }
  let f = e.map((a) => (
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
        <h1>MANAGER NAME: {mm[0].name.toUpperCase()}</h1>
      </div>
      <ol>{f}</ol>
      <div>
        {hve ? (
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
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                ></Typography>
                <form onSubmit={asn}>
                  {empemp}
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </form>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
              </Box>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
