import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";

function Navbar() {
  const [openSideBar, setOpenSideBar] = useState(false);

  //for handling logout
  let history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="navwrapper">
      <nav>
        <Hidden mdUp>
          <IconButton
            onClick={() => {
              setOpenSideBar(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={openSideBar}
            onClose={() => {
              setOpenSideBar(false);
            }}
          >
            <div className="sidebar-close-btn">
              <IconButton
                onClick={() => {
                  setOpenSideBar(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <Divider />
            <div className="sidebar-content">
              <NavLink to="/dashboard" className="sidebar-nav-link">
                Dashboard
              </NavLink>
              <NavLink to="/stats" className="sidebar-nav-link">
                Statistics
              </NavLink>
            </div>
          </Drawer>
        </Hidden>
        <div className="dashboard-left">
          <div className="main-logo">
            <img
              className="main-icon"
              src={"/images/icons/wallet.png"}
              alt="main-icon"
              width="30px"
              height="30px"
            />
            <p className="logo-text">Expense Tracker</p>
          </div>
          <Hidden smDown>
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </Hidden>
          <Hidden smDown>
            <NavLink to="/stats" className="nav-link">
              Statistics
            </NavLink>
          </Hidden>
        </div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AccountCircleIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </nav>
    </div>
  );
}

export default Navbar;
