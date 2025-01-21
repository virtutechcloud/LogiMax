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
  Card,
  CardContent,
} from "@mui/material";
import {
  Truck,
  Package,
  Clock,
  Warning,
  Cube,
  TrendUp,
  TrendDown,
  CheckCircle,
} from "@phosphor-icons/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/appComponents/sidebar";
import dynamic from "next/dynamic";

// Add mock data for the chart
const chartData = [
  { name: "Mon", shipments: 150 },
  { name: "Tue", shipments: 230 },
  { name: "Wed", shipments: 180 },
  { name: "Thu", shipments: 290 },
  { name: "Fri", shipments: 200 },
  { name: "Sat", shipments: 140 },
  { name: "Sun", shipments: 120 },
];

interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  percentageChange?: number;
  icon: React.ReactNode;
  delay: number;
  trend?: "up" | "down" | "neutral";
  additionalInfo?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  percentageChange,
  icon,
  delay,
  trend,
  additionalInfo,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
    data-active={false}
    className="h-full"
  >
    <Paper className="relative h-[200px] w-full p-6 bg-gradient-to-br from-navy-dark/80 to-navy-dark/40 border border-cyan-400/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm overflow-hidden flex flex-col group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:bg-cyan-400/10 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:bg-blue-400/10 transition-all duration-700" />

      <div className="relative z-10 flex items-center gap-3 h-16">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 backdrop-blur-sm group-hover:from-cyan-400/30 group-hover:to-cyan-400/10 transition-all duration-700">
          {icon}
        </div>
        <div>
          <Typography variant="body2" className="text-slate-400 font-medium">
            {title}
          </Typography>
          {trend && (
            <div
              className={`flex items-center gap-1 mt-0.5 ${
                trend === "up" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {trend === "up" ? (
                <TrendUp weight="bold" className="w-4 h-4" />
              ) : (
                <TrendDown weight="bold" className="w-4 h-4" />
              )}
              <Typography variant="caption" className="font-medium">
                {Math.abs(percentageChange || 0)}%
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          <Typography
            variant="h3"
            className="text-white font-bold tracking-tight"
          >
            {value}
          </Typography>
          {previousValue && (
            <Typography variant="caption" className="text-slate-400 block mt-1">
              Previous: {previousValue}
            </Typography>
          )}
        </motion.div>
      </div>

      {additionalInfo && (
        <div className="relative z-10 h-12">
          <Typography variant="caption" className="text-slate-400 block mb-2">
            {additionalInfo}
          </Typography>
          <div className="h-1.5 w-full bg-navy-darker rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ delay: delay + 0.5, duration: 0.8 }}
            />
          </div>
        </div>
      )}
    </Paper>
  </motion.div>
);

// Create a dynamic import for the Chart section to prevent SSR
const ChartSection = dynamic(
  () =>
    Promise.resolve(() => (
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Line
              type="monotone"
              dataKey="shipments"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )),
  { ssr: false }
);

const ActivitySection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-6"
    >
      <div className="relative z-10">
        <div className="mb-6">
          <Typography variant="h6" className="text-white font-medium">
            Activity Feed
          </Typography>
          <Typography variant="body2" className="text-slate-400 mt-1">
            Live shipment updates and system notifications
          </Typography>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          {[
            {
              title: "Shipment Created",
              time: "2 minutes ago",
              status: "success",
              icon: <Package weight="duotone" className="w-5 h-5" />,
              description: "Order #12345 - Express Delivery to New York",
            },
            {
              title: "Successful Delivery",
              time: "15 minutes ago",
              status: "success",
              icon: <CheckCircle weight="duotone" className="w-5 h-5" />,
              description:
                "Order #11890 delivered to John Smith in Los Angeles",
            },
            {
              title: "Low Stock Warning",
              time: "1 hour ago",
              status: "warning",
              icon: <Warning weight="duotone" className="w-5 h-5" />,
              description:
                "Product SKU-789 (Premium Packaging) below minimum threshold",
            },
            {
              title: "Delivery Delay Alert",
              time: "2 hours ago",
              status: "warning",
              icon: <Clock weight="duotone" className="w-5 h-5" />,
              description:
                "Order #34567 delayed due to weather conditions in Chicago",
            },
          ].map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`group p-4 bg-navy-darker rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300`}
            >
              <div className="flex gap-4">
                <div
                  className={`shrink-0 p-2.5 rounded-lg transition-colors duration-300 ${
                    activity.status === "success"
                      ? "bg-emerald-400/10 text-emerald-400 group-hover:bg-emerald-400/20"
                      : "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20"
                  }`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Typography className="text-white font-semibold truncate">
                      {activity.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="text-slate-400 shrink-0 ml-2"
                    >
                      {activity.time}
                    </Typography>
                  </div>
                  <Typography
                    variant="body2"
                    className="text-slate-400 truncate"
                  >
                    {activity.description}
                  </Typography>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    document.documentElement.style.backgroundColor = "#0a192f";
    document.body.style.backgroundColor = "#0a192f";

    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a192f] flex overflow-hidden">
      <Sidebar onToggle={handleSidebarToggle} />
      <div
        className={`flex-1 transition-all duration-300 overflow-auto bg-[#0a192f] ${
          isSidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
        }`}
      >
        <div className="bg-[#0a192f] min-h-screen">
          <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header Section - Updated to match fleet page styling */}
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
                  Dashboard{" "}
                  <span style={{ color: "#22d3ee", fontWeight: "bold" }}>
                    Overview
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ color: "#94a3b8" }}>
                  Here's what's happening with your shipments today.
                </Typography>
              </Box>
              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  startIcon={<Package weight="bold" />}
                  sx={{
                    borderColor: "rgba(34, 211, 238, 0.2)",
                    color: "#22d3ee",
                    "&:hover": {
                      borderColor: "rgba(34, 211, 238, 0.4)",
                    },
                  }}
                >
                  New Shipment
                </Button>
                <Button
                  variant="contained"
                  startIcon={<TrendUp weight="bold" />}
                  sx={{
                    bgcolor: "#22d3ee",
                    "&:hover": {
                      bgcolor: "#06b6d4",
                    },
                  }}
                >
                  View Reports
                </Button>
              </div>
            </Box>

            {/* Metrics Section - Updated card sizes */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  title: "Total Shipments",
                  value: "2,547",
                  icon: <Truck size={24} />,
                  trend: "up",
                  change: "8.4%",
                },
                {
                  title: "Active Shipments",
                  value: "186",
                  icon: <Package size={24} />,
                },
                {
                  title: "On-Time Delivery",
                  value: "94.2%",
                  icon: <Clock size={24} />,
                  trend: "up",
                  change: "1.4%",
                },
                {
                  title: "Inventory Alerts",
                  value: "12",
                  icon: <Cube size={24} />,
                  trend: "down",
                  change: "140%",
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
                      height: "100%", // Ensure all cards have the same height
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
                      {stat.trend && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                            color: stat.trend === "up" ? "#10b981" : "#ef4444",
                          }}
                        >
                          {stat.trend === "up" ? (
                            <TrendUp size={16} weight="bold" />
                          ) : (
                            <TrendDown size={16} weight="bold" />
                          )}
                          <Typography variant="caption">
                            {stat.change}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Chart and Activity Sections - Updated styling */}
            <Paper
              sx={{
                bgcolor: "#0f1729",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                "&:hover": {
                  border: "1px solid rgba(34, 211, 238, 0.4)",
                },
                mb: 4,
              }}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <Typography variant="h6" className="text-white font-medium">
                      Shipment Analytics
                    </Typography>
                    <Typography variant="body2" className="text-slate-400">
                      Track your shipping performance
                    </Typography>
                  </div>
                  <select className="bg-[#0a192f] border border-cyan-400/20 text-slate-400 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-400/40 text-sm">
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                {/* Chart Container with Fixed Height */}
                <div className="flex-1 min-h-0">
                  {" "}
                  {/* This ensures proper height calculation */}
                  <ChartSection />
                </div>
              </div>
            </Paper>

            {/* Activity Feed - Updated styling */}
            <Paper
              sx={{
                bgcolor: "#0f1729",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                "&:hover": {
                  border: "1px solid rgba(34, 211, 238, 0.4)",
                },
              }}
            >
              <ActivitySection />
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
