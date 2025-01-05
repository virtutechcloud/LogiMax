"use client";

import { useState } from "react";
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
import Sidebar from "../../components/sidebar";

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
const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    "In Stock": "success",
    "Low Stock": "warning",
    "Out of Stock": "error",
    Reorder: "info",
  };
  return statusMap[status] || "default";
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
        <Typography variant="body2" className="text-slate-400 font-medium">
          {title}
        </Typography>
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
        </motion.div>
      </div>

      {additionalInfo && (
        <Typography
          variant="caption"
          className="text-slate-400 block relative z-10"
        >
          {additionalInfo}
        </Typography>
      )}
    </Paper>
  </motion.div>
);

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a192f] flex">
      <Sidebar className="w-64" />
      <div className="flex-1 ml-64 relative">
        <motion.div
          className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <Container maxWidth="xl" className="relative py-8 space-y-10">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" className="text-white mb-2 font-light">
                Inventory Management
              </Typography>
              <Typography variant="body1" className="text-slate-400">
                Monitor and manage your stock levels
              </Typography>
            </motion.div>

            <div className="flex gap-3">
              <Button
                variant="outlined"
                startIcon={<Barcode weight="duotone" />}
                className="border-cyan-400/40 text-cyan-400 hover:border-cyan-400"
              >
                Scan Item
              </Button>
              <Button
                variant="contained"
                startIcon={<Package weight="duotone" />}
                className="bg-cyan-400 hover:bg-cyan-500"
              >
                Add New Item
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total SKUs"
              value={inventoryStats.totalSKUs}
              icon={<Tag weight="duotone" className="text-cyan-400 w-7 h-7" />}
              delay={0.1}
            />
            <MetricCard
              title="Total Value"
              value={inventoryStats.totalValue}
              icon={<Cube weight="duotone" className="text-cyan-400 w-7 h-7" />}
              delay={0.2}
            />
            <MetricCard
              title="Turnover Rate"
              value={inventoryStats.turnoverRate}
              icon={
                <ArrowsClockwise
                  weight="duotone"
                  className="text-cyan-400 w-7 h-7"
                />
              }
              delay={0.3}
            />
            <MetricCard
              title="Low Stock Items"
              value={inventoryStats.lowStockCount}
              icon={
                <Warning weight="duotone" className="text-cyan-400 w-7 h-7" />
              }
              delay={0.4}
              additionalInfo="Items below reorder point"
            />
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Paper className="bg-[#0f1729] border border-cyan-400/20 hover:border-cyan-400/40 transition-all p-6">
              {/* Search and Filter Bar */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="search"
                    placeholder="Search inventory..."
                    className="w-full p-3 pl-10 bg-navy-darker border border-cyan-400/20 rounded-lg text-white focus:border-cyan-400/40 focus:outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outlined"
                  startIcon={<FunnelSimple weight="duotone" />}
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-cyan-400/40 text-cyan-400 hover:border-cyan-400"
                >
                  Filters
                </Button>
              </div>

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
                            <TableCell className="text-slate-400">
                              SKU
                            </TableCell>
                            <TableCell className="text-slate-400">
                              Name
                            </TableCell>
                            <TableCell className="text-slate-400">
                              Category
                            </TableCell>
                            <TableCell className="text-slate-400">
                              Stock Level
                            </TableCell>
                            <TableCell className="text-slate-400">
                              Status
                            </TableCell>
                            <TableCell className="text-slate-400">
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {inventoryItems.map((item) => (
                            <TableRow
                              key={item.id}
                              className="hover:bg-cyan-400/5 transition-colors"
                            >
                              <TableCell className="text-slate-300">
                                {item.sku}
                              </TableCell>
                              <TableCell className="text-slate-300">
                                {item.name}
                              </TableCell>
                              <TableCell className="text-slate-300">
                                {item.category}
                              </TableCell>
                              <TableCell className="text-slate-300">
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
                                  className="border-cyan-400/40 text-cyan-400 hover:border-cyan-400"
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
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
