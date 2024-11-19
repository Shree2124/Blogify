import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LogoutOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="text-base" onClick={logoutHandler}>
      <Tooltip title="Logout">
      <LogoutOutlined />
      </Tooltip>
    </button>
  );
}

export default LogoutBtn;
