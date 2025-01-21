"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear any auth tokens or user data from localStorage
    localStorage.removeItem("token"); // Adjust based on your auth token key
    localStorage.clear(); // Optional: clear all localStorage data

    const timer = setTimeout(() => {
      router.push("/");
      router.refresh(); // Refresh the page to update client-side state
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
      <div>User logged out. Redirecting...</div>
    </div>
  );
};

export default LogoutPage;
