import { FaCopyright } from "react-icons/fa";
export default function Footer() {
  return (
    <div style={{ backgroundColor: "gray", marginTop: "145px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <FaCopyright
          size="20px"
          style={{ marginTop: "3px", marginRight: "2px" }}
        />{" "}
        Copyrights-2024
      </div>
    </div>
  );
}
