import React from "react";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div>© {currentYear} Virtutech Cloud Innovations</div>
    </div>
  );
}
