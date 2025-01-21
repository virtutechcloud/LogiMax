"use client";

import React, { useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Package,
  MagnifyingGlass,
  Plus,
  Printer,
  DotsThree,
  ArrowsClockwise,
  Tag,
  Truck,
  CheckCircle,
  Clock,
  Warning,
  FunnelSimple,
  Export,
  TrendUp,
  TrendDown,
} from "@phosphor-icons/react";
import Sidebar from "@/app/components/appComponents/sidebar";

// Enhanced mock data with more fields and statuses
const mockShipments = [
  {
    id: "SHP001",
    orderNumber: "ORD-2024-001",
    customer: "John Smith",
    destination: "New York, NY",
    status: "In Transit",
    carrier: "FedEx",
    created: "2024-03-15",
    eta: "2024-03-17",
    trackingNumber: "1Z999AA1234567890",
    weight: "5.2 lbs",
    service: "2-Day Air",
    cost: "$45.99",
  },
  {
    id: "SHP002",
    orderNumber: "ORD-2024-002",
    customer: "Alice Johnson",
    destination: "Los Angeles, CA",
    status: "Pending",
    carrier: "UPS",
    created: "2024-03-15",
    eta: "2024-03-18",
  },
  // ... Add more mock shipments as needed
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`shipment-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Update ShippingMetrics component to match dashboard styling
const ShippingMetrics: React.FC = () => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    {[
      {
        title: "Total Shipments",
        value: "156",
        icon: <Package size={24} />,
        trend: "up",
        change: "12%",
      },
      {
        title: "In Transit",
        value: "34",
        icon: <Truck size={24} />,
        trend: "up",
        change: "5%",
      },
      {
        title: "Delivered Today",
        value: "28",
        icon: <CheckCircle size={24} />,
        trend: "up",
        change: "8%",
      },
      {
        title: "Pending",
        value: "12",
        icon: <Clock size={24} />,
        trend: "down",
        change: "2%",
      },
    ].map((metric, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Card
          sx={{
            bgcolor: "#0f1729",
            border: "1px solid rgba(34, 211, 238, 0.2)",
            "&:hover": {
              border: "1px solid rgba(34, 211, 238, 0.4)",
            },
            height: "100%",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                {metric.title}
              </Typography>
              <Box sx={{ color: "#22d3ee" }}>{metric.icon}</Box>
            </Box>
            <Typography variant="h4" sx={{ color: "white" }}>
              {metric.value}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
                color: metric.trend === "up" ? "#10b981" : "#ef4444",
              }}
            >
              {metric.trend === "up" ? (
                <TrendUp size={16} weight="bold" />
              ) : (
                <TrendDown size={16} weight="bold" />
              )}
              <Typography variant="caption">{metric.change}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// Update SearchSection styling
const SearchSection: React.FC = () => (
  <Paper
    sx={{
      bgcolor: "#0f1729",
      border: "1px solid rgba(34, 211, 238, 0.2)",
      "&:hover": {
        border: "1px solid rgba(34, 211, 238, 0.4)",
      },
      mb: 4,
      p: 3,
    }}
  >
    <div className="flex flex-wrap gap-4 items-center">
      <TextField
        placeholder="Search shipments..."
        variant="outlined"
        size="small"
        className="flex-1 min-w-[200px]"
        InputProps={{
          startAdornment: <MagnifyingGlass className="text-white mr-2" />,
          sx: {
            bgcolor: "#0a192f",
            color: "white",
            "& input": {
              color: "white",
            },
            "&::placeholder": {
              color: "white",
            },
            "& fieldset": {
              borderColor: "rgba(34, 211, 238, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(34, 211, 238, 0.4) !important",
            },
          },
        }}
      />
      <div className="flex gap-2">
        {[
          { icon: <FunnelSimple weight="bold" />, label: "Filter" },
          { icon: <Export weight="bold" />, label: "Export" },
          { icon: <Printer weight="bold" />, label: "Batch Print" },
        ].map((btn) => (
          <Button
            key={btn.label}
            variant="outlined"
            startIcon={btn.icon}
            sx={{
              borderColor: "rgba(34, 211, 238, 0.2)",
              color: "white",
              "&:hover": {
                borderColor: "rgba(34, 211, 238, 0.4)",
                backgroundColor: "rgba(34, 211, 238, 0.1)",
              },
            }}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  </Paper>
);

// Enhanced ShipmentsTable component
const ShipmentsTable: React.FC = () => (
  <TableContainer
    component={Paper}
    sx={{
      bgcolor: "#0f1729",
      border: "1px solid rgba(34, 211, 238, 0.2)",
      "&:hover": {
        border: "1px solid rgba(34, 211, 238, 0.4)",
      },
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          {[
            "ID",
            "Order",
            "Customer",
            "Destination",
            "Status",
            "Carrier",
            "Service",
            "Weight",
            "Cost",
            "Tracking",
            "Actions",
          ].map((header) => (
            <TableCell
              key={header}
              sx={{ color: "white" }}
              className="font-medium"
            >
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {mockShipments.map((shipment) => (
          <TableRow key={shipment.id} className="hover:bg-navy-darker">
            <TableCell sx={{ color: "white" }}>{shipment.id}</TableCell>
            <TableCell sx={{ color: "white" }}>
              {shipment.orderNumber}
            </TableCell>
            <TableCell sx={{ color: "white" }}>{shipment.customer}</TableCell>
            <TableCell sx={{ color: "white" }}>
              {shipment.destination}
            </TableCell>
            <TableCell>
              <Chip
                label={shipment.status}
                className={`${
                  shipment.status === "In Transit"
                    ? "bg-cyan-400/30 text-cyan-400"
                    : "bg-amber-400/30 text-amber-400"
                }`}
                size="small"
              />
            </TableCell>
            <TableCell sx={{ color: "white" }}>{shipment.carrier}</TableCell>
            <TableCell sx={{ color: "white" }}>{shipment.service}</TableCell>
            <TableCell sx={{ color: "white" }}>{shipment.weight}</TableCell>
            <TableCell sx={{ color: "white" }}>{shipment.cost}</TableCell>
            <TableCell>
              <Button
                size="small"
                startIcon={<MagnifyingGlass />}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(34, 211, 238, 0.1)",
                  },
                }}
              >
                {shipment.trackingNumber}
              </Button>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <IconButton
                  className="text-white hover:text-cyan-400"
                  title="Print Label"
                >
                  <Printer weight="bold" className="w-5 h-5" />
                </IconButton>
                <IconButton
                  className="text-white hover:text-cyan-400"
                  title="Track"
                >
                  <Truck weight="bold" className="w-5 h-5" />
                </IconButton>
                <IconButton
                  className="text-white hover:text-cyan-400"
                  title="More"
                >
                  <DotsThree weight="bold" className="w-5 h-5" />
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Shipping: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex overflow-hidden">
      <Sidebar onToggle={handleSidebarToggle} />
      <div
        className={`flex-1 transition-all duration-300 overflow-auto bg-[#0a192f] ${
          isSidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
        }`}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ color: "white", mb: 1 }}>
              Shipping{" "}
              <span style={{ color: "#22d3ee", fontWeight: "bold" }}>
                Management
              </span>
            </Typography>
            <Typography variant="body1" sx={{ color: "#94a3b8" }}>
              Manage and track all your shipments in one place
            </Typography>
          </Box>

          <ShippingMetrics />
          <SearchSection />
          <Paper
            sx={{
              bgcolor: "#0f1729",
              border: "1px solid rgba(34, 211, 238, 0.2)",
              "&:hover": {
                border: "1px solid rgba(34, 211, 238, 0.4)",
              },
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              className="border-b border-cyan-400/20"
              textColor="inherit"
              sx={{
                "& .MuiTab-root": {
                  color: "white",
                  "&.Mui-selected": {
                    color: "#22d3ee",
                  },
                },
              }}
              TabIndicatorProps={{
                style: { backgroundColor: "#06b6d4" },
              }}
            >
              {[
                { label: "All Shipments", icon: <Package /> },
                { label: "In Transit", icon: <Truck /> },
                { label: "Delivered", icon: <CheckCircle /> },
                { label: "Pending", icon: <Clock /> },
                { label: "Issues", icon: <Warning /> },
              ].map((tab, index) => (
                <Tab
                  key={tab.label}
                  label={tab.label}
                  icon={React.cloneElement(tab.icon, {
                    className: "w-4 h-4",
                  })}
                  iconPosition="start"
                  sx={{ color: "white" }}
                />
              ))}
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <ShipmentsTable />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ShipmentsTable />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ShipmentsTable />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <ShipmentsTable />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <ShipmentsTable />
            </TabPanel>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default Shipping;
