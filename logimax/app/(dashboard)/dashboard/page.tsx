"use client";

import React from "react";
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
    <Paper className="relative h-[200px] w-full p-6 bg-gradient-to-br from-navy-dark/80 to-navy-dark/40 border border-cyan-400/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />

      <div className="relative z-10 flex items-center gap-3 h-16">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 backdrop-blur-sm">
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
                <TrendUp fontSize="small" />
              ) : (
                <TrendDown fontSize="small" />
              )}
              <Typography variant="caption" className="font-medium">
                {Math.abs(percentageChange || 0)}%
              </Typography>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">
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
      </div>

      {additionalInfo && (
        <div className="relative z-10 h-12">
          <Typography variant="caption" className="text-slate-400 block mb-2">
            {additionalInfo}
          </Typography>
          <div className="h-1 w-full bg-navy-darker rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-400/30 rounded-full"
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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    <Paper className="p-8 bg-navy-dark/50 border border-cyan-400/20 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ChartLineUp className="text-cyan-400" />
          <Typography variant="h6" className="text-white">
            Shipment Analytics
          </Typography>
        </div>
        <Button
          variant="outlined"
          size="small"
          className="border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/10"
        >
          View Details
        </Button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
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
    </Paper>
  </motion.div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen h-full bg-[#0a192f] overflow-x-hidden">
      {/* Background gradients */}
      <motion.div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <Container maxWidth="xl" className="py-8">
        <div className="space-y-8">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" className="text-white mb-2 font-light">
              Welcome back,{" "}
              <span className="font-bold text-cyan-400">Admin</span>
            </Typography>
            <Typography variant="body1" className="text-slate-400">
              Here's what's happening with your shipments today.
            </Typography>
          </motion.div>

          {/* Metrics Grid */}
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Total Shipments",
                value: "2,547",
                previousValue: "2,350",
                percentageChange: 8.4,
                icon: (
                  <Truck weight="duotone" className="text-cyan-400 w-7 h-7" />
                ),
                delay: 0.1,
                trend: "up" as const,
                additionalInfo: "Monthly target: 3,000",
              },
              {
                title: "Active Shipments",
                value: "186",
                icon: (
                  <Package weight="duotone" className="text-cyan-400 w-7 h-7" />
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
                  <Clock weight="duotone" className="text-cyan-400 w-7 h-7" />
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
                  <Cube weight="duotone" className="text-cyan-400 w-7 h-7" />
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

          {/* Analytics Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <ChartSection />
            </Grid>
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                {/* Activity Summary */}
                <Paper className="p-6 bg-navy-dark/50 border border-cyan-400/20 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="text-white">
                      Recent Activity
                    </Typography>
                    <DotsThreeVertical className="text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        title: "New Shipment Created",
                        time: "2 minutes ago",
                        status: "success",
                      },
                      {
                        title: "Delivery Completed",
                        time: "15 minutes ago",
                        status: "success",
                      },
                      {
                        title: "Inventory Alert",
                        time: "1 hour ago",
                        status: "warning",
                      },
                    ].map((activity, index) => (
                      <motion.div
                        key={activity.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="p-3 bg-navy-dark/30 rounded-lg border border-cyan-400/10"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <Typography className="text-white font-medium">
                              {activity.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              className="text-slate-400"
                            >
                              {activity.time}
                            </Typography>
                          </div>
                          <div
                            className={`h-2 w-2 rounded-full ${
                              activity.status === "success"
                                ? "bg-green-400"
                                : "bg-yellow-400"
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
