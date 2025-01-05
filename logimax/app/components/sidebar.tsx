import React, { useState } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Dashboard,
  LocalShipping,
  Inventory,
  DirectionsCar,
  Map,
  Assessment,
  People,
  Settings,
  Help,
  Feedback,
  ExitToApp,
  Menu as MenuIcon,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const SidebarContainer = styled("aside")<{ isCollapsed: boolean }>(
  ({ theme, isCollapsed }) => ({
    width: isCollapsed ? "60px" : "250px",
    backgroundColor: "#0a192f",
    color: "#fff",
    padding: "20px",
    height: "100vh",
    position: "fixed",
    overflowY: "auto",
    transition: "width 0.3s",
  })
);

const Menu = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const MenuItem = styled("li")({
  marginBottom: "15px",
  display: "flex",
  alignItems: "center",
});

const StyledLink = styled(Link)<{ isCollapsed: boolean }>(
  ({ isCollapsed }) => ({
    textDecoration: "none",
    color: "#fff",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#112240",
    },
    justifyContent: isCollapsed ? "center" : "flex-start",
  })
);

const IconWrapper = styled("span")({
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
});

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <IconButton
        onClick={toggleSidebar}
        style={{ color: "#fff", marginBottom: "20px" }}
      >
        <MenuIcon />
      </IconButton>
      <Menu>
        <MenuItem>
          <StyledLink href="/dashboard" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <Dashboard />
            </IconWrapper>
            {!isCollapsed && "Dashboard"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/shipments" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <LocalShipping />
            </IconWrapper>
            {!isCollapsed && "Shipments"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/inventory" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <Inventory />
            </IconWrapper>
            {!isCollapsed && "Inventory"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/fleet-management"
            passHref
            isCollapsed={isCollapsed}
          >
            <IconWrapper>
              <DirectionsCar />
            </IconWrapper>
            {!isCollapsed && "Fleet Management"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/routing" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <Map />
            </IconWrapper>
            {!isCollapsed && "Route Planning"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/analytics-reports"
            passHref
            isCollapsed={isCollapsed}
          >
            <IconWrapper>
              <Assessment />
            </IconWrapper>
            {!isCollapsed && "Analytics & Reports"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/customer-management"
            passHref
            isCollapsed={isCollapsed}
          >
            <IconWrapper>
              <People />
            </IconWrapper>
            {!isCollapsed && "Customer Management"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/user-management"
            passHref
            isCollapsed={isCollapsed}
          >
            <IconWrapper>
              <People />
            </IconWrapper>
            {!isCollapsed && "User Management"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/settings" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <Settings />
            </IconWrapper>
            {!isCollapsed && "Settings"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/help-support" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <Help />
            </IconWrapper>
            {!isCollapsed && "Help & Support"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/feedback" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <Feedback />
            </IconWrapper>
            {!isCollapsed && "Feedback"}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/logout" passHref isCollapsed={isCollapsed}>
            <IconWrapper>
              <ExitToApp />
            </IconWrapper>
            {!isCollapsed && "Logout"}
          </StyledLink>
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
