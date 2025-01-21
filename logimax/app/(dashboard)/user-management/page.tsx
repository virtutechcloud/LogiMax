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
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  MagnifyingGlass,
  Users,
  UserPlus,
  UserList,
  Lock,
  PencilSimple,
  Trash,
  FunnelSimple,
  UserCirclePlus,
} from "@phosphor-icons/react";
import Sidebar from "../../components/appComponents/sidebar";

export default function UserManagement() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  // Mock data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      department: "IT",
      status: "Active",
      lastLogin: "2024-03-20 10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Manager",
      department: "Operations",
      status: "Active",
      lastLogin: "2024-03-20 09:15 AM",
    },
    // Add more mock users as needed
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
                    User{" "}
                    <span className="font-bold text-cyan-400">Management</span>
                  </Typography>
                  <Typography variant="body1" className="text-slate-400">
                    Manage your organization's users and permissions
                  </Typography>
                </motion.div>

                <Button
                  variant="contained"
                  startIcon={<UserPlus weight="duotone" />}
                  className="bg-cyan-400 hover:bg-cyan-500"
                >
                  Add New User
                </Button>
              </div>

              {/* Statistics Cards */}
              <Grid container spacing={3}>
                {[
                  {
                    title: "Total Users",
                    value: "1,234",
                    icon: (
                      <Users
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.1,
                    additionalInfo: "Active accounts",
                  },
                  {
                    title: "Active Sessions",
                    value: "186",
                    icon: (
                      <UserList
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.2,
                    additionalInfo: "Currently online",
                  },
                  {
                    title: "New Requests",
                    value: "15",
                    icon: (
                      <UserCirclePlus
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.3,
                    additionalInfo: "Pending approvals",
                  },
                  {
                    title: "Locked Accounts",
                    value: "3",
                    icon: (
                      <Lock
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.4,
                    additionalInfo: "Security alerts",
                  },
                ].map((metric) => (
                  <Grid item xs={12} sm={6} md={3} key={metric.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: metric.delay }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Paper className="p-6 bg-[#0f1729] border border-cyan-400/20 hover:border-cyan-400/40 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-400/5">
                            {metric.icon}
                          </div>
                          <Typography
                            variant="body2"
                            className="text-slate-400"
                          >
                            {metric.title}
                          </Typography>
                        </div>
                        <Typography variant="h4" className="text-white mb-2">
                          {metric.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-slate-400"
                        >
                          {metric.additionalInfo}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* Search and Table Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Paper className="bg-[#0f1729] border border-cyan-400/20 overflow-hidden">
                  {/* Search Bar */}
                  <Box className="p-4 border-b border-cyan-400/20">
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          placeholder="Search users..."
                          variant="outlined"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <MagnifyingGlass className="mr-2 text-slate-400" />
                            ),
                            className: "bg-navy-darker",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box className="flex gap-2 justify-end">
                          {["Role", "Department", "Status"].map((filter) => (
                            <Button
                              key={filter}
                              startIcon={<FunnelSimple weight="duotone" />}
                              variant="outlined"
                              size="small"
                              className="border-cyan-400/20 text-cyan-400 hover:border-cyan-400/40"
                            >
                              {filter}
                            </Button>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Users Table */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className="text-slate-400">Name</TableCell>
                          <TableCell className="text-slate-400">
                            Email
                          </TableCell>
                          <TableCell className="text-slate-400">Role</TableCell>
                          <TableCell className="text-slate-400">
                            Department
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Status
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Last Login
                          </TableCell>
                          <TableCell className="text-slate-400">
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow
                            key={user.id}
                            className="hover:bg-navy-darker"
                          >
                            <TableCell className="text-white">
                              {user.name}
                            </TableCell>
                            <TableCell className="text-white">
                              {user.email}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.role}
                                size="small"
                                className="bg-cyan-400/20 text-cyan-400"
                              />
                            </TableCell>
                            <TableCell className="text-white">
                              {user.department}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.status}
                                size="small"
                                className={
                                  user.status === "Active"
                                    ? "bg-emerald-400/20 text-emerald-400"
                                    : "bg-rose-400/20 text-rose-400"
                                }
                              />
                            </TableCell>
                            <TableCell className="text-white">
                              {user.lastLogin}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                size="small"
                                className="text-cyan-400 hover:text-cyan-500"
                              >
                                <PencilSimple weight="duotone" />
                              </IconButton>
                              <IconButton
                                size="small"
                                className="text-rose-400 hover:text-rose-500"
                              >
                                <Trash weight="duotone" />
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
