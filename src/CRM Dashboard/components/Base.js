import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import { CssBaseline, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupsIcon from "@mui/icons-material/Groups";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from "react-router-dom";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import "../components/base.css";
import { useAuth } from "../auth/AuthContext";
import { ToastContainer } from "react-toastify";
import image from "../assets/logo.png";
import ApartmentIcon from "@mui/icons-material/Apartment";

export const Base = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(() => {
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    return savedSidebarState ? JSON.parse(savedSidebarState) : false;
  });

  const [openEmployee, setOpenEmployee] = useState(
    currentPath.includes("/add-employees") ||
      currentPath.includes("/list-employees") ||
      currentPath.includes("/employees-pending-leaves") ||
      currentPath.includes("/employees-rejected-leaves") ||
      currentPath.includes("/employees-approved-leaves") ||
      currentPath.includes("/employees-punch-activity") ||
      currentPath.includes("/work-reports")
  );
  const [openHolidays, setOpenHolidays] = useState(
    currentPath.includes("/add-holiday") ||
      currentPath.includes("/list-holidays")
  );
  const [openShifts, setOpenShifts] = useState(
    currentPath.includes("/add-shift") || currentPath.includes("/list-shift")
  );
  const [openBranch, setOpenBranch] = useState(
    currentPath.includes("/add-branch") || currentPath.includes("/list-branch")
  );
  const [openAccount, setOpenAccount] = useState(false);

  const [openDepartments, setOpenDepartments] = useState(
    currentPath.includes("/add-department") ||
      currentPath.includes("/list-departments")
  );

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem("sidebarOpen", JSON.stringify(newIsOpen));
  };

  const handleEmployeeClick = () => setOpenEmployee(!openEmployee);
  const handleHolidaysClick = () => setOpenHolidays(!openHolidays);
  const handleShiftsClick = () => setOpenShifts(!openShifts);
  const handleBranchClick = () => setOpenBranch(!openBranch);
  const handleAccountClick = () => setOpenAccount(!openAccount);
  const handleDepartmentsClick = () => setOpenDepartments(!openDepartments);

  useEffect(() => {
    const storedSidebarState = localStorage.getItem("sidebarOpen");
    if (storedSidebarState) {
      setIsOpen(JSON.parse(storedSidebarState));
    }
  }, []);

  const getLinkStyles = (path) => ({
    backgroundColor: currentPath === path ? "#99cccc" : "transparent",
    fontWeight: currentPath === path ? "bold" : "normal",
    borderRadius: "20px",
  });

  const [anchorEl, setAnchorEl] = useState(null);

  // Handle dropdown open
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="crm-sidebar"
      style={{ display: "flex", paddingBottom: "10px" }}
    >
      <>
        <div
          className={`sidebar ${isOpen ? "open" : ""}`}
          style={{
            width: isOpen ? "250px" : "65px",
            transition: "width",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              backgroundColor: "green",
              textAlign: "center",
              padding: isOpen ? "0px 0" : "32px 0",
            }}
          >
            {isOpen ? (
              <>
                <img src={image} style={{ width: 250, height: 150 }} />
              </>
            ) : (
              <div style={{ height: "8vh" }}></div>
            )}
          </div>

          <List className="list" component="nav" style={{ paddingTop: "30px" }}>
            {/* Home Button */}
            <ListItem
              button
              component="a"
              href="/dashboard"
              className="list-item-main"
              sx={{
                ...getLinkStyles("/dashboard"),
              }}
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <HomeIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Dashboard
                    </Typography>
                  }
                  sx={{
                    fontWeight: "normal",
                  }} // Bold if active
                />
              )}
            </ListItem>

            {/* Employee Dropdown */}
            <ListItem
              button
              onClick={() => {
                handleEmployeeClick();
              }}
              component="a"
              href={isOpen ? undefined : "/add-employees"}
              className="list-item-main"
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <GroupsIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Employees
                    </Typography>
                  }
                />
              )}
              {isOpen &&
                (openEmployee ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItem>

            <Collapse in={openEmployee && isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component="a"
                  href="/add-employees"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/add-employees"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Add Employee</Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="/list-employees"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/list-employees"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Employee List</Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="/employees-approved-leaves"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/employees-approved-leaves"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Approved Leaves</Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="/employees-pending-leaves"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/employees-pending-leaves"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Pending Leaves</Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="/employees-rejected-leaves"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/employees-rejected-leaves"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Rejected Leaves</Typography>
                    }
                  />
                </ListItem>

                <ListItem
                  button
                  component="a"
                  href="/employees-punch-activity"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/employees-punch-activity"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Punch Activity</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/work-reports"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/work-reports"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Work Reports</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Holidays Dropdown */}
            <ListItem
              button
              onClick={() => {
                handleHolidaysClick();
              }}
              component="a"
              href={isOpen ? undefined : "/add-holiday"}
              className="list-item-main"
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <CalendarMonthIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Holidays
                    </Typography>
                  }
                />
              )}
              {isOpen &&
                (openHolidays ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItem>

            <Collapse in={openHolidays && isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component="a"
                  href="/add-holiday"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/add-holiday"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Add Holidays</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/list-holidays"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/list-holidays"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Holidays List</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Departments Dropdown */}
            <ListItem
              button
              onClick={() => {
                handleDepartmentsClick();
              }}
              component="a"
              href={isOpen ? undefined : "/add-department"}
              className="list-item-main"
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <WarehouseIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Departments
                    </Typography>
                  }
                />
              )}
              {isOpen &&
                (openHolidays ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItem>

            <Collapse
              in={openDepartments && isOpen}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  button
                  component="a"
                  href="/add-department"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/add-department"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Add Departments</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/list-departments"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/list-departments"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Departments List</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Branches Dropdown */}
            <ListItem
              button
              onClick={() => {
                handleBranchClick();
              }}
              component="a"
              href={isOpen ? undefined : "/add-branch"}
              className="list-item-main"
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <ApartmentIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Branches
                    </Typography>
                  }
                />
              )}
              {isOpen && (openBranch ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItem>

            <Collapse in={openBranch && isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component="a"
                  className="list-item"
                  href="/add-branch"
                  sx={{
                    ...getLinkStyles("/add-branch"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Add Branch</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/list-branch"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/list-branch"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Branch List</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Shifts Dropdown */}
            <ListItem
              button
              onClick={() => {
                handleShiftsClick();
              }}
              component="a"
              href={isOpen ? undefined : "/add-shift"}
              className="list-item-main"
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <AccessTimeIcon sx={{ color: "white", fontSize: 30 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Shifts
                    </Typography>
                  }
                />
              )}
              {isOpen && (openShifts ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItem>

            <Collapse in={openShifts && isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component="a"
                  className="list-item"
                  href="/add-shift"
                  sx={{
                    ...getLinkStyles("/add-shift"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Add Shifts</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/list-shift"
                  className="list-item"
                  sx={{
                    ...getLinkStyles("/list-shift"),
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Shifts List</Typography>
                    }
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Enquiries Button */}
            <ListItem
              button
              component="a"
              href="/enquries"
              className="list-item-main"
              sx={{
                ...getLinkStyles("/enquries"),
              }}
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <PhoneEnabledIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Enquries
                    </Typography>
                  }
                  sx={{
                    fontWeight: "normal",
                  }}
                />
              )}
            </ListItem>

            {/* Account Settings Dropdown */}
            <ListItem
              button
              onClick={() => {
                handleAccountClick();
              }}
              component="a"
              href={isOpen ? undefined : "/"}
              className="list-item-main"
            >
              <ListItemIcon sx={{ minWidth: "35px", justifyContent: "center" }}>
                <SettingsIcon sx={{ color: "white", fontSize: 25 }} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                      Account Settings
                    </Typography>
                  }
                />
              )}
              {isOpen &&
                (openAccount ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItem>

            <Collapse in={openAccount && isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component="a"
                  href="/change-password"
                  className="list-item"
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2">Change Password</Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  button
                  component="a"
                  onClick={logout}
                  className="list-item"
                >
                  <ListItemText
                    primary={<Typography variant="body2">Logout</Typography>}
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </>
      <div
        id="main"
        style={{
          marginLeft: isOpen ? "250px" : "51px",
          flex: 1,
        }}
      >
        <div
          className="navbar"
          style={{
            left: isOpen ? "250px" : "60px", // Offset for sidebar
            zIndex: 10, // Keep header above content
            backgroundColor: "#1D3853",
          }}
        >
          <MenuIcon
            onClick={toggleSidebar}
            sx={{ fontSize: 30, color: "white", cursor: "pointer" }}
          />
          <div style={{ display: "flex", alignItems: "start" }}>
            <PhoneIcon
              sx={{
                fontSize: 20,
                color: "white",
                marginRight: "5px",
                paddingTop: "5px",
              }}
            />
            <span style={{ color: "white", fontSize: "16px" }}>
              +91 6262666999
            </span>
          </div>
          <AccountCircleIcon
            sx={{
              fontSize: 30,
              color: "#0DD354",
              cursor: "pointer",
              marginRight: isOpen ? "250px" : "50px",
            }}
            onClick={handleClick}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ marginTop: "40px" }} // Adjust the dropdown position
          >
            <MenuItem>Change Password</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>

        <CssBaseline />
        <ToastContainer position="top-right" />
        <section className="main" style={{ overflow: "hidden" }}>
          {children}
        </section>
      </div>
    </div>
  );
};
