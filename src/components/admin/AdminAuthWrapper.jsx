"use client";

import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";

export default function AdminAuthWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("bloomcraft_admin_auth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("bloomcraft_admin_auth", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("bloomcraft_admin_auth");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const onLogoutEvent = () => handleLogout();
    window.addEventListener("admin-logout", onLogoutEvent);
    return () => window.removeEventListener("admin-logout", onLogoutEvent);
  }, []);

  if (isLoading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF9F6" }}>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <>{children}</>;
}
