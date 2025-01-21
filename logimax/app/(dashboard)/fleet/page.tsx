"use client";

import React, { useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Truck,
  Users,
  Wrench,
  Plus,
  DotsThree,
  MapPin,
  Bell,
} from "@phosphor-icons/react";
import Sidebar from "../../components/appComponents/sidebar";

const FleetPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  // Mock data for demonstration
  const vehicles = [
    {
      id: 1,
      name: "Truck 001",
      status: "Active",
      location: "Route 66",
      driver: "John Doe",
      fuel: "75%",
    },
    {
      id: 2,
      name: "Van 002",
      status: "Maintenance",
      location: "Garage",
      driver: "Jane Smith",
      fuel: "45%",
    },
    {
      id: 3,
      name: "Truck 003",
      status: "Active",
      location: "Highway 95",
      driver: "Mike Johnson",
      fuel: "90%",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] flex">
      <Sidebar onToggle={handleSidebarToggle} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
        }`}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header Section */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ color: "white", mb: 1 }}>
                Fleet{" "}
                <span style={{ color: "#22d3ee", fontWeight: "bold" }}>
                  Management
                </span>
              </Typography>
              <Typography variant="body1" sx={{ color: "#94a3b8" }}>
                Here's what's happening with your fleet today.
              </Typography>
            </Box>
            <div className="flex gap-3">
              <Button
                variant="contained"
                startIcon={<Plus weight="bold" />}
                sx={{
                  bgcolor: "#22d3ee",
                  "&:hover": {
                    bgcolor: "#06b6d4",
                  },
                }}
              >
                Add Vehicle
              </Button>
            </div>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                title: "Total Vehicles",
                value: "24",
                icon: <Truck size={24} />,
              },
              {
                title: "Active Drivers",
                value: "18",
                icon: <Users size={24} />,
              },
              {
                title: "Pending Maintenance",
                value: "3",
                icon: <Wrench size={24} />,
              },
              {
                title: "Active Routes",
                value: "12",
                icon: <MapPin size={24} />,
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    bgcolor: "#0f1729",
                    border: "1px solid rgba(34, 211, 238, 0.2)",
                    "&:hover": {
                      border: "1px solid rgba(34, 211, 238, 0.4)",
                    },
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
                      <Typography variant="h6" sx={{ color: "#94a3b8" }}>
                        {stat.title}
                      </Typography>
                      <Box sx={{ color: "#22d3ee" }}>{stat.icon}</Box>
                    </Box>
                    <Typography variant="h4" sx={{ color: "white" }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Vehicles Table */}
          <Paper
            sx={{
              bgcolor: "#0f1729",
              border: "1px solid rgba(34, 211, 238, 0.2)",
              "&:hover": {
                border: "1px solid rgba(34, 211, 238, 0.4)",
              },
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#94a3b8" }}>Vehicle</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Status</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Location</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Driver</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Fuel Level</TableCell>
                    <TableCell sx={{ color: "#94a3b8" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell sx={{ color: "white" }}>
                        {vehicle.name}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={vehicle.status}
                          color={
                            vehicle.status === "Active" ? "success" : "warning"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {vehicle.location}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {vehicle.driver}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {vehicle.fuel}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ color: "#22d3ee" }}>
                          <DotsThree weight="bold" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default FleetPage;
