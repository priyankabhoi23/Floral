"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Flower } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { getCartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Designer", path: "/designer" },
    { name: "About", path: "/about" }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "80px",
          display: "flex",
          alignItems: "center",
          backgroundColor: isScrolled ? "rgba(255, 249, 246, 0.85)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(214, 123, 136, 0.1)" : "1px solid transparent",
          transition: "all 0.3s ease"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-dark)",
              fontWeight: 700,
              fontSize: "1.35rem",
              letterSpacing: "0.5px"
            }}
          >
            <Flower style={{ color: "var(--primary)", width: "26px", height: "26px" }} fill="var(--primary)" />
            <span style={{ fontFamily: "var(--font-serif)" }}>BloomCraft</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "36px"
            }}
            className="desktop-menu"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                style={{
                  color: isActive(link.path) ? "var(--primary)" : "var(--text-medium)",
                  fontWeight: isActive(link.path) ? "600" : "500",
                  fontSize: "1rem",
                  transition: "var(--transition-quick)",
                  position: "relative",
                  paddingBottom: "4px"
                }}
              >
                {link.name}
                {isActive(link.path) && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "var(--primary)",
                      borderRadius: "2px"
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px"
            }}
          >
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-dark)",
                padding: "8px"
              }}
              aria-label="Open Cart"
            >
              <ShoppingBag style={{ width: "24px", height: "24px" }} />
              {getCartCount() > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    backgroundColor: "var(--primary)",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <Link href="/designer" className="btn-primary desktop-cta" style={{ display: "none", padding: "10px 20px", fontSize: "0.95rem" }}>
              Start Designing
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: "flex",
                color: "var(--text-dark)",
                padding: "8px"
              }}
            >
              {isMobileMenuOpen ? <X style={{ width: "24px", height: "24px" }} /> : <Menu style={{ width: "24px", height: "24px" }} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            width: "100%",
            height: "calc(100vh - 80px)",
            backgroundColor: "var(--bg-primary)",
            zIndex: 45,
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            borderTop: "1px solid var(--border-color)",
            animation: "fadeIn 0.3s ease"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={handleLinkClick}
              style={{
                color: isActive(link.path) ? "var(--primary)" : "var(--text-dark)",
                fontWeight: "600",
                fontSize: "1.25rem"
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/designer"
            onClick={handleLinkClick}
            className="btn-primary"
            style={{
              justifyContent: "center",
              marginTop: "20px",
              width: "100%"
            }}
          >
            Start Designing
          </Link>
        </div>
      )}

      {/* Custom inline styling to handle responsiveness clean and simple */}
      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
