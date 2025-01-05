"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import {
  Truck,
  Package,
  Clock,
  Warning,
  ChartLineUp,
  ArrowUp,
  ArrowDown,
  Cube,
  TrendUp,
  TrendDown,
  DotsThreeVertical,
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
import Sidebar from "../../components/sidebar";

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
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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

const ChartSection: React.FC = () => (
  <div className="w-full h-full">
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
);

const ActivitySection: React.FC = () => {
  // Use state to handle client-side rendering
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="space-y-4"
    >
      <Paper className="p-8 bg-[#0f1729] border border-cyan-400/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm relative overflow-hidden">
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12" />

        <div className="relative z-10">
          <div className="mb-8">
            <Typography variant="h5" className="text-white font-medium mb-2">
              Activity Feed
            </Typography>
            <Typography variant="subtitle1" className="text-slate-300">
              Live shipment updates and system notifications
            </Typography>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[340px] pr-2">
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
                className="group p-4 bg-navy-darker rounded-xl border border-cyan-400/10 hover:border-cyan-400/20 transition-all duration-300"
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
                        className="text-slate-200 shrink-0 ml-2 font-semibold"
                      >
                        {activity.time}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className="text-slate-200 truncate font-medium"
                    >
                      {activity.description}
                    </Typography>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Paper>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <div className="min-h-screen bg-[#0a192f] flex">
      <Sidebar onToggle={handleSidebarToggle} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
        }`}
      >
        {/* Enhanced background with better contrast */}
        <motion.div
          className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <Container maxWidth="xl" className="relative">
          <div className="py-8 space-y-10">
            {/* Welcome Section with Quick Actions */}
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h4" className="text-white mb-2 font-light">
                  Welcome back 👋{" "}
                  <span className="font-bold text-cyan-400">Kayode</span>
                </Typography>
                <Typography variant="body1" className="text-slate-400">
                  Here's what's happening with your shipments today.
                </Typography>
              </motion.div>

              {/* Quick Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  startIcon={<Package weight="duotone" />}
                  className="border-cyan-400/20 text-cyan-400 hover:border-cyan-400/40"
                >
                  New Shipment
                </Button>
                <Button
                  variant="contained"
                  startIcon={<TrendUp weight="duotone" />}
                  className="bg-cyan-400 hover:bg-cyan-500"
                >
                  View Reports
                </Button>
              </div>
            </div>

            {/* Analytics Grid - Fixed Chart Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart Section - Fixed Height and Overflow */}
              <div className="lg:col-span-2">
                <Paper className="h-[500px] bg-[#0a192f] border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <Typography
                          variant="h6"
                          className="text-white font-medium"
                        >
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
              </div>

              {/* Activity Feed Section */}
              <div className="lg:col-span-1">
                <Paper className="h-[500px] bg-[#0a192f] border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500">
                  <ActivitySection />
                </Paper>
              </div>
            </div>

            {/* Metrics Section with Headers */}
            <Grid item xs={12}>
              <Typography variant="h6" className="text-white mb-4">
                Key Performance Metrics
              </Typography>
              <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    title: "Total Shipments",
                    value: "2,547",
                    previousValue: "2,350",
                    percentageChange: 8.4,
                    icon: (
                      <Truck
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.1,
                    trend: "up" as const,
                    additionalInfo: "Monthly target: 3,000",
                  },
                  {
                    title: "Active Shipments",
                    value: "186",
                    icon: (
                      <Package
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.2,
                    additionalInfo: "Average transit time: 2.3 days",
                  },
                  {
                    title: "On-Time Delivery",
                    value: "94.2%",
                    previousValue: "92.8%",
                    percentageChange: 1.4,
                    icon: (
                      <Clock
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.3,
                    trend: "up" as const,
                    additionalInfo: "Target: 95%",
                  },
                  {
                    title: "Inventory Alerts",
                    value: "12",
                    previousValue: "5",
                    percentageChange: 140,
                    icon: (
                      <Cube
                        weight="duotone"
                        className="text-cyan-400 w-7 h-7"
                      />
                    ),
                    delay: 0.4,
                    trend: "down" as const,
                    additionalInfo: "Items below reorder point",
                  },
                ].map((metric) => (
                  <div key={metric.title}>
                    <MetricCard {...metric} />
                  </div>
                ))}
              </Box>
            </Grid>

            {/* Help Section */}
            <div className="fixed bottom-6 right-6">
              <Button
                variant="contained"
                className="bg-cyan-400 hover:bg-cyan-500 rounded-full w-12 h-12 min-w-0"
                title="Need help?"
              >
                ?
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
