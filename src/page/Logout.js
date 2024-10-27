import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Logout() {
  const [render, setRender] = useState(true);
  const { id } = useParams();

  const Navigate = useNavigate();
  let ID = JSON.parse(localStorage.getItem("au"));
  useEffect(() => {
    if (!localStorage.getItem("au") && !localStorage.getItem("auth"))
      Navigate("/login");
  }, [render]);

  function am() {
    localStorage.clear();
    setRender(false);
  }
  function om() {
    window.history.back();
  }
  return (
    <div>
      <p style={{ color: "black" }}>Are you sure want to log out?</p>
      <button
        onClick={am}
        style={{
          textDecoration: "none",
          marginRight: "2px",
          border: "2px solid red",
          backgroundColor: "red",
          color: "white",
        }}
      >
        YES
      </button>
      <button
        onClick={om}
        style={{
          textDecoration: "none",
          border: "2px solid red",
          backgroundColor: "red",
          color: "white",
        }}
      >
        NO
      </button>
    </div>
  );
}
