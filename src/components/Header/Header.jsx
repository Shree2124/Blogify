import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../context/ThemeContext";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { darkMode, toggleTheme } = useThemeContext();
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header
      className={`py-3 shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {!isSmallScreen && (
            <Box component="ul" display="flex" gap={2}>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`px-4 py-2 rounded-md ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </Box>
          )}
          <div>
            <IconButton onClick={toggleTheme}>
              <Tooltip title="Theme">
                {darkMode ? (
                  <Brightness7Icon
                    style={{ color: darkMode ? "white" : "black" }}
                  />
                ) : (
                  <Brightness4Icon
                    style={{ color: darkMode ? "white" : "black" }}
                  />
                )}
              </Tooltip>
              </IconButton>
              {authStatus && !isSmallScreen && (
                <IconButton className="p-2">
                  <LogoutBtn />
                </IconButton>
              )}
          </div>

          {isSmallScreen && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              edge="end"
              aria-label="menu"
            >
              <MenuIcon style={{ color: darkMode ? "white" : "black" }} />
            </IconButton>
          )}
        </nav>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            width={250}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
              p={1}
              borderBottom={1}
              borderColor="divider"
            >
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {navItems.map(
                (item) =>
                  item.active && (
                    <ListItem
                      button
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItem>
                  )
              )}
              {authStatus && (
                <>
                  <Divider />
                  <ListItem button key="logout">
                    <LogoutBtn />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Container>
    </header>
  );
}

export default Header;
