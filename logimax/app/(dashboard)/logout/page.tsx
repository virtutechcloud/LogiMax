import React, { useEffect } from "react";
import { useRouter } from "next/router";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      User logged out. Redirecting...
    </div>
  );
};

export default LogoutPage;
