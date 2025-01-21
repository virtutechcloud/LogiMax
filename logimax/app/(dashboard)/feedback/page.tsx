"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Bug,
  Lightning,
  Lightbulb,
  Rocket,
  Upload,
  X,
  Check,
} from "@phosphor-icons/react";
import Sidebar from "../../components/appComponents/sidebar";

interface FeedbackFormData {
  type: string;
  title: string;
  description: string;
  priority: string;
  attachments: File[];
}

const FeedbackPage: React.FC = () => {
  // Add useEffect to handle client-side initialization
  useEffect(() => {
    // This ensures the component only renders on the client side
    setIsMounted(true);
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: "",
    title: "",
    description: "",
    priority: "",
    attachments: [],
  });

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return null; // or a loading state if preferred
  }

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...Array.from(e.target.files)],
      });
    }
  };

  const removeAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    });
  };

  // Add new animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
                  Share Your{" "}
                  <span style={{ color: "#22d3ee", fontWeight: "bold" }}>
                    Feedback
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ color: "#94a3b8" }}>
                  Help us improve LogiMax by sharing your thoughts and
                  suggestions.
                </Typography>
              </Box>
            </Box>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert
                  icon={<Check weight="bold" size={24} />}
                  severity="success"
                  className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 backdrop-blur-sm"
                >
                  Thank you for your feedback! We'll review it shortly.
                </Alert>
              </motion.div>
            )}

            {/* Feedback Form */}
            <Paper
              sx={{
                bgcolor: "#0f1729",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                "&:hover": {
                  border: "1px solid rgba(34, 211, 238, 0.4)",
                },
                p: 4,
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "#94a3b8",
                        "&.Mui-focused": {
                          color: "#22d3ee",
                        },
                      }}
                    >
                      Feedback Type
                    </InputLabel>
                    <Select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      required
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(34, 211, 238, 0.2)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(34, 211, 238, 0.4)",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#22d3ee",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: "#0f1729 !important",
                            backgroundImage: "none",
                            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                            border: "1px solid rgba(34, 211, 238, 0.2)",
                            "& .MuiMenuItem-root": {
                              color: "#94a3b8",
                              "&:hover": {
                                backgroundColor: "rgba(34, 211, 238, 0.1)",
                                color: "rgb(34, 211, 238)",
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value="bug">
                        <Box className="flex items-center gap-2">
                          <Bug className="text-rose-400" />
                          Bug Report
                        </Box>
                      </MenuItem>
                      <MenuItem value="feature">
                        <Box className="flex items-center gap-2">
                          <Lightbulb className="text-amber-400" />
                          Feature Request
                        </Box>
                      </MenuItem>
                      <MenuItem value="improvement">
                        <Box className="flex items-center gap-2">
                          <Rocket className="text-cyan-400" />
                          Improvement Suggestion
                        </Box>
                      </MenuItem>
                      <MenuItem value="performance">
                        <Box className="flex items-center gap-2">
                          <Lightning className="text-purple-400" />
                          Performance Issue
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: "#94a3b8",
                        "&.Mui-focused": {
                          color: "#22d3ee",
                        },
                      }}
                    >
                      Priority
                    </InputLabel>
                    <Select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                      required
                      sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(34, 211, 238, 0.2)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(34, 211, 238, 0.4)",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#22d3ee",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: "#0f1729 !important",
                            backgroundImage: "none",
                            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                            border: "1px solid rgba(34, 211, 238, 0.2)",
                            "& .MuiMenuItem-root": {
                              color: "#94a3b8",
                              "&:hover": {
                                backgroundColor: "rgba(34, 211, 238, 0.1)",
                                color: "rgb(34, 211, 238)",
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="critical">Critical</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#94a3b8",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#22d3ee",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(34, 211, 238, 0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(34, 211, 238, 0.4)",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#22d3ee",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#94a3b8",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#22d3ee",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(34, 211, 238, 0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(34, 211, 238, 0.4)",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#22d3ee",
                    },
                  }}
                />

                <div className="space-y-4">
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<Upload className="text-cyan-400" />}
                    sx={{
                      borderColor: "rgba(34, 211, 238, 0.2)",
                      color: "#22d3ee",
                      "&:hover": {
                        borderColor: "rgba(34, 211, 238, 0.4)",
                        bgcolor: "rgba(34, 211, 238, 0.1)",
                      },
                    }}
                  >
                    Attach Files
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileUpload}
                    />
                  </Button>

                  <Box className="flex flex-wrap gap-2">
                    {formData.attachments.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Chip
                          label={file.name}
                          onDelete={() => removeAttachment(index)}
                          className="bg-[#0f1729] text-white border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
                          deleteIcon={
                            <IconButton size="small">
                              <X className="text-slate-400 hover:text-cyan-400" />
                            </IconButton>
                          }
                        />
                      </motion.div>
                    ))}
                  </Box>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#22d3ee",
                    "&:hover": {
                      bgcolor: "#06b6d4",
                    },
                    py: 1.5,
                    fontSize: "1.1rem",
                  }}
                  fullWidth
                >
                  Submit Feedback
                </Button>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
