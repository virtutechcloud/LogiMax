interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  // ... existing sidebar code ...
}; 