import React from "react";
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
} from "@mui/icons-material";

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
}

const SidebarContainer = styled("aside")({
  width: "250px",
  backgroundColor: "#0a192f",
  color: "#fff",
  padding: "20px",
  paddingTop: "80px",
  height: "100vh",
  position: "fixed",
  overflowY: "auto",
});

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

const StyledLink = styled(Link)({
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
  justifyContent: "flex-start",
});

const IconWrapper = styled("span")({
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
});

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  return (
    <SidebarContainer>
      <Menu>
        <MenuItem>
          <StyledLink href="/dashboard" passHref>
            <IconWrapper>
              <Dashboard />
            </IconWrapper>
            Dashboard
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/shipping" passHref>
            <IconWrapper>
              <LocalShipping />
            </IconWrapper>
            Shipments
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/inventory" passHref>
            <IconWrapper>
              <Inventory />
            </IconWrapper>
            Inventory
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/fleet" passHref>
            <IconWrapper>
              <DirectionsCar />
            </IconWrapper>
            Fleet Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/routing" passHref>
            <IconWrapper>
              <Map />
            </IconWrapper>
            Route Planning
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/analytics" passHref>
            <IconWrapper>
              <Assessment />
            </IconWrapper>
            Analytics & Reports
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/management" passHref>
            <IconWrapper>
              <People />
            </IconWrapper>
            Customer Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/user-management" passHref>
            <IconWrapper>
              <People />
            </IconWrapper>
            User Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/settings" passHref>
            <IconWrapper>
              <Settings />
            </IconWrapper>
            Settings
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/help" passHref>
            <IconWrapper>
              <Help />
            </IconWrapper>
            Help & Support
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/feedback" passHref>
            <IconWrapper>
              <Feedback />
            </IconWrapper>
            Feedback
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/logout" passHref>
            <IconWrapper>
              <ExitToApp />
            </IconWrapper>
            Logout
          </StyledLink>
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
