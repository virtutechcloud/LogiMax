import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircle,
} from "@mui/icons-material";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        LogiMax
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

const Section = ({ title, children }: SectionProps) => (
  <div style={{ marginBottom: 20 }}>
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">{title}</Typography>
      {children}
    </Paper>
  </div>
);

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <div style={{ marginTop: 20 }}>
        <Section title="Main Metrics Overview">
          <Typography>Total Shipments: 100</Typography>
          <Typography>Active Shipments: 20</Typography>
          <Typography>Delivered Shipments: 70</Typography>
          <Typography>Pending Shipments: 10</Typography>
        </Section>

        <Section title="KPI Widgets">
          <Typography>Average Delivery Time: 2 days</Typography>
          <Typography>On-Time Delivery Rate: 95%</Typography>
          <Typography>Inventory Levels: Critical</Typography>
        </Section>

        <Section title="Recent Activity">
          <List>
            <ListItem>
              <ListItemText primary="New shipment created" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Shipment dispatched" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Delivery completed" />
            </ListItem>
          </List>
        </Section>

        <Section title="Graphical Data Visualization">
          <Typography>Shipment Trends Graph</Typography>
          <Typography>Delivery Performance Chart</Typography>
        </Section>

        <Section title="Quick Actions">
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Create New Shipment
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Manage Inventory
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            View Reports
          </Button>
          <Button variant="contained" color="primary">
            Route Optimization
          </Button>
        </Section>

        <Section title="Alerts and Notifications">
          <Typography>Low inventory warning</Typography>
          <Typography>Delayed shipment notification</Typography>
        </Section>

        <Section title="Customer Insights">
          <Typography>Top customers by shipment volume</Typography>
          <Typography>Customer satisfaction ratings</Typography>
        </Section>

        <Section title="Integration Status">
          <Typography>Integration with shipping carriers: Healthy</Typography>
        </Section>

        <Section title="Footer">
          <Typography>Help Documentation</Typography>
          <Typography>Support</Typography>
          <Typography>Contact Information</Typography>
        </Section>
      </div>
    </Container>
  );
};

export default Dashboard;
