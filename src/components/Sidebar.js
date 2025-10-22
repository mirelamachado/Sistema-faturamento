import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Importar Planilha", icon: <UploadFileIcon />, path: "/importacao" },
  { text: "Repasses", icon: <TableChartIcon />, path: "/repasses" },
  { text: "Sair", icon: <ExitToAppIcon />, path: "/" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer variant="permanent" sx={{ width: 220, [`& .MuiDrawer-paper`]: { width: 220 } }}>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            component={Link}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
