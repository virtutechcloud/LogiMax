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
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { green } from "@mui/material/colors";
import { usePathname } from "next/navigation";

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
}

const SidebarContainer = styled("aside")({
  width: "250px",
  background: "linear-gradient(to bottom, #0a192f, #112240)",
  color: "#fff",
  padding: "24px 16px",
  height: "100vh",
  position: "fixed",
  boxShadow: "4px 0 10px rgba(0, 0, 0, 0.2)",
  borderRight: "1px solid rgba(255, 255, 255, 0.05)",
  overflowY: "auto",
});

const Menu = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const MenuItem = styled("li")({
  marginBottom: 0,
  display: "flex",
  alignItems: "center",
});

const StyledLink = styled(Link)<{ active?: boolean }>(({ active }) => ({
  textDecoration: "none",
  color: "#fff",
  padding: "10px 14px",
  display: "flex",
  alignItems: "center",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  width: "100%",
  backgroundColor: active ? "#112240" : "transparent",
  color: active ? "#64ffda" : "#fff",
  "&:hover": {
    backgroundColor: "#112240",
    transform: "translateX(5px)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    color: "#64ffda",
  },
  justifyContent: "flex-start",
}));

const IconWrapper = styled("span")({
  marginRight: "10px",
  display: "flex",
  alignItems: "center",
});

const ProfileSection = styled("div")({
  textAlign: "center",
  padding: "20px 0",
  borderBottom: "1px solid #1e2d3d",
  marginBottom: "24px",
});

const UserAvatar = styled(Avatar)({
  width: "70px",
  height: "70px",
  margin: "0 auto 16px",
  border: "3px solid #1e2d3d",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
});

const UserInfo = styled("div")({
  marginBottom: "8px",
});

const UserName = styled("h3")({
  margin: "0 0 8px",
  fontSize: "1.1rem",
  fontWeight: 600,
});

const UserRole = styled("span")({
  color: "#8892b0",
  fontSize: "0.9rem",
  display: "block",
});

const QuickActions = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
});

const StatusBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    backgroundColor: green[500],
    color: green[500],
    boxShadow: `0 0 0 2px #0a192f`,
  },
});

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <ProfileSection>
        <StatusBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <UserAvatar alt="User Name" src="/path-to-avatar.jpg" />
        </StatusBadge>
        <UserInfo>
          <UserName>John Doe</UserName>
          <UserRole>Fleet Manager</UserRole>
        </UserInfo>
      </ProfileSection>

      <Menu>
        <MenuItem>
          <StyledLink
            href="/dashboard"
            active={pathname === "/dashboard"}
            passHref
          >
            <IconWrapper>
              <Dashboard />
            </IconWrapper>
            Dashboard
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/shipping"
            active={pathname === "/shipping"}
            passHref
          >
            <IconWrapper>
              <LocalShipping />
            </IconWrapper>
            Shipments
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/inventory"
            active={pathname === "/inventory"}
            passHref
          >
            <IconWrapper>
              <Inventory />
            </IconWrapper>
            Inventory Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/fleet" active={pathname === "/fleet"} passHref>
            <IconWrapper>
              <DirectionsCar />
            </IconWrapper>
            Fleet Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/routing" active={pathname === "/routing"} passHref>
            <IconWrapper>
              <Map />
            </IconWrapper>
            Route Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/analytics"
            active={pathname === "/analytics"}
            passHref
          >
            <IconWrapper>
              <Assessment />
            </IconWrapper>
            Analytics & Reports
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/customer-management"
            active={pathname === "/customer-management"}
            passHref
          >
            <IconWrapper>
              <People />
            </IconWrapper>
            Customer Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/user-management"
            active={pathname === "/user-management"}
            passHref
          >
            <IconWrapper>
              <People />
            </IconWrapper>
            User Management
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/settings"
            active={pathname === "/settings"}
            passHref
          >
            <IconWrapper>
              <Settings />
            </IconWrapper>
            Settings
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href="/help" active={pathname === "/help"} passHref>
            <IconWrapper>
              <Help />
            </IconWrapper>
            Help & Support
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink
            href="/feedback"
            active={pathname === "/feedback"}
            passHref
          >
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
