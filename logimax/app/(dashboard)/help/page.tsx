"use client";

import { motion } from "framer-motion";
import { Typography, Container, Paper, Button } from "@mui/material";
import {
  Search,
  Book,
  PlayCircle,
  FileText,
  MessageCircle,
  Users,
  Download,
  Bell,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Send,
  MessageSquare,
} from "lucide-react";
import Sidebar from "../../components/appComponents/sidebar";

const HelpPage = () => {
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
                Help Center
              </Typography>
              <Typography variant="body1" className="text-slate-400">
                Find answers and support for LogiMax
              </Typography>
            </motion.div>
          </div>

          {/* Search Section */}
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full p-3 pl-10 bg-navy-darker border border-cyan-400/20 rounded-lg text-white focus:border-cyan-400/40 focus:outline-none"
            />
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Paper className="bg-[#0f1729] border border-cyan-400/20 hover:border-cyan-400/40 transition-all p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Book className="text-cyan-400 w-7 h-7" />,
                    title: "Getting Started",
                    links: [
                      "Platform Overview",
                      "Quick Start Guide",
                      "Basic Navigation",
                    ],
                  },
                  {
                    icon: <PlayCircle className="text-cyan-400 w-7 h-7" />,
                    title: "Video Tutorials",
                    links: [
                      "Shipment Creation",
                      "Route Planning",
                      "Reports Generation",
                    ],
                  },
                  {
                    icon: <MessageCircle className="text-cyan-400 w-7 h-7" />,
                    title: "Support Options",
                    links: ["Contact Support", "Live Chat", "Community Forum"],
                  },
                ].map((section, index) => (
                  <div
                    key={index}
                    className="p-4 border border-cyan-400/20 rounded-lg hover:border-cyan-400/40 transition-all"
                  >
                    <h3 className="font-semibold mb-4 flex items-center text-white">
                      {section.icon}
                      <span className="ml-2">{section.title}</span>
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link, i) => (
                        <li
                          key={i}
                          className="text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Paper>
          </motion.div>

          {/* Popular Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Paper className="bg-[#0f1729] border border-cyan-400/20 hover:border-cyan-400/40 transition-all p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">
                Popular Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="border border-cyan-400/20 rounded-lg p-4 hover:border-cyan-400/40 transition-all"
                  >
                    <h3 className="text-white font-medium mb-2">
                      How to optimize delivery routes?
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm">
                      Learn about our advanced route optimization features...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">
                        Last updated: 2 days ago
                      </span>
                      <Button
                        size="small"
                        variant="outlined"
                        className="border-cyan-400/40 text-cyan-400 hover:border-cyan-400"
                      >
                        Read more
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Paper className="bg-[#0f1729] border border-cyan-400/20 hover:border-cyan-400/40 transition-all p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Still need help?
                  </h2>
                  <p className="text-slate-400">
                    Our support team is here to assist you
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    startIcon={<MessageSquare />}
                    className="bg-cyan-400 hover:bg-cyan-500"
                  >
                    Start Live Chat
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Send />}
                    className="border-cyan-400/40 text-cyan-400 hover:border-cyan-400"
                  >
                    Submit Ticket
                  </Button>
                </div>
              </div>
            </Paper>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default HelpPage;
