"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Button,
  Box,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  LocalShipping,
  Inventory,
  Timeline,
  Speed,
} from "@mui/icons-material";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay: number;
}

const Header: React.FC = () => (
  <motion.div
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
  >
    <AppBar position="static" className="bg-navy-dark/80 backdrop-blur-sm">
      <Toolbar>
        <Typography variant="h6" className="flex-grow text-white">
          LogiMax
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon className="text-cyan-400" />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle className="text-cyan-400" />
        </IconButton>
      </Toolbar>
    </AppBar>
  </motion.div>
);

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
  >
    <Paper className="p-8 bg-navy-dark/50 border border-cyan-400/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm relative overflow-hidden group">
      {/* Gradient overlay */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />

      <div className="relative z-10">
        {/* Icon and title section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cyan-400/10 rounded-xl">{icon}</div>
          <Typography variant="body2" className="text-slate-400 font-medium">
            {title}
          </Typography>
        </div>

        {/* Value section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="space-y-2"
        >
          <Typography
            variant="h3"
            className="text-white font-bold tracking-tight"
          >
            {value}
          </Typography>

          {/* Progress indicator */}
          <div className="flex items-center gap-2">
            <div className="h-1 flex-grow rounded-full bg-navy-dark/50 overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400/20 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ delay: delay + 0.4, duration: 0.8 }}
              />
            </div>
            <Typography variant="caption" className="text-cyan-400/80">
              +12%
            </Typography>
          </div>
        </motion.div>
      </div>
    </Paper>
  </motion.div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen overflow-y-auto bg-[#0a192f]">
      {/* Background gradients */}
      <motion.div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <Header />

      <Container maxWidth="xl" className="py-8 relative">
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
          <Grid container spacing={3}>
            {[
              {
                title: "Total Shipments",
                value: "100",
                icon: <LocalShipping className="text-cyan-400" />,
                delay: 0.1,
              },
              {
                title: "Active Shipments",
                value: "20",
                icon: <Speed className="text-cyan-400" />,
                delay: 0.2,
              },
              {
                title: "Delivered",
                value: "70",
                icon: <Timeline className="text-cyan-400" />,
                delay: 0.3,
              },
              {
                title: "Inventory Levels",
                value: "Critical",
                icon: <Inventory className="text-cyan-400" />,
                delay: 0.4,
              },
            ].map((metric) => (
              <Grid item xs={12} md={3} key={metric.title}>
                <MetricCard {...metric} />
              </Grid>
            ))}
          </Grid>

          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Analytics Section */}
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Paper className="p-8 bg-navy-dark/50 border border-cyan-400/20 backdrop-blur-sm">
                  <Typography
                    variant="h6"
                    className="text-white mb-6 flex items-center gap-2"
                  >
                    <Timeline className="text-cyan-400" />
                    Shipment Analytics
                  </Typography>
                  <Box className="h-[400px] bg-navy-dark/30 rounded-lg relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent"
                      animate={{
                        x: ["0%", "100%"],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Side Panel */}
            <Grid item xs={12} md={4} className="space-y-4">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Paper className="p-8 bg-navy-dark/50 border border-cyan-400/20 backdrop-blur-sm">
                  <Typography
                    variant="h6"
                    className="text-white mb-6 flex items-center gap-2"
                  >
                    <Speed className="text-cyan-400" />
                    Recent Activity
                  </Typography>
                  <div className="space-y-3">
                    {[
                      "New shipment created",
                      "Delivery completed",
                      "Route optimized",
                    ].map((text, index) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Paper className="p-4 bg-navy-dark/30 border border-cyan-400/10 backdrop-blur-sm">
                          <Typography className="text-slate-300">
                            {text}
                          </Typography>
                        </Paper>
                      </motion.div>
                    ))}
                  </div>
                </Paper>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Paper className="p-8 bg-navy-dark/50 border border-cyan-400/20 backdrop-blur-sm">
                  <Typography
                    variant="h6"
                    className="text-white mb-6 flex items-center gap-2"
                  >
                    <LocalShipping className="text-cyan-400" />
                    Quick Actions
                  </Typography>
                  <div className="space-y-3">
                    {[
                      { text: "Create New Shipment", primary: true },
                      { text: "Manage Inventory", primary: false },
                      { text: "View Reports", primary: false },
                    ].map((action, index) => (
                      <motion.div
                        key={action.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Button
                          variant={action.primary ? "contained" : "outlined"}
                          fullWidth
                          className={
                            action.primary
                              ? "bg-cyan-400 text-navy-darker hover:bg-cyan-300 normal-case"
                              : "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 normal-case"
                          }
                        >
                          {action.text}
                        </Button>
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
