"use client";

import { motion } from "framer-motion";
import { Typography, Container, Paper, Button } from "@mui/material";
import {
  Buildings,
  User,
  Gear,
  Bell,
  Password,
  Globe,
} from "@phosphor-icons/react";
import Sidebar from "../../components/appComponents/sidebar";

interface SettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  onClick?: () => void;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon,
  delay,
  onClick,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="h-full"
    onClick={onClick}
  >
    <Paper className="relative h-[200px] w-full p-6 bg-gradient-to-br from-navy-dark/80 to-navy-dark/40 border border-cyan-400/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm overflow-hidden flex flex-col group cursor-pointer">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:bg-cyan-400/10 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:bg-blue-400/10 transition-all duration-700" />

      <div className="relative z-10 flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 backdrop-blur-sm group-hover:from-cyan-400/30 group-hover:to-cyan-400/10 transition-all duration-700">
          {icon}
        </div>
        <Typography variant="h6" className="text-white font-medium">
          {title}
        </Typography>
      </div>

      <Typography variant="body2" className="text-slate-400 relative z-10">
        {description}
      </Typography>
    </Paper>
  </motion.div>
);

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#0a192f] flex">
      <Sidebar onToggle={() => {}} />
      <div className="flex-1 ml-[250px] relative">
        <motion.div
          className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <Container maxWidth="xl" className="relative py-8 space-y-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" className="text-white mb-1">
              Settings{" "}
              <span className="text-cyan-400" style={{ fontWeight: "bold" }}>
                Overview
              </span>
            </Typography>
            <Typography variant="body1" className="text-slate-400">
              Manage your account and system preferences
            </Typography>
          </motion.div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SettingsCard
              title="Company Profile"
              description="Manage your company information, logo, and business details"
              icon={
                <Buildings weight="duotone" className="text-cyan-400 w-7 h-7" />
              }
              delay={0.1}
            />
            <SettingsCard
              title="User Account"
              description="Update your personal information, password, and preferences"
              icon={<User weight="duotone" className="text-cyan-400 w-7 h-7" />}
              delay={0.2}
            />
            <SettingsCard
              title="System Configuration"
              description="Configure system defaults and general settings"
              icon={<Gear weight="duotone" className="text-cyan-400 w-7 h-7" />}
              delay={0.3}
            />
            <SettingsCard
              title="Notifications"
              description="Customize your notification preferences and alerts"
              icon={<Bell weight="duotone" className="text-cyan-400 w-7 h-7" />}
              delay={0.4}
            />
            <SettingsCard
              title="Security"
              description="Manage security settings and two-factor authentication"
              icon={
                <Password weight="duotone" className="text-cyan-400 w-7 h-7" />
              }
              delay={0.5}
            />
            <SettingsCard
              title="Localization"
              description="Set your language, timezone, and regional preferences"
              icon={
                <Globe weight="duotone" className="text-cyan-400 w-7 h-7" />
              }
              delay={0.6}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
