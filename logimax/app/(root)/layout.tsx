import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Root NavBar</h1>
      {children}
    </div>
  );
};

export default Layout;
