"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Container,
  Paper,
  Box,
  Button,
  Tab,
  Tabs,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  Package,
  Cube,
  Truck,
  TrendUp,
} from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/appComponents/sidebar";

// Mock data - Replace with actual API calls
const shipmentData = [
  { month: "Jan", volume: 1200, onTime: 92, cost: 25000 },
  { month: "Feb", volume: 1400, onTime: 94, cost: 28000 },
  // ... more data
];

const inventoryData = [
  { category: "A", value: 45, turnover: 12 },
  { category: "B", value: 35, turnover: 8 },
  { category: "C", value: 20, turnover: 4 },
];

const fleetData = [
  { vehicle: "Truck 1", utilization: 85, efficiency: 78 },
  { vehicle: "Truck 2", utilization: 92, efficiency: 82 },
  // ... more data
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [activeTab, setActiveTab] = useState("executive");
  const [isClient, setIsClient] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex">
      <Sidebar onToggle={handleSidebarToggle} />
      {isClient && (
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
          }`}
        >
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
                    Analytics Dashboard
                    <span className="font-bold text-cyan-400"> Overview</span>
                  </Typography>
                  <Typography variant="body1" className="text-slate-400">
                    Track your logistics performance metrics
                  </Typography>
                </motion.div>

                <div className="flex gap-3">
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as string)}
                    className="bg-[#0a192f] border border-cyan-400/20 text-slate-400"
                  >
                    <MenuItem value="day">Last 24 Hours</MenuItem>
                    <MenuItem value="week">Last Week</MenuItem>
                    <MenuItem value="month">Last Month</MenuItem>
                    <MenuItem value="year">Last Year</MenuItem>
                  </Select>
                  <Button
                    variant="outlined"
                    startIcon={<TrendUp weight="duotone" />}
                    className="border-cyan-400/20 text-cyan-400 hover:border-cyan-400/40"
                  >
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Tabs Section */}
              <Paper className="bg-[#0f1729] border border-cyan-400/20">
                <Tabs
                  value={activeTab}
                  onChange={(e, val) => setActiveTab(val)}
                  centered
                  className="border-b border-cyan-400/20"
                  TabIndicatorProps={{
                    style: { backgroundColor: "rgb(34, 211, 238)" },
                  }}
                >
                  <Tab
                    label="Executive Dashboard"
                    value="executive"
                    className="text-slate-400"
                  />
                  <Tab
                    label="Shipment Analytics"
                    value="shipments"
                    className="text-slate-400"
                  />
                  <Tab
                    label="Inventory Insights"
                    value="inventory"
                    className="text-slate-400"
                  />
                  <Tab
                    label="Fleet Performance"
                    value="fleet"
                    className="text-slate-400"
                  />
                </Tabs>

                {/* Tab Content */}
                {activeTab === "executive" && (
                  <Box className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {
                          icon: Package,
                          title: "Total Shipments",
                          value: "1,234",
                          change: "+12%",
                        },
                        {
                          icon: Truck,
                          title: "Fleet Utilization",
                          value: "87%",
                          change: "+5%",
                        },
                        {
                          icon: Cube,
                          title: "Inventory Level",
                          value: "45.2K",
                          change: "-3%",
                        },
                        {
                          icon: TrendUp,
                          title: "On-Time Delivery",
                          value: "94%",
                          change: "+2%",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Paper className="p-6 bg-gradient-to-br from-[#112240] to-[#0a192f] border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <item.icon
                                weight="duotone"
                                className="text-cyan-400 w-6 h-6"
                              />
                              <Typography className="text-slate-300">
                                {item.title}
                              </Typography>
                            </div>
                            <Typography
                              variant="h4"
                              className="text-white mb-2"
                            >
                              {item.value}
                            </Typography>
                            <Typography
                              className={`text-sm ${
                                item.change.startsWith("+")
                                  ? "text-emerald-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {item.change} vs last period
                            </Typography>
                          </Paper>
                        </motion.div>
                      ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Paper className="p-6 bg-[#0f1729] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Shipment Volume Trends
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <AreaChart data={shipmentData}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                              />
                              <XAxis dataKey="month" stroke="#94a3b8" />
                              <YAxis stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#0f172a",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="volume"
                                stroke="#06b6d4"
                                fill="#06b6d4"
                                fillOpacity={0.2}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>
                      {/* Add more charts here */}
                    </div>
                  </Box>
                )}
                {activeTab === "shipments" && (
                  <Box className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Paper className="p-6 bg-[#112240] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Delivery Performance
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <LineChart data={shipmentData}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                              />
                              <XAxis dataKey="month" stroke="#94a3b8" />
                              <YAxis stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#112240",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                              <Line
                                type="monotone"
                                dataKey="onTime"
                                stroke="#06b6d4"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>

                      <Paper className="p-6 bg-[#112240] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Shipping Costs Analysis
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <BarChart data={shipmentData}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                              />
                              <XAxis dataKey="month" stroke="#94a3b8" />
                              <YAxis stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#112240",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                              <Bar
                                dataKey="cost"
                                fill="#06b6d4"
                                opacity={0.8}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>
                    </div>
                  </Box>
                )}
                {activeTab === "inventory" && (
                  <Box className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Paper className="p-6 bg-[#112240] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Inventory Distribution
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={inventoryData}
                                dataKey="value"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#06b6d4"
                                label
                              >
                                {inventoryData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      ["#06b6d4", "#0891b2", "#0e7490"][
                                        index % 3
                                      ]
                                    }
                                  />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#112240",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>

                      <Paper className="p-6 bg-[#112240] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Inventory Turnover Rate
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <BarChart data={inventoryData}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                              />
                              <XAxis dataKey="category" stroke="#94a3b8" />
                              <YAxis stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#112240",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                              <Bar
                                dataKey="turnover"
                                fill="#06b6d4"
                                opacity={0.8}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>
                    </div>
                  </Box>
                )}
                {activeTab === "fleet" && (
                  <Box className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Paper className="p-6 bg-[#112240] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Fleet Utilization
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <BarChart data={fleetData} layout="vertical">
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                              />
                              <XAxis type="number" stroke="#94a3b8" />
                              <YAxis
                                dataKey="vehicle"
                                type="category"
                                stroke="#94a3b8"
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#112240",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                              <Bar
                                dataKey="utilization"
                                fill="#06b6d4"
                                opacity={0.8}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>

                      <Paper className="p-6 bg-[#112240] border border-cyan-400/20">
                        <Typography variant="h6" className="text-white mb-4">
                          Fleet Efficiency Metrics
                        </Typography>
                        <div className="h-[300px]">
                          <ResponsiveContainer>
                            <LineChart data={fleetData}>
                              <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1e293b"
                              />
                              <XAxis dataKey="vehicle" stroke="#94a3b8" />
                              <YAxis stroke="#94a3b8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#112240",
                                  border: "1px solid rgba(6, 182, 212, 0.2)",
                                  borderRadius: "0.5rem",
                                }}
                              />
                              <Line
                                type="monotone"
                                dataKey="efficiency"
                                stroke="#06b6d4"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </Paper>
                    </div>
                  </Box>
                )}
              </Paper>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Analytics;
