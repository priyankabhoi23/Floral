"use client";

import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@bloomcraft.com" && password === "admin123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFF9F6"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xl)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <div style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px"
        }}>
          <Lock size={32} />
        </div>
        
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--text-dark)", marginBottom: "8px" }}>
          Admin Login
        </h1>
        <p style={{ color: "var(--text-medium)", marginBottom: "24px" }}>
          Sign in to manage BloomCraft.
        </p>

        {error && (
          <div style={{ padding: "12px", backgroundColor: "#FEE2E2", color: "#DC2626", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "0.85rem", fontWeight: "500" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ position: "relative" }}>
            <Mail size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ padding: "14px", width: "100%", justifyContent: "center", fontSize: "1rem", marginTop: "8px" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
