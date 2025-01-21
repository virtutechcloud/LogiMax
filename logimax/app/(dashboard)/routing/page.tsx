"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";
import Sidebar from "../../components/appComponents/sidebar";
import {
  Box,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  FileUpload as FileUploadIcon,
  Analytics as AnalyticsIcon,
  LocalShipping as TruckIcon,
  AccessTime as TimeIcon,
  Room as LocationIcon,
  CheckCircle as CompletedIcon,
  Schedule as PendingIcon,
  Warning as DelayedIcon,
} from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface Stop {
  id: string;
  address: string;
  lat: number;
  lng: number;
  estimatedArrival: string;
  status: "pending" | "completed" | "delayed";
}

interface Route {
  id: string;
  name: string;
  driver: string;
  vehicle: string;
  status: "active" | "planned" | "completed";
  startTime: string;
  endTime: string;
  stops: Stop[];
  distance: number;
  duration: number;
}

const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Downtown Delivery Route",
    driver: "John Smith",
    vehicle: "Van-001",
    status: "active",
    startTime: "2024-03-20T08:00:00",
    endTime: "2024-03-20T16:00:00",
    stops: [
      {
        id: "s1",
        address: "123 Main St, City",
        lat: 40.7128,
        lng: -74.006,
        estimatedArrival: "2024-03-20T09:00:00",
        status: "completed",
      },
      {
        id: "s2",
        address: "456 Park Ave, City",
        lat: 40.758,
        lng: -73.9855,
        estimatedArrival: "2024-03-20T10:30:00",
        status: "pending",
      },
    ],
    distance: 15.5,
    duration: 480,
  },
  {
    id: "2",
    name: "Suburban Route",
    driver: "Jane Doe",
    vehicle: "Truck-002",
    status: "planned",
    startTime: "2024-03-21T09:00:00",
    endTime: "2024-03-21T17:00:00",
    stops: [
      {
        id: "s3",
        address: "789 Oak Rd, Suburb",
        lat: 40.7829,
        lng: -73.9654,
        estimatedArrival: "2024-03-21T10:00:00",
        status: "pending",
      },
    ],
    distance: 25.2,
    duration: 480,
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

export default function RoutingDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [routes] = useState<Route[]>(mockRoutes);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: Stop["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "delayed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: Stop["status"]) => {
    switch (status) {
      case "completed":
        return <CompletedIcon className="text-green-400" />;
      case "pending":
        return <PendingIcon className="text-yellow-400" />;
      case "delayed":
        return <DelayedIcon className="text-red-400" />;
    }
  };

  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#0f172a" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d4d4d8" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38b2ac" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2937" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca3af" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0c4a6e" }],
    },
  ];

  const getRouteStatusColor = (status: Route["status"]) => {
    switch (status) {
      case "active":
        return "from-emerald-500/20 to-cyan-500/20 border-emerald-500/30";
      case "planned":
        return "from-blue-500/20 to-indigo-500/20 border-blue-500/30";
      case "completed":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/30";
      default:
        return "from-slate-500/20 to-slate-400/20 border-slate-500/30";
    }
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
          <div className="bg-[#0a192f] min-h-screen">
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
                    Route{" "}
                    <span style={{ color: "#22d3ee", fontWeight: "bold" }}>
                      Management
                    </span>
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#94a3b8" }}>
                    Monitor and manage your delivery routes
                  </Typography>
                </Box>

                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{
                      borderColor: "rgba(34, 211, 238, 0.2)",
                      color: "#22d3ee",
                      "&:hover": {
                        borderColor: "rgba(34, 211, 238, 0.4)",
                      },
                    }}
                  >
                    Create Route
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<FileUploadIcon />}
                    sx={{
                      bgcolor: "#22d3ee",
                      "&:hover": {
                        bgcolor: "#06b6d4",
                      },
                    }}
                  >
                    Import Routes
                  </Button>
                </div>
              </Box>

              {/* Main Content Grid - Restructured for larger map */}
              <div className="flex gap-6 h-[calc(100vh-180px)]">
                {/* Left Sidebar - Route List (Narrower) */}
                <div className="w-[300px] flex-shrink-0">
                  <Paper className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 h-full overflow-hidden">
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      className="border-b border-white/10"
                      sx={{
                        "& .MuiTab-root": {
                          color: "#94a3b8",
                          textTransform: "none",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          "&.Mui-selected": {
                            color: "#22d3ee",
                          },
                        },
                        "& .MuiTabs-indicator": {
                          background:
                            "linear-gradient(to right, #22d3ee, #a855f7)",
                          height: "3px",
                          borderRadius: "3px",
                        },
                      }}
                    >
                      <Tab
                        label={
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            Active
                          </div>
                        }
                      />
                      <Tab
                        label={
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            Planned
                          </div>
                        }
                      />
                      <Tab
                        label={
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-400" />
                            Completed
                          </div>
                        }
                      />
                    </Tabs>

                    <div className="overflow-auto h-[calc(100%-48px)] custom-scrollbar">
                      {routes
                        .filter((route) => route.status === "active")
                        .map((route) => (
                          <motion.div
                            key={route.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-4 cursor-pointer transition-all duration-300 border-b border-white/5
                              ${
                                selectedRoute === route.id
                                  ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                                  : "hover:bg-white/5"
                              }`}
                            onClick={() => setSelectedRoute(route.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`bg-gradient-to-br ${getRouteStatusColor(
                                  route.status
                                )} p-2 rounded-lg`}
                              >
                                <TruckIcon className="text-cyan-400" />
                              </div>
                              <div>
                                <Typography className="text-white font-medium">
                                  {route.name}
                                </Typography>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                  <LocationIcon sx={{ fontSize: 16 }} />
                                  <span>{route.stops.length} stops</span>
                                  <span>·</span>
                                  <span>{route.driver}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </Paper>
                </div>

                {/* Center Panel - Larger Map */}
                <div className="flex-grow">
                  <Paper className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 h-full overflow-hidden">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={12}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                          styles: mapStyles,
                          disableDefaultUI: true,
                          zoomControl: true,
                          mapTypeControl: false,
                          streetViewControl: false,
                          rotateControl: false,
                          fullscreenControl: true,
                          backgroundColor: "#0f172a",
                        }}
                      >
                        {selectedRoute &&
                          routes
                            .filter((route) => route.id === selectedRoute)
                            .map((route) =>
                              route.stops.map((stop, index) => (
                                <Marker
                                  key={stop.id}
                                  position={{ lat: stop.lat, lng: stop.lng }}
                                  title={stop.address}
                                  label={{
                                    text: (index + 1).toString(),
                                    color: "#ffffff",
                                    fontWeight: "bold",
                                  }}
                                  icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 12,
                                    fillColor:
                                      stop.status === "completed"
                                        ? "#10b981"
                                        : stop.status === "pending"
                                        ? "#3b82f6"
                                        : "#ef4444",
                                    fillOpacity: 1,
                                    strokeWeight: 2,
                                    strokeColor: "#ffffff",
                                  }}
                                />
                              ))
                            )}
                      </GoogleMap>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mb-3"
                          />
                          <Typography className="text-slate-400">
                            Loading map...
                          </Typography>
                        </div>
                      </div>
                    )}
                  </Paper>
                </div>

                {/* Right Panel - Route Details (Narrower) */}
                <div className="w-[300px] flex-shrink-0">
                  <Paper className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 h-full overflow-hidden">
                    <div className="p-6">
                      <Typography
                        variant="h6"
                        className="text-white mb-6 flex items-center gap-2"
                      >
                        <AnalyticsIcon className="text-cyan-400" />
                        Route Details
                      </Typography>

                      {selectedRoute ? (
                        routes
                          .filter((route) => route.id === selectedRoute)
                          .map((route) => (
                            <motion.div
                              key={route.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="space-y-6"
                            >
                              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-white/10">
                                <Typography className="text-white text-lg font-medium mb-4">
                                  {route.name}
                                </Typography>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Typography className="text-slate-400 text-sm">
                                      Driver
                                    </Typography>
                                    <Typography className="text-white">
                                      {route.driver}
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography className="text-slate-400 text-sm">
                                      Vehicle
                                    </Typography>
                                    <Typography className="text-white">
                                      {route.vehicle}
                                    </Typography>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <Typography className="text-white font-medium">
                                  Stops
                                </Typography>
                                {route.stops.map((stop, index) => (
                                  <motion.div
                                    key={stop.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <Typography className="text-white">
                                        Stop {index + 1}
                                      </Typography>
                                      {getStatusIcon(stop.status)}
                                    </div>
                                    <Typography className="text-slate-400 text-sm mb-2">
                                      {stop.address}
                                    </Typography>
                                    <Typography className="text-cyan-400 text-sm">
                                      ETA:{" "}
                                      {new Date(
                                        stop.estimatedArrival
                                      ).toLocaleTimeString()}
                                    </Typography>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))
                      ) : (
                        <div className="text-center text-slate-400 mt-8">
                          Select a route to view details
                        </div>
                      )}
                    </div>
                  </Paper>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this CSS to your global styles
const globalStyles = `
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(34, 211, 238, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(34, 211, 238, 0.3);
  border-radius: 3px;
}
`;
