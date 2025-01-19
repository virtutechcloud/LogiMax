"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import {
  Users,
  ShoppingCart,
  TrendUp,
  Package,
  MagnifyingGlass,
  FunnelSimple,
  PencilSimple,
  Trash,
  DotsThreeVertical,
} from "@phosphor-icons/react";
import Sidebar from "../../components/appComponents/sidebar";

function CustomerManagementPage() {
  const [isClient, setIsClient] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  // Mock data for demonstration
  const customers = [
    {
      id: 1,
      name: "John Doe",
      company: "Tech Corp",
      email: "john@techcorp.com",
      phone: "+1 234-567-8900",
      orders: 12,
      status: "Active",
      value: "$5,400",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "Logistics Pro",
      email: "jane@logisticspro.com",
      phone: "+1 234-567-8901",
      orders: 8,
      status: "Active",
      value: "$3,200",
    },
    {
      id: 3,
      name: "Mike Johnson",
      company: "Global Ship",
      email: "mike@globalship.com",
      phone: "+1 234-567-8902",
      orders: 15,
      status: "Inactive",
      value: "$7,800",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] flex">
      <Sidebar onToggle={handleSidebarToggle} />
      {isClient && (
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
          }`}
        >
          {/* Background gradient */}
          <motion.div
            className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/5 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <Container maxWidth="xl" className="relative">
            <div className="py-8 space-y-10">
              {/* Header Section */}
              <div className="flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="h4"
                    className="text-white mb-2 font-light"
                  >
                    Customer Management
                  </Typography>
                  <Typography variant="body1" className="text-slate-400">
                    Manage and monitor your customer relationships
                  </Typography>
                </motion.div>

                {/* Quick Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    startIcon={<Package weight="duotone" />}
                    className="border-cyan-600/20 text-cyan-600 hover:border-cyan-600/40"
                  >
                    Export Data
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Users weight="duotone" />}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    Add Customer
                  </Button>
                </div>
              </div>

              {/* Metrics Cards */}
              <Grid container spacing={3}>
                {[
                  {
                    title: "Total Customers",
                    value: "1,234",
                    icon: (
                      <Users
                        weight="duotone"
                        className="text-cyan-600 w-7 h-7"
                      />
                    ),
                    trend: "up" as const,
                    percentageChange: 12.5,
                    additionalInfo: "120 new this month",
                  },
                  {
                    title: "Active Orders",
                    value: "156",
                    icon: (
                      <ShoppingCart
                        weight="duotone"
                        className="text-cyan-600 w-7 h-7"
                      />
                    ),
                    trend: "up" as const,
                    percentageChange: 8.2,
                    additionalInfo: "32 pending delivery",
                  },
                  {
                    title: "Monthly Revenue",
                    value: "$45.2K",
                    icon: (
                      <TrendUp
                        weight="duotone"
                        className="text-cyan-600 w-7 h-7"
                      />
                    ),
                    trend: "up" as const,
                    percentageChange: 15.3,
                    additionalInfo: "Target: $50K",
                  },
                  {
                    title: "Customer Satisfaction",
                    value: "94.2%",
                    icon: (
                      <Users
                        weight="duotone"
                        className="text-cyan-600 w-7 h-7"
                      />
                    ),
                    trend: "up" as const,
                    percentageChange: 2.1,
                    additionalInfo: "Based on 500 reviews",
                  },
                ].map((metric, index) => (
                  <Grid item xs={12} sm={6} md={3} key={metric.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paper className="p-6 bg-[#0f1729] border border-cyan-600/20 hover:border-cyan-600/40 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <Typography className="text-slate-400 text-sm mb-1">
                              {metric.title}
                            </Typography>
                            <Typography
                              variant="h4"
                              className="text-white font-bold"
                            >
                              {metric.value}
                            </Typography>
                          </div>
                          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-600/20 to-cyan-600/5">
                            {metric.icon}
                          </div>
                        </div>
                        <div className="mt-4">
                          <div
                            className={`flex items-center gap-1 ${
                              metric.trend === "up"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }`}
                          >
                            <TrendUp weight="bold" className="w-4 h-4" />
                            <Typography
                              variant="caption"
                              className="font-medium"
                            >
                              {metric.percentageChange}%
                            </Typography>
                          </div>
                          <Typography
                            variant="caption"
                            className="text-slate-400 block mt-1"
                          >
                            {metric.additionalInfo}
                          </Typography>
                        </div>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* Search and Table Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Paper className="p-6 bg-[#0f1729] border border-cyan-600/20">
                  <div className="mb-6 flex gap-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <MagnifyingGlass className="text-slate-400 mr-2" />
                        ),
                      }}
                      className="bg-navy-darker"
                    />
                    <Button
                      variant="outlined"
                      startIcon={<FunnelSimple weight="duotone" />}
                      className="border-cyan-600/20 text-cyan-600 hover:border-cyan-600/40"
                    >
                      Filters
                    </Button>
                  </div>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className="text-slate-400">
                            Customer
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Company
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Orders
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Status
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Value
                          </TableCell>
                          <TableCell className="text-slate-400" align="right">
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow
                            key={customer.id}
                            hover
                            className="hover:bg-navy-darker"
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="bg-cyan-600/20 text-cyan-600">
                                  {customer.name[0]}
                                </Avatar>
                                <div>
                                  <Typography className="text-white font-medium">
                                    {customer.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className="text-slate-400"
                                  >
                                    {customer.email}
                                  </Typography>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {customer.company}
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {customer.orders}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={customer.status}
                                color={
                                  customer.status === "Active"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell className="text-slate-300">
                              {customer.value}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                className="text-cyan-600"
                              >
                                <PencilSimple weight="bold" />
                              </IconButton>
                              <IconButton
                                size="small"
                                className="text-rose-400"
                              >
                                <Trash weight="bold" />
                              </IconButton>
                              <IconButton
                                size="small"
                                className="text-slate-400"
                              >
                                <DotsThreeVertical weight="bold" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </motion.div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default CustomerManagementPage;
