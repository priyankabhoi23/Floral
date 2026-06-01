"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Sparkles, SlidersHorizontal, ArrowRight, ShoppingCart } from "lucide-react";

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filters categories based on products metadata
  const filters = [
    { id: "all", name: "All Collections" },
    { id: "handmade", name: "Yarn & Knitwear" },
    { id: "resin", name: "Resin Art" },
    { id: "accessories", name: "Accessories" }
  ];

  // Filtering Logic
  const filteredProducts = selectedFilter === "all"
    ? products
    : products.filter(product => product.categories.includes(selectedFilter));

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.basePrice - b.basePrice;
    if (sortBy === "price-high") return b.basePrice - a.basePrice;
    return 0; // default order
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleQuickAdd = (product) => {
    // Generate default selections based on product options schema
    const defaultSelections = {};
    if (product.options.colors) defaultSelections.color = product.options.colors[0];
    if (product.options.sizes) defaultSelections.size = product.options.sizes[0];
    if (product.options.shapes) defaultSelections.shape = product.options.shapes[0];
    if (product.options.models) defaultSelections.model = product.options.models[0];
    if (product.options.flowers) defaultSelections.flower = product.options.flowers[0];
    if (product.options.palettes) defaultSelections.palette = product.options.palettes[0];
    if (product.options.backgrounds) defaultSelections.background = product.options.backgrounds[0];
    
    // Add default custom text empty
    if (product.options.customText?.enabled) {
      defaultSelections.customText = "";
    }

    // Default addons
    const defaultAddOns = (product.options.addOns || [])
      .filter(addon => addon.checkedByDefault);
    defaultSelections.addOns = defaultAddOns;

    // Calculate final unit price
    let finalPrice = product.basePrice;
    Object.values(defaultSelections).forEach(val => {
      if (val && typeof val === "object" && val.price) {
        finalPrice += val.price;
      }
    });
    defaultAddOns.forEach(addon => {
      finalPrice += addon.price;
    });

    addToCart(product, defaultSelections, finalPrice, false);
  };

  return (
    <div style={{ padding: "40px 0 80px 0" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "48px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--primary)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            BloomCraft Catalog
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "700", fontFamily: "var(--font-serif)" }}>Choose Your Canvas</h1>
          <p style={{ color: "var(--text-medium)", fontSize: "1.05rem", maxWidth: "600px", lineHeight: "1.6" }}>
            Select a premium base below to start customizing with real-time preview, personalized inscriptions, and handpicked embellishments.
          </p>
          <div style={{ width: "80px", height: "3px", backgroundColor: "var(--primary)", borderRadius: "2px", marginTop: "8px" }}></div>
        </div>

        {/* Filter and Sort Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "24px",
            marginBottom: "32px"
          }}
        >
          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  backgroundColor: selectedFilter === f.id ? "var(--primary)" : "white",
                  color: selectedFilter === f.id ? "white" : "var(--text-medium)",
                  border: `1px solid ${selectedFilter === f.id ? "var(--primary)" : "var(--border-color)"}`,
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <SlidersHorizontal style={{ width: "16px", height: "16px", color: "var(--text-medium)" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 32px 8px 16px",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-sm)",
                backgroundColor: "white",
                cursor: "pointer"
              }}
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px"
          }}
        >
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "white",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                transition: "var(--transition-smooth)",
                position: "relative"
              }}
              className="shop-card"
            >
              {/* Image Container */}
              <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "var(--transition-smooth)"
                  }}
                  className="card-img"
                />
                
                {product.trending && (
                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      border: "1px solid rgba(214, 123, 136, 0.2)"
                    }}
                  >
                    <Sparkles style={{ width: "12px", height: "12px" }} /> Trending
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700" }}>{product.name}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-medium)", lineHeight: "1.5", flex: 1 }}>
                  {product.description}
                </p>

                {/* Pricing info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "8px" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: "600", textTransform: "uppercase" }}>
                    Bases start at
                  </span>
                  <span style={{ fontSize: "1.45rem", fontWeight: "700", color: "var(--text-dark)", fontFamily: "var(--font-serif)" }}>
                    {formatPrice(product.basePrice)}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "10px", marginTop: "12px" }}>
                  <Link
                    href={`/designer?product=${product.id}`}
                    className="btn-primary"
                    style={{
                      justifyContent: "center",
                      padding: "10px 16px",
                      fontSize: "0.88rem",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Customize Base <ArrowRight style={{ width: "16px", height: "16px" }} />
                  </Link>

                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="btn-secondary"
                    style={{
                      justifyContent: "center",
                      padding: "10px 16px",
                      fontSize: "0.88rem",
                      borderColor: "var(--text-light)",
                      color: "var(--text-medium)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.color = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--text-light)";
                      e.currentTarget.style.color = "var(--text-medium)";
                    }}
                  >
                    <ShoppingCart style={{ width: "16px", height: "16px" }} /> Add Std.
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .shop-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
        }
        .shop-card:hover .card-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
