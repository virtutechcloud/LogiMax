"use client";

import React from "react";

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, className }) => {
  return <div className={className}>{/* Sidebar content */}</div>;
};

export default Sidebar;
