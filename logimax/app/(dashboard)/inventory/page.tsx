"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Typography,
  Container,
  Paper,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import {
  Package,
  MagnifyingGlass,
  Cube,
  Tag,
  ArrowsClockwise,
  Warning,
  Barcode,
  ChartLine,
  FunnelSimple,
} from "@phosphor-icons/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/appComponents/sidebar";

// Mock data - replace with actual data fetching
const inventoryStats = {
  totalSKUs: 1250,
  totalValue: "$543,234",
  turnoverRate: "2.4",
  lowStockCount: 15,
};

const inventoryItems = [
  {
    id: "1",
    sku: "PRD001",
    name: "Widget A",
    category: "Electronics",
    stockLevel: 45,
    reorderPoint: 20,
    unitPrice: 29.99,
    status: "In Stock",
  },
  // ... more items
];

// Add mock chart data
const stockTrends = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1400 },
  { month: "Mar", value: 1300 },
  { month: "Apr", value: 1800 },
  { month: "May", value: 1600 },
  { month: "Jun", value: 2000 },
];

// Add status color mapping
const getStatusColor = (
  status: string
): "success" | "warning" | "error" | "info" | "default" => {
  const statusMap = {
    "In Stock": "success",
    "Low Stock": "warning",
    "Out of Stock": "error",
    Reorder: "info",
  } as const;
  return statusMap[status as keyof typeof statusMap] || "default";
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  delay: number;
  additionalInfo?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  delay,
  additionalInfo,
}) => (
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
        <Typography variant="h6" sx={{ color: "#94a3b8" }}>
          {title}
        </Typography>
        <Box sx={{ color: "#22d3ee" }}>{icon}</Box>
      </Box>
      <Typography variant="h4" sx={{ color: "white" }}>
        {value}
      </Typography>
      {additionalInfo && (
        <Typography
          variant="caption"
          sx={{ color: "#94a3b8", mt: 1, display: "block" }}
        >
          {additionalInfo}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a192f] flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-[250px] transition-all duration-300">
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
                  Inventory{" "}
                  <span style={{ color: "#22d3ee", fontWeight: "bold" }}>
                    Management
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ color: "#94a3b8" }}>
                  Monitor and manage your stock levels
                </Typography>
              </Box>

              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  startIcon={<Barcode weight="bold" />}
                  sx={{
                    borderColor: "rgba(34, 211, 238, 0.2)",
                    color: "#22d3ee",
                    "&:hover": {
                      borderColor: "rgba(34, 211, 238, 0.4)",
                    },
                  }}
                >
                  Scan Item
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Package weight="bold" />}
                  sx={{
                    bgcolor: "#22d3ee",
                    "&:hover": {
                      bgcolor: "#06b6d4",
                    },
                  }}
                >
                  Add New Item
                </Button>
              </div>
            </Box>

            {/* Metrics Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  title: "Total SKUs",
                  value: inventoryStats.totalSKUs,
                  icon: <Tag weight="bold" size={24} />,
                },
                {
                  title: "Total Value",
                  value: inventoryStats.totalValue,
                  icon: <Cube weight="bold" size={24} />,
                },
                {
                  title: "Turnover Rate",
                  value: inventoryStats.turnoverRate,
                  icon: <ArrowsClockwise weight="bold" size={24} />,
                },
                {
                  title: "Low Stock Items",
                  value: inventoryStats.lowStockCount,
                  icon: <Warning weight="bold" size={24} />,
                  additionalInfo: "Items below reorder point",
                },
              ].map((metric, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <MetricCard {...metric} delay={0.1 * index} />
                </Grid>
              ))}
            </Grid>

            {/* Main Content */}
            <Paper
              sx={{
                bgcolor: "#0f1729",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                "&:hover": {
                  border: "1px solid rgba(34, 211, 238, 0.4)",
                },
                p: 3,
              }}
            >
              {/* Search and Filter Bar */}
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
                    placeholder="Search inventory..."
                    variant="outlined"
                    size="small"
                    className="flex-1 min-w-[200px]"
                    InputProps={{
                      startAdornment: (
                        <MagnifyingGlass className="text-slate-400 mr-2" />
                      ),
                      sx: {
                        bgcolor: "#0a192f",
                        color: "white",
                        "& input": {
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<FunnelSimple weight="bold" />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{
                      borderColor: "rgba(34, 211, 238, 0.2)",
                      color: "#22d3ee",
                      "&:hover": {
                        borderColor: "rgba(34, 211, 238, 0.4)",
                      },
                    }}
                  >
                    Filters
                  </Button>
                </div>
              </Paper>

              {/* Tabs Navigation */}
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                className="mb-4"
                TabIndicatorProps={{
                  style: { backgroundColor: "#22d3ee" },
                }}
              >
                <Tab label="All Items" className="text-slate-400" />
                <Tab label="Low Stock" className="text-slate-400" />
                <Tab label="Analytics" className="text-slate-400" />
              </Tabs>

              {/* Table Content */}
              <AnimatePresence mode="wait">
                {tabValue === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: "white" }}>SKU</TableCell>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>
                              Category
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              Stock Level
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              Status
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {inventoryItems.map((item) => (
                            <TableRow
                              key={item.id}
                              className="hover:bg-navy-darker"
                            >
                              <TableCell sx={{ color: "white" }}>
                                {item.sku}
                              </TableCell>
                              <TableCell sx={{ color: "white" }}>
                                {item.name}
                              </TableCell>
                              <TableCell sx={{ color: "white" }}>
                                {item.category}
                              </TableCell>
                              <TableCell sx={{ color: "white" }}>
                                {item.stockLevel}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={item.status}
                                  color={getStatusColor(item.status)}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: "rgba(34, 211, 238, 0.2)",
                                    color: "#22d3ee",
                                    "&:hover": {
                                      borderColor: "rgba(34, 211, 238, 0.4)",
                                    },
                                  }}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      component="div"
                      count={100}
                      page={page}
                      onPageChange={(_, newPage) => setPage(newPage)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                      }}
                      className="text-slate-400"
                    />
                  </motion.div>
                )}

                {tabValue === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stockTrends}>
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#22d3ee"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
}
