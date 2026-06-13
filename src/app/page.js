"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, ShieldCheck, Heart, RotateCcw } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hoodie");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 16, y: y * -16 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const categories = [
    {
      id: "hoodie",
      label: "🌸 Floral Hoodies",
      title: "Floral Hoodie",
      subtitle: "Base + name + premium floral",
      price: "₹1,449",
      image: "/floral_hoodie.png",
      desc: "Soft custom-embroidered hoodies featuring handmade pipe cleaner flower patches, customized text, and metallic accents."
    },
    {
      id: "keychain",
      label: "🔑 Resin Keychains",
      title: "Resin Keychain",
      subtitle: "Base initial + gold flakes + mini daisies",
      price: "₹549",
      image: "/flower_lamp.png",
      desc: "Alphabet resin charms filled with real baby's breath, mini daisies, glitter dust, and premium lobster-clasp hardware."
    },
    {
      id: "phonecase",
      label: "📱 Phone Cases",
      title: "Pressed Flower Case",
      subtitle: "Clear case + mixed pastel florals + custom text",
      price: "₹849",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop",
      desc: "Shockproof crystal clear cases decorated with authentic dried flowers embedded in a glass-like durable resin finish."
    },
    {
      id: "frame",
      label: "🖼️ Resin Frames",
      title: "Resin Frame",
      subtitle: "Classic 5x7 + wildflowers + quote print",
      price: "₹1,549",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
      desc: "An elegant freestanding resin frame preserving beautiful wildflower layouts and personalized quotes or dates."
    },
    {
      id: "bouquet",
      label: "💐 Bouquets",
      title: "Handmade Bouquet",
      subtitle: "Deluxe size + fairy lights + custom tag",
      price: "₹1,399",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop",
      desc: "Forever bouquets made from high-quality pipe cleaners, hand-wrapped in thick craft paper with interwoven fairy lights."
    }
  ];

  const activeData = categories.find((cat) => cat.id === activeTab);

  return (
    <div style={{ minHeight: "100%", width: "100%", overflowX: "hidden" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "60px 0 100px 0",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          className="container hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center"
          }}
        >
          {/* Hero Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }} className="animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  width: "24px",
                  height: "1px",
                  backgroundColor: "var(--primary)",
                  display: "inline-block"
                }}
              />
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  color: "var(--primary)",
                  letterSpacing: "2px",
                  textTransform: "uppercase"
                }}
              >
                Trending Handmade Gifts 🔥
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(3rem, 6vw, 4.8rem)",
                fontWeight: 700,
                color: "var(--text-dark)",
                lineHeight: "1.05",
                fontFamily: "var(--font-serif)"
              }}
            >
              <span className="slide-up-word" style={{ animationDelay: "0.1s", display: "inline-block" }}>Design It.</span>
              <br />
              <span className="slide-up-word-primary" style={{ animationDelay: "0.25s", display: "inline-block", color: "var(--primary)" }}>Preview It.</span>
              <br />
              <span className="slide-up-word" style={{ animationDelay: "0.4s", display: "inline-block" }}>Gift It.</span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-medium)",
                lineHeight: "1.6",
                maxWidth: "520px"
              }}
            >
              Pipe cleaner floral hoodies, resin keychains, custom phone cases, pressed flower frames — all fully customizable with live 3D preview and auto pricing.
            </p>

            {/* Pill Category Switcher */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                margin: "8px 0"
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    backgroundColor: activeTab === cat.id ? "var(--primary-light)" : "white",
                    color: activeTab === cat.id ? "var(--primary)" : "var(--text-medium)",
                    border: `1px solid ${activeTab === cat.id ? "var(--primary)" : "var(--border-color)"}`,
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "8px" }}>
              <Link href={`/designer?product=${activeData.id}`} className="btn-primary" style={{ padding: "14px 32px" }}>
                Start Designing <ArrowRight style={{ width: "18px", height: "18px" }} />
              </Link>
              <Link href="/shop" className="btn-secondary" style={{ padding: "14px 32px" }}>
                Browse Shop
              </Link>
            </div>

            {/* Bottom Row Highlights */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--text-medium)", fontWeight: "600" }}>
                <span style={{ fontSize: "1.1rem" }}>💰</span> Auto Pricing
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", color: "var(--text-medium)", fontWeight: "600" }}>
                <span style={{ fontSize: "1.1rem" }}>📦</span> Pan-India Delivery
              </div>
            </div>
          </div>

          {/* Hero Right / Showcase Gallery */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              height: "550px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
            className="hero-images animate-fade-in"
          >
            {/* Soft decorative background circles */}
            <div
              style={{
                position: "absolute",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "rgba(214, 123, 136, 0.08)",
                filter: "blur(40px)",
                top: "40px",
                right: "40px",
                zIndex: 0,
                transform: `rotateY(${tilt.x * 0.4}deg) rotateX(${tilt.y * 0.4}deg) translateZ(-20px)`,
                transition: isHovered ? "none" : "transform 0.5s ease"
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: "rgba(229, 142, 151, 0.06)",
                filter: "blur(30px)",
                bottom: "60px",
                left: "20px",
                zIndex: 0,
                transform: `rotateY(${tilt.x * 0.3}deg) rotateX(${tilt.y * 0.3}deg) translateZ(-30px)`,
                transition: isHovered ? "none" : "transform 0.5s ease"
              }}
            />

            {/* Main Product Showcase Card (Top Right) */}
            <div
              className="float-slow"
              style={{
                position: "absolute",
                top: "30px",
                right: "20px",
                width: "320px",
                height: "380px",
                zIndex: 1,
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(30px)`,
                transformStyle: "preserve-3d",
                transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid rgba(214, 123, 136, 0.1)",
                  backgroundColor: "white"
                }}
              >
                <img
                  key={activeTab}
                  src={activeData.image}
                  alt={activeData.title}
                  className="image-enter"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>

            {/* Secondary Product Showcase Card (Bottom Left, overlapping) */}
            <div
              className="float-medium"
              style={{
                position: "absolute",
                bottom: "40px",
                left: "20px",
                width: "220px",
                height: "240px",
                zIndex: 2,
                transform: `rotateY(${tilt.x * 1.3}deg) rotateX(${tilt.y * 1.3}deg) translateZ(60px)`,
                transformStyle: "preserve-3d",
                transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  border: "6px solid #FFFFFF",
                  backgroundColor: "white"
                }}
              >
                <img
                  src={
                    activeTab === "keychain"
                      ? "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop" // Bouquet image
                      : "/flower_lamp.png" // Keychain image
                  }
                  alt="Secondary Featured Product"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>

            {/* Live Pricing Tooltip Badge (Overlapping both in center-left) */}
            <div
              className="float-fast"
              style={{
                position: "absolute",
                top: "180px",
                left: "40px",
                zIndex: 3,
                transform: `rotateY(${tilt.x * 1.6}deg) rotateX(${tilt.y * 1.6}deg) translateZ(95px)`,
                transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--border-color)",
                  minWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-medium)" }}>
                  <span>🌸</span>
                  <span style={{ fontWeight: "600" }}>{activeData.title} — Live price</span>
                </div>
                <span style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--text-dark)", fontFamily: "var(--font-serif)", marginTop: "2px" }}>
                  {activeData.price}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600" }}>
                  {activeData.subtitle} ✨
                </span>
              </div>
            </div>

            {/* Sub-badge: Trending this week Resin Keychains (Bottom Right) */}
            <div
              className="float-slow"
              style={{
                position: "absolute",
                bottom: "80px",
                right: "10px",
                zIndex: 3,
                transform: `rotateY(${tilt.x * 1.4}deg) rotateX(${tilt.y * 1.4}deg) translateZ(80px)`,
                transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--primary-light)",
                  padding: "12px 20px",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid rgba(214, 123, 136, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <Flame style={{ color: "var(--primary)", width: "20px", height: "20px" }} fill="var(--primary)" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "700" }}>Trending this week</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)" }}>Floral hoodie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section
        style={{
          padding: "80px 0",
          backgroundColor: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)"
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "56px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Easy Three Step Process
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "700", fontFamily: "var(--font-serif)" }}>Creating Your Eternal Gift</h2>
            <div style={{ width: "60px", height: "3px", backgroundColor: "var(--primary)", borderRadius: "2px", marginTop: "4px" }}></div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px"
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px 32px",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  fontSize: "1.2rem",
                  fontWeight: "700"
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>Choose Your Base</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-medium)", lineHeight: "1.6" }}>
                Select from premium hoodies, initial-cut keychains, shockproof phone cases, or display frames.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px 32px",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  fontSize: "1.2rem",
                  fontWeight: "700"
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>Design & Preview Live</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-medium)", lineHeight: "1.6" }}>
                Type names, select handpicked dried flower arrangements, add gold flakes, and watch your price update in real-time.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                backgroundColor: "white",
                padding: "40px 32px",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)",
                  fontSize: "1.2rem",
                  fontWeight: "700"
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>Handcrafted & Shipped</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-medium)", lineHeight: "1.6" }}>
                Our local artisans construct your customized piece with high-quality resin and flowers, package it with care, and ship it to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px"
            }}
          >
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--primary)", padding: "4px" }}>
                <ShieldCheck style={{ width: "32px", height: "32px" }} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px" }}>Premium Materials</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: "1.5" }}>
                  We source crystal-clear UV-resistant resin, organic real dried flowers, and thick comfy cotton hoodies.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--primary)", padding: "4px" }}>
                <Heart style={{ width: "32px", height: "32px" }} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px" }}>100% Hand-Assembled</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: "1.5" }}>
                  Each item is custom made by dedicated artisans. No mass factory processing.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--primary)", padding: "4px" }}>
                <RotateCcw style={{ width: "32px", height: "32px" }} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px" }}>Everlasting Durability</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: "1.5" }}>
                  Resin encapsulates details forever. Our pipe cleaner flowers never wither.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manage Cookies Widget (Matching screenshot) */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          backgroundColor: "#1C1917",
          color: "white",
          padding: "12px 20px",
          borderRadius: "var(--radius-full)",
          fontSize: "0.85rem",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
        onClick={() => alert("Cookie settings panel coming soon!")}
      >
        Manage cookies or opt out
      </div>

      {/* Floating Support Question Mark Widget (Matching screenshot) */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "#1C1917",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "1.2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          zIndex: 40
        }}
        onClick={() => alert("How can we help you? Support chat coming soon!")}
        title="Need Help?"
      >
        ?
      </div>

      <style jsx global>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
            gap: 64px !important;
          }
        }
      `}</style>
    </div>
  );
}
