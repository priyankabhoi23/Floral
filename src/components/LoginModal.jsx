"use client";

import React, { useState } from "react";
import { X, Phone, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1 for Phone, 2 for OTP
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();

  if (!isOpen) return null;

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      login(phone);
      setError("");
      setStep(1);
      setPhone("");
      setOtp("");
      onSuccess?.();
    } else {
      setError("Invalid OTP. Please try 123456.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(44, 38, 39, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          padding: "32px",
          position: "relative",
          animation: "slideUp 0.3s ease"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            padding: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-medium)",
            border: "none",
            cursor: "pointer"
          }}
          aria-label="Close login modal"
        >
          <X style={{ width: "20px", height: "20px" }} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--text-dark)", marginBottom: "8px" }}>
            Welcome Back
          </h2>
          <p style={{ color: "var(--text-medium)", fontSize: "0.95rem" }}>
            {step === 1 ? "Enter your phone number to login or sign up." : "Enter the verification code sent to your phone."}
          </p>
        </div>

        {error && (
          <div style={{ padding: "12px", backgroundColor: "#FEE2E2", color: "#DC2626", borderRadius: "var(--radius-sm)", marginBottom: "16px", fontSize: "0.85rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }}>
                <Phone size={18} />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "14px", width: "100%", justifyContent: "center", fontSize: "1rem", marginTop: "8px" }}
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)" }}>
                <Lock size={18} />
              </div>
              <input
                type="text"
                placeholder="OTP (123456)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "14px", width: "100%", justifyContent: "center", fontSize: "1rem", marginTop: "8px" }}
            >
              Verify & Login
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                fontSize: "0.9rem",
                cursor: "pointer",
                marginTop: "8px"
              }}
            >
              Back to Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
