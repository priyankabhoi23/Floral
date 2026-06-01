"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, ShieldCheck, Heart, RotateCcw } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hoodie");

  const categories = [
    {
      id: "hoodie",
      label: "🌸 Floral Hoodies",
      title: "Floral Hoodie",
      subtitle: "Base + name + premium floral",
      price: "₹1,449",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
      desc: "Soft custom-embroidered hoodies featuring handmade pipe cleaner flower patches, customized text, and metallic accents."
    },
    {
      id: "keychain",
      label: "🔑 Resin Keychains",
      title: "Resin Keychain",
      subtitle: "Base initial + gold flakes + mini daisies",
      price: "₹549",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop",
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
              Design It.
              <br />
              <span style={{ color: "var(--primary)" }}>Preview It.</span>
              <br />
              Gift It.
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
                Browse Catalog
              </Link>
            </div>
          </div>

          {/* Hero Right / Showcase Gallery */}
          <div
            style={{
              position: "relative",
              height: "550px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            className="hero-images animate-fade-in"
          >
            {/* Main Product Showcase Card */}
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "440px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
                backgroundColor: "white",
                border: "1px solid var(--border-color)",
                position: "relative",
                transition: "all 0.5s ease"
              }}
            >
              <img
                src={activeData.image}
                alt={activeData.title}
                style={{
                  width: "100%",
                  height: "65%",
                  objectFit: "cover"
                }}
              />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    textTransform: "uppercase"
                  }}
                >
                  Customizable Option
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>{activeData.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-medium)", lineHeight: "1.4" }}>
                  {activeData.desc}
                </p>
              </div>
            </div>

            {/* Live Pricing Tooltip Badge (Matching screenshot) */}
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "-20px",
                backgroundColor: "white",
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--border-color)",
                maxWidth: "240px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                zIndex: 10
              }}
              className="pulse-slow"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-medium)" }}>
                <span>🌸</span>
                <span>{activeData.title} — Live price</span>
              </div>
              <span style={{ fontSize: "1.6rem", fontWeight: "700", color: "var(--text-dark)", fontFamily: "var(--font-serif)" }}>
                {activeData.price}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--primary)", fontWeight: "600" }}>
                {activeData.subtitle} ✨
              </span>
            </div>

            {/* Sub-badge: Trending this week Resin Keychains (Matching screenshot) */}
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "-20px",
                backgroundColor: "var(--primary-light)",
                padding: "12px 20px",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-md)",
                border: "1px solid rgba(214, 123, 136, 0.2)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <Flame style={{ color: "var(--primary)", width: "20px", height: "20px" }} fill="var(--primary)" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "700" }}>Trending this week</span>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)" }}>Resin Keychains</span>
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
