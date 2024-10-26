import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Logout() {
  const [l, setL] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("au") && !localStorage.getItem("auth"))
      Navigate("/login");
  }, [l]);

  function am() {
    localStorage.removeItem("au");
    localStorage.removeItem("auth");
    setL(false);
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
