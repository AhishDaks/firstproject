import { FaUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
export default function Header({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "blue",
        justifyContent: "space-between",

        width: `${window.innerWidth}px`,
        color: "white",
        height: "40px",
      }}
    >
      <div>
        <h5 style={{ marginTop: "8px" }}>
          <i>Tech Global</i>
        </h5>
      </div>
      <div style={{ display: "flex" }}>
        <Button
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              borderRadius: "10px",

              marginRight: "15px",
            }}
          >
            <FaUser style={{ marginTop: "20px", marginRight: "2px" }} />
            <p>{name.name}</p>
          </div>
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/${name.id}/logout`}
            >
              LOG OUT
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
