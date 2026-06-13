"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flower, Heart, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#3b2a2a",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "64px 0 32px 0",
        marginTop: "auto"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "48px"
          }}
        >
          {/* Brand Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#FFF9F6",
                fontWeight: 700,
                fontSize: "1.35rem"
              }}
            >
              <Flower style={{ color: "var(--primary)", width: "24px", height: "24px" }} fill="var(--primary)" />
              <span style={{ fontFamily: "var(--font-serif)" }}>BloomCraft</span>
            </Link>
            <p style={{ color: "#E2DCDA", fontSize: "0.9rem", lineHeight: "1.6" }}>
              Handcrafting everlasting memories with premium pipe cleaner floral apparel, resin preserves, and custom gifts. Designed by you, handmade with love.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <a
                href="#"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3b2a2a",
                  boxShadow: "var(--shadow-sm)",
                  transition: "var(--transition-quick)"
                }}
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "18px", height: "18px" }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "20px", letterSpacing: "0.5px", color: "#FFF9F6" }}>Shop Categories</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Floral Hoodies", "Resin Keychains", "Custom Phone Cases", "Pressed Flower Frames", "Everlasting Bouquets"].map((item) => (
                <li key={item}>
                  <Link href="/shop" style={{ color: "#E2DCDA", fontSize: "0.9rem", transition: "var(--transition-quick)" }} className="footer-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Quick Links */}
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "20px", letterSpacing: "0.5px", color: "#FFF9F6" }}>Experience</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <Link href="/designer" style={{ color: "#E2DCDA", fontSize: "0.9rem" }} className="footer-link">
                  Interactive Live Customizer
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: "#E2DCDA", fontSize: "0.9rem" }} className="footer-link">
                  Our Handmade Story
                </Link>
              </li>
              <li>
                <a href="#" style={{ color: "#E2DCDA", fontSize: "0.9rem" }} className="footer-link">
                  Product Care Guide
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#E2DCDA", fontSize: "0.9rem" }} className="footer-link">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "20px", letterSpacing: "0.5px", color: "#FFF9F6" }}>Join the Craft Club</h3>
            <p style={{ color: "#E2DCDA", fontSize: "0.9rem", marginBottom: "16px", lineHeight: "1.5" }}>
              Subscribe to get notified about custom drops, limited edition flower restocks, and custom styling updates.
            </p>
            <form onSubmit={handleSubscribe} style={{ position: "relative" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  paddingRight: "50px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#FFF9F6",
                  boxShadow: "var(--shadow-sm)"
                }}
              />
              <button
                type="submit"
                style={{
                  position: "absolute",
                  right: "4px",
                  top: "4px",
                  bottom: "4px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "var(--transition-quick)"
                }}
                aria-label="Subscribe"
              >
                {subscribed ? <Check style={{ width: "16px", height: "16px" }} /> : <Send style={{ width: "16px", height: "16px" }} />}
              </button>
            </form>
            {subscribed && (
              <p style={{ color: "var(--primary)", fontSize: "0.8rem", marginTop: "8px", fontWeight: "500" }}>
                Thanks for subscribing! Check your inbox soon.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "0.85rem",
            color: "#C8BCBE"
          }}
          className="footer-bottom"
        >
          <div>
            &copy; {new Date().getFullYear()} BloomCraft. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Handcrafted with <Heart style={{ width: "12px", height: "12px", color: "var(--primary)" }} fill="var(--primary)" /> around the world.
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer-link:hover {
          color: #FFF9F6 !important;
          padding-left: 4px;
        }
        @media (min-width: 600px) {
          .footer-bottom {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}
