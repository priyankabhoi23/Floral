"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Sparkles, ShoppingBag, Info, ArrowLeft, RefreshCw } from "lucide-react";

// Outer component providing the Suspense boundary
export default function DesignerPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "var(--primary)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <RefreshCw style={{ width: "32px", height: "32px", animation: "spin 1s linear infinite" }} />
          <p style={{ fontWeight: "600" }}>Loading Designer Studio...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    }>
      <DesignerContent />
    </Suspense>
  );
}

function DesignerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  // Find product from query params or default to first
  const productParam = searchParams.get("product");
  const initialProduct = products.find((p) => p.id === productParam || p.slug === productParam) || products[0];

  const [selectedProduct, setSelectedProduct] = useState(initialProduct);

  // Customization States
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState("");
  
  const [activeAddOns, setActiveAddOns] = useState([]);

  // Reset/Initialize states when product changes
  useEffect(() => {
    const p = selectedProduct;
    setSelectedColor(p.options.colors ? p.options.colors[0] : null);
    setSelectedSize(p.options.sizes ? p.options.sizes[0] : null);
    setSelectedShape(p.options.shapes ? p.options.shapes[0] : null);
    setSelectedModel(p.options.models ? p.options.models[0] : null);
    setSelectedFlower(p.options.flowers ? p.options.flowers[0] : null);
    setSelectedPalette(p.options.palettes ? p.options.palettes[0] : null);
    setSelectedBackground(p.options.backgrounds ? p.options.backgrounds[0] : null);
    
    setCustomText("");
    setSelectedFont(p.options.customText?.enabled ? p.options.customText.fonts[0] : "");

    // Load default add-ons
    const defaults = (p.options.addOns || [])
      .filter((a) => a.checkedByDefault)
      .map((a) => a.id);
    setActiveAddOns(defaults);
  }, [selectedProduct]);

  // Handle switching product base
  const handleProductChange = (productId) => {
    const target = products.find((p) => p.id === productId);
    if (target) {
      setSelectedProduct(target);
      // Update URL query param without full page reload
      router.push(`/designer?product=${target.id}`, { scroll: false });
    }
  };

  // Toggle addons
  const handleAddOnToggle = (addonId) => {
    setActiveAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate prices
  const basePrice = selectedProduct.basePrice;
  let stylingPrice = 0;
  
  if (selectedColor?.price) stylingPrice += selectedColor.price;
  if (selectedSize?.price) stylingPrice += selectedSize.price;
  if (selectedShape?.price) stylingPrice += selectedShape.price;
  if (selectedModel?.price) stylingPrice += selectedModel.price;
  if (selectedFlower?.price) stylingPrice += selectedFlower.price;
  if (selectedPalette?.price) stylingPrice += selectedPalette.price;
  if (selectedBackground?.price) stylingPrice += selectedBackground.price;

  const customTextPrice = (selectedProduct.options.customText?.enabled && customText.length > 0)
    ? selectedProduct.options.customText.basePrice
    : 0;

  const addOnsPrice = activeAddOns.reduce((total, id) => {
    const addOn = selectedProduct.options.addOns?.find((a) => a.id === id);
    return total + (addOn ? addOn.price : 0);
  }, 0);

  const totalPrice = basePrice + stylingPrice + customTextPrice + addOnsPrice;

  // Format price helper
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(price);
  };

  // Add to Bag Action
  const handleAddToBag = () => {
    const selections = {};
    if (selectedColor) selections.color = selectedColor;
    if (selectedSize) selections.size = selectedSize;
    if (selectedShape) selections.shape = selectedShape;
    if (selectedModel) selections.model = selectedModel;
    if (selectedFlower) selections.flower = selectedFlower;
    if (selectedPalette) selections.palette = selectedPalette;
    if (selectedBackground) selections.background = selectedBackground;
    
    if (selectedProduct.options.customText?.enabled && customText.trim().length > 0) {
      selections.customText = `${customText} (${selectedFont})`;
    }

    const addOnDetails = activeAddOns.map((id) =>
      selectedProduct.options.addOns.find((a) => a.id === id)
    ).filter(Boolean);
    
    if (addOnDetails.length > 0) {
      selections.addOns = addOnDetails;
    }

    addToCart(selectedProduct, selections, totalPrice, true);
  };

  // Get custom font-family styles for preview
  const getFontFamily = () => {
    if (selectedFont === "Script" || selectedFont === "Elegant Cursive" || selectedFont === "Gold Script") {
      return "Georgia, 'Playfair Display', cursive";
    }
    if (selectedFont === "Modern" || selectedFont === "Minimalist Block" || selectedFont === "Silver Modern" || selectedFont === "Modernist Sans") {
      return "system-ui, -apple-system, sans-serif";
    }
    return "var(--font-serif), serif";
  };

  return (
    <div style={{ padding: "40px 0 80px 0" }}>
      <div className="container">
        
        {/* Back link */}
        <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-medium)", fontSize: "0.9rem", marginBottom: "24px" }}>
          <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to Shop
        </Link>

        {/* Page Title */}
        <div style={{ marginBottom: "36px" }}>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "700", fontFamily: "var(--font-serif)", marginBottom: "8px" }}>The Customizer Studio</h1>
          <p style={{ color: "var(--text-medium)", fontSize: "0.95rem" }}>Design your product, watch it update in real-time, and order your custom piece.</p>
        </div>

        {/* Main Customizer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px"
          }}
          className="designer-grid"
        >
          {/* Left Panel: Preview Canvas */}
          <div
            style={{
              position: "sticky",
              top: "100px",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
            className="preview-panel"
          >
            {/* SVG Live Preview Container */}
            <div
              style={{
                width: "100%",
                height: "460px",
                backgroundColor: "white",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Product SVG Generator */}
              <div style={{ width: "80%", height: "80%", display: "flex", alignItems: "center", justifyItems: "center" }}>
                
                {/* 1. Floral Hoodie SVG */}
                {selectedProduct.id === "floral-hoodie" && (
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    {/* Hoodie background shadow */}
                    <path d="M15,80 L20,35 L30,30 L50,22 L70,30 L80,35 L85,80 L75,80 L72,50 L68,80 L32,80 L28,50 L25,80 Z" fill={selectedColor?.value || "#FFFBF2"} stroke="var(--border-color)" strokeWidth="1" />
                    {/* Hood sleeve outlines */}
                    <path d="M20,35 L12,65 L18,70 L25,48" fill={selectedColor?.value || "#FFFBF2"} stroke="var(--border-color)" strokeWidth="1" />
                    <path d="M80,35 L88,65 L82,70 L75,48" fill={selectedColor?.value || "#FFFBF2"} stroke="var(--border-color)" strokeWidth="1" />
                    {/* Hood details */}
                    <path d="M35,28 C35,16, 65,16, 65,28 Z" fill={selectedColor?.value || "#FFFBF2"} stroke="var(--border-color)" strokeWidth="1" />
                    <path d="M35,28 C45,34, 55,34, 65,28" fill="none" stroke="var(--border-color)" strokeWidth="1.5" />
                    {/* Draw drawstrings */}
                    <path d="M46,31 L46,45 C46,48 44,48 44,50" fill="none" stroke="var(--text-light)" strokeWidth="0.8" />
                    <path d="M54,31 L54,43 C54,46 56,46 56,48" fill="none" stroke="var(--text-light)" strokeWidth="0.8" />
                    
                    {/* Premium Floral patch if selected */}
                    {activeAddOns.includes("premium-floral") && (
                      <g transform="translate(50, 52)">
                        {/* Bouquet stitch details */}
                        <circle cx="-6" cy="-2" r="5" fill="#FADADD" opacity="0.9" />
                        <circle cx="6" cy="-2" r="4.5" fill="#E6E6FA" opacity="0.9" />
                        <circle cx="0" cy="4" r="5.5" fill="#FFF2EC" opacity="0.9" />
                        {/* Leaf stems */}
                        <path d="M-2,6 L-8,14" stroke="var(--primary)" strokeWidth="0.8" fill="none" />
                        <path d="M2,6 L8,14" stroke="var(--primary)" strokeWidth="0.8" fill="none" />
                        {/* Floral center dots */}
                        <circle cx="-6" cy="-2" r="1" fill="gold" />
                        <circle cx="6" cy="-2" r="0.8" fill="gold" />
                        <circle cx="0" cy="4" r="1.2" fill="gold" />
                      </g>
                    )}

                    {/* Gold Flakes effect */}
                    {activeAddOns.includes("gold-flakes") && (
                      <g fill="gold" opacity="0.8">
                        <polygon points="28,38 29,40 27,39" />
                        <polygon points="31,48 33,49 32,47" />
                        <polygon points="68,36 70,38 69,37" />
                        <polygon points="72,48 73,50 71,49" />
                        <polygon points="50,42 51,43 49,43" />
                      </g>
                    )}

                    {/* Custom Text inscription */}
                    {customText && (
                      <text
                        x="50"
                        y="66"
                        textAnchor="middle"
                        fill="var(--text-dark)"
                        fontSize="6"
                        fontWeight="600"
                        style={{ fontFamily: getFontFamily(), letterSpacing: "0.5px" }}
                      >
                        {customText}
                      </text>
                    )}
                  </svg>
                )}

                {/* 2. Resin Keychain SVG */}
                {selectedProduct.id === "resin-keychain" && (
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    {/* Metal key ring */}
                    <circle cx="50" cy="18" r="8" fill="none" stroke="#D1D5DB" strokeWidth="2.5" />
                    <circle cx="50" cy="28" r="3" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
                    <line x1="50" y1="21" x2="50" y2="35" stroke="#9CA3AF" strokeWidth="1.8" />
                    
                    {/* Resin Base Plate (depends on shape option) */}
                    {selectedShape?.name.includes("Heart") ? (
                      <path d="M50,42 C30,30, 20,50, 50,78 C80,50, 70,30, 50,42 Z" fill={selectedColor?.value || "rgba(255, 255, 255, 0.2)"} stroke="var(--border-color)" strokeWidth="1" />
                    ) : selectedShape?.name.includes("Hexagon") ? (
                      <polygon points="50,38 72,48 72,70 50,80 28,70 28,48" fill={selectedColor?.value || "rgba(255, 255, 255, 0.2)"} stroke="var(--border-color)" strokeWidth="1" />
                    ) : (
                      /* Default: Initial Letter (e.g. first character of customText, or 'A') */
                      <g>
                        <rect x="35" y="38" width="30" height="42" rx="4" fill={selectedColor?.value || "rgba(255, 255, 255, 0.2)"} stroke="var(--border-color)" strokeWidth="1" />
                        <text
                          x="50"
                          y="68"
                          textAnchor="middle"
                          fill="rgba(44, 38, 39, 0.3)"
                          fontSize="26"
                          fontWeight="800"
                          style={{ fontFamily: getFontFamily() }}
                        >
                          {customText ? customText.charAt(0).toUpperCase() : "B"}
                        </text>
                      </g>
                    )}

                    {/* Pressed Daisies */}
                    <g transform="translate(50, 58)">
                      <circle cx="0" cy="0" r="3" fill="gold" opacity="0.9" />
                      {/* Petals */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ellipse
                          key={i}
                          cx="0"
                          cy="6"
                          rx="2"
                          ry="4"
                          fill="white"
                          transform={`rotate(${i * 45} 0 0)`}
                          opacity="0.95"
                        />
                      ))}
                      {/* Premium Mini daisies if selected */}
                      {activeAddOns.includes("mini-daisy") && (
                        <g transform="translate(-10, -8) scale(0.6)">
                          <circle cx="0" cy="0" r="3" fill="gold" />
                          {Array.from({ length: 6 }).map((_, idx) => (
                            <ellipse key={idx} cx="0" cy="5" rx="1.8" ry="3" fill="#FADADD" transform={`rotate(${idx * 60} 0 0)`} />
                          ))}
                        </g>
                      )}
                    </g>

                    {/* Gold flakes */}
                    {activeAddOns.includes("gold-flakes") && (
                      <g fill="gold" opacity="0.9">
                        <polygon points="36,44 38,45 37,43" />
                        <polygon points="62,45 64,47 63,44" />
                        <polygon points="38,72 39,74 37,73" />
                        <polygon points="60,70 62,71 61,69" />
                        <polygon points="50,46 51,47 49,47" />
                      </g>
                    )}

                    {/* Shimmer Dust */}
                    {activeAddOns.includes("pearl-dust") && (
                      <circle cx="50" cy="58" r="18" fill="url(#pearlShimmer)" opacity="0.4" pointerEvents="none" />
                    )}

                    {/* Custom Text Monogram name printed overlay */}
                    {customText && (
                      <text
                        x="50"
                        y="74"
                        textAnchor="middle"
                        fill="var(--text-dark)"
                        fontSize="5"
                        fontWeight="700"
                        style={{ fontFamily: getFontFamily(), letterSpacing: "0.2px" }}
                      >
                        {customText}
                      </text>
                    )}

                    {/* Define Shimmer Gradient */}
                    <defs>
                      <radialGradient id="pearlShimmer" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#D67B88" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}

                {/* 3. Phone Case SVG */}
                {selectedProduct.id === "phone-case" && (
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    {/* Phone outer body */}
                    <rect x="28" y="15" width="44" height="74" rx="7" fill="none" stroke="var(--text-light)" strokeWidth="1.5" />
                    {/* Inner crystal resin boundary */}
                    <rect x="29" y="16" width="42" height="72" rx="6" fill="rgba(255,255,255,0.7)" stroke="#E5E7EB" strokeWidth="0.5" />
                    {/* Camera Bumper */}
                    <rect x="32" y="19" width="12" height="12" rx="2" fill="none" stroke="var(--text-light)" strokeWidth="1.2" />
                    <circle cx="35" cy="22" r="1.5" fill="#9CA3AF" />
                    <circle cx="41" cy="22" r="1.5" fill="#9CA3AF" />
                    <circle cx="38" cy="28" r="2" fill="#9CA3AF" />

                    {/* Dried Flowers layout */}
                    <g transform="translate(50, 52)">
                      {/* Lavender stems */}
                      {selectedFlower?.name.includes("Lavender") ? (
                        <g>
                          <path d="M-6,20 L-6,-8" stroke="#8A9A86" strokeWidth="0.8" />
                          <path d="M6,20 L6,-8" stroke="#8A9A86" strokeWidth="0.8" />
                          {/* Lav lavender dots */}
                          <g fill="#9370DB" opacity="0.9">
                            <circle cx="-6" cy="-6" r="1.8" /> <circle cx="-6" cy="-2" r="1.8" /> <circle cx="-6" cy="2" r="1.8" />
                            <circle cx="6" cy="-6" r="1.8" /> <circle cx="6" cy="-2" r="1.8" /> <circle cx="6" cy="2" r="1.8" />
                          </g>
                        </g>
                      ) : selectedFlower?.name.includes("Crimson") ? (
                        <g>
                          {/* Big red roses */}
                          <circle cx="-4" cy="5" r="4.5" fill="#B22222" />
                          <circle cx="4" cy="-5" r="5" fill="#8B0000" />
                          <path d="M-8,14 L0,22" stroke="#556B2F" strokeWidth="0.7" />
                        </g>
                      ) : (
                        /* Default: Mixed Pastels */
                        <g>
                          <circle cx="-5" cy="0" r="3.5" fill="#FFF2EC" />
                          <circle cx="5" cy="2" r="3" fill="#FADADD" />
                          <circle cx="0" cy="-6" r="4" fill="#E6E6FA" />
                        </g>
                      )}
                    </g>

                    {/* Scattered gold leaf */}
                    {activeAddOns.includes("gold-flakes") && (
                      <g fill="gold" opacity="0.85">
                        <polygon points="34,36 36,37 35,35" />
                        <polygon points="62,32 63,33 62,31" />
                        <polygon points="34,70 36,71 35,69" />
                        <polygon points="64,68 65,70 63,69" />
                      </g>
                    )}

                    {/* Text monogram along bottom edge */}
                    {customText && (
                      <text
                        x="50"
                        y="80"
                        textAnchor="middle"
                        fill="var(--text-dark)"
                        fontSize="4.5"
                        fontWeight="700"
                        style={{ fontFamily: getFontFamily(), letterSpacing: "0.5px" }}
                      >
                        {customText}
                      </text>
                    )}
                  </svg>
                )}

                {/* 4. Resin Frame SVG */}
                {selectedProduct.id === "resin-frame" && (
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    {/* Wooden support border frame */}
                    <rect x="18" y="20" width="64" height="60" rx="3" fill="none" stroke="#D1B29A" strokeWidth="3" />
                    {/* Stand base underneath */}
                    <rect x="28" y="79" width="44" height="3" rx="1" fill="#A78B71" />
                    {/* Crystal Clear glass resin board */}
                    <rect x="20" y="22" width="60" height="56" fill={selectedBackground?.value || "rgba(255,255,255,0.2)"} stroke="#E5E7EB" strokeWidth="0.5" />

                    {/* Wildflowers layouts */}
                    <g transform="translate(50, 46)">
                      {activeAddOns.includes("premium-roses") ? (
                        <g>
                          {/* Crimson roses layout */}
                          <circle cx="-16" cy="12" r="5" fill="#CD5C5C" />
                          <circle cx="16" cy="12" r="5" fill="#CD5C5C" />
                          <circle cx="0" cy="14" r="6.5" fill="#D2691E" />
                          <path d="M-12,18 C-4,18, 4,18, 12,18" stroke="#8FBC8F" strokeWidth="1" fill="none" />
                        </g>
                      ) : (
                        /* Default wildflowers layout */
                        <g>
                          <circle cx="-14" cy="14" r="4.5" fill="#F4A460" />
                          <circle cx="14" cy="14" r="4.5" fill="#9370DB" />
                          <circle cx="0" cy="15" r="4" fill="#FADADD" />
                        </g>
                      )}
                    </g>

                    {/* Custom text Quote centered inside frame */}
                    {customText ? (
                      <text
                        x="50"
                        y="40"
                        textAnchor="middle"
                        fill="var(--text-dark)"
                        fontSize="4"
                        fontWeight="600"
                        style={{ fontFamily: getFontFamily() }}
                      >
                        {/* Format text to display quote */}
                        {customText.length > 25 ? `${customText.substring(0, 25)}...` : customText}
                      </text>
                    ) : (
                      <text
                        x="50"
                        y="40"
                        textAnchor="middle"
                        fill="var(--text-light)"
                        fontSize="3.5"
                        fontStyle="italic"
                      >
                        "Your custom quote preserves here"
                      </text>
                    )}

                    {/* Border styling metallic gold border */}
                    {activeAddOns.includes("gold-border") && (
                      <rect x="21" y="23" width="58" height="54" fill="none" stroke="gold" strokeWidth="0.8" opacity="0.9" />
                    )}
                  </svg>
                )}

                {/* 5. Bouquet SVG */}
                {selectedProduct.id === "bouquets" && (
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    {/* Bouquet wrapping craft paper */}
                    <path d="M35,78 L20,38 L80,38 L65,78 Z" fill="#D2B48C" stroke="#C5A07A" strokeWidth="1" />
                    <path d="M20,38 C28,34 72,34 80,38 L50,86 Z" fill="#DEB887" opacity="0.95" />
                    
                    {/* Wrapping folds */}
                    <path d="M30,55 L50,86 L70,55" fill="none" stroke="#C5A07A" strokeWidth="0.8" />
                    
                    {/* Tulip & Rose blooms */}
                    <g transform="translate(50, 32)">
                      {/* Center Tulip */}
                      <path d="M-6,0 C-12,-12 12,-12 6,0 Z" fill={selectedPalette?.name.includes("Lavender") ? "#BA55D3" : selectedPalette?.name.includes("Sunflower") ? "#FFD700" : "#FF69B4"} />
                      <circle cx="0" cy="-6" r="3" fill={selectedPalette?.name.includes("Lavender") ? "#E6E6FA" : selectedPalette?.name.includes("Sunflower") ? "#FFA500" : "#FFF0F5"} />
                      
                      {/* Left Tulip */}
                      <path d="M-18,4 C-22,-6 -4,-8 -10,6 Z" fill={selectedPalette?.name.includes("Lavender") ? "#9370DB" : selectedPalette?.name.includes("Sunflower") ? "#DAA520" : "#FFC0CB"} />
                      
                      {/* Right Tulip */}
                      <path d="M10,6 C4,-8 22,-6 18,4 Z" fill={selectedPalette?.name.includes("Lavender") ? "#8A2BE2" : selectedPalette?.name.includes("Sunflower") ? "#F0E68C" : "#DB7093"} />
                    </g>

                    {/* Ribbon bow around wrapping */}
                    <path d="M44,72 C42,66, 36,66, 44,72 Z" fill="#FFFBF2" stroke="var(--primary)" strokeWidth="0.5" />
                    <path d="M56,72 C58,66, 64,66, 56,72 Z" fill="#FFFBF2" stroke="var(--primary)" strokeWidth="0.5" />
                    <circle cx="50" cy="72" r="2" fill="var(--primary)" />
                    <path d="M48,73 L42,82" stroke="var(--primary)" strokeWidth="0.8" />
                    <path d="M52,73 L58,82" stroke="var(--primary)" strokeWidth="0.8" />

                    {/* LED Fairy lights glow circles */}
                    {activeAddOns.includes("led-fairy-lights") && (
                      <g fill="yellow" opacity="0.9">
                        <circle cx="36" cy="30" r="1.5" className="glow-light" />
                        <circle cx="48" cy="22" r="1.8" className="glow-light" />
                        <circle cx="64" cy="28" r="1.4" className="glow-light" />
                        <circle cx="50" cy="36" r="1.6" className="glow-light" />
                        <circle cx="42" cy="44" r="1.5" className="glow-light" />
                      </g>
                    )}

                    {/* Custom Text tag */}
                    {customText && (
                      <g transform="translate(62, 60) rotate(15)">
                        {/* Craft Paper Tag */}
                        <rect x="0" y="0" width="22" height="10" rx="1" fill="#E8D7C3" stroke="#A89B9D" strokeWidth="0.5" />
                        <circle cx="3" cy="5" r="0.7" fill="#888" />
                        <text x="12" y="6.5" textAnchor="middle" fill="#555" fontSize="2.8" fontWeight="bold">
                          {customText.length > 8 ? `${customText.substring(0, 7)}.` : customText}
                        </text>
                      </g>
                    )}
                  </svg>
                )}

              </div>
            </div>

            {/* Info badge */}
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start"
              }}
            >
              <Info style={{ width: "20px", height: "20px", color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
              <p style={{ fontSize: "0.8rem", color: "var(--text-medium)", lineHeight: "1.4" }}>
                This is a live visual simulation. Standard processing time for custom resin and hand-stitched crochet products is 3-5 business days.
              </p>
            </div>
          </div>

          {/* Right Panel: Controls & Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }} className="controls-panel">
            {/* Step 1: Base Selection */}
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", justifyItems: "center", width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", fontSize: "0.8rem", fontWeight: "bold", justifyContent: "center" }}>1</span>
                Choose Base Product
              </h3>
              
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "10px"
                }}
              >
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleProductChange(p.id)}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-md)",
                      border: `2px solid ${selectedProduct.id === p.id ? "var(--primary)" : "var(--border-color)"}`,
                      backgroundColor: "white",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      textAlign: "center",
                      boxShadow: "var(--shadow-sm)",
                      color: selectedProduct.id === p.id ? "var(--primary)" : "var(--text-medium)",
                      transition: "var(--transition-quick)"
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Product Specific Options */}
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", justifyItems: "center", width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", fontSize: "0.8rem", fontWeight: "bold", justifyContent: "center" }}>2</span>
                Choose Styling Options
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "white", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                {/* 2.1 Colors Option */}
                {selectedProduct.options.colors && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Base Color: <strong style={{ color: "var(--text-dark)" }}>{selectedColor?.name}</strong>
                    </span>
                    <div style={{ display: "flex", gap: "12px" }}>
                      {selectedProduct.options.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: c.value,
                            border: `2px solid ${selectedColor?.name === c.name ? "var(--primary)" : "transparent"}`,
                            boxShadow: "0 0 0 2px #fff inset, var(--shadow-sm)",
                            position: "relative"
                          }}
                          title={`${c.name} (+${formatPrice(c.price)})`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 2.2 Shapes (Keychains) */}
                {selectedProduct.options.shapes && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Keychain Shape
                    </span>
                    <select
                      value={selectedShape?.name || ""}
                      onChange={(e) => setSelectedShape(selectedProduct.options.shapes.find(s => s.name === e.target.value))}
                    >
                      {selectedProduct.options.shapes.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} {s.price > 0 ? `(+${formatPrice(s.price)})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 2.3 Sizes (Hoodie) */}
                {selectedProduct.options.sizes && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Hoodie Size
                    </span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {selectedProduct.options.sizes.map((s) => (
                        <button
                          key={s.name}
                          onClick={() => setSelectedSize(s)}
                          style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "var(--radius-sm)",
                            border: `1px solid ${selectedSize?.name === s.name ? "var(--primary)" : "var(--border-color)"}`,
                            backgroundColor: selectedSize?.name === s.name ? "var(--primary-light)" : "white",
                            color: selectedSize?.name === s.name ? "var(--primary)" : "var(--text-dark)",
                            fontWeight: "600",
                            fontSize: "0.88rem"
                          }}
                        >
                          {s.name} {s.price > 0 ? `(+${s.price})` : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2.4 Phone Models */}
                {selectedProduct.options.models && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Phone Model
                    </span>
                    <select
                      value={selectedModel?.name || ""}
                      onChange={(e) => setSelectedModel(selectedProduct.options.models.find(m => m.name === e.target.value))}
                    >
                      {selectedProduct.options.models.map((m) => (
                        <option key={m.name} value={m.name}>
                          {m.name} {m.price > 0 ? `(+${formatPrice(m.price)})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 2.5 Flower selections */}
                {selectedProduct.options.flowers && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Flower Arrangement
                    </span>
                    <select
                      value={selectedFlower?.name || ""}
                      onChange={(e) => setSelectedFlower(selectedProduct.options.flowers.find(f => f.name === e.target.value))}
                    >
                      {selectedProduct.options.flowers.map((f) => (
                        <option key={f.name} value={f.name}>
                          {f.name} {f.price > 0 ? `(+${formatPrice(f.price)})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 2.6 Bouquet Color Palette */}
                {selectedProduct.options.palettes && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Bouquet Color Theme
                    </span>
                    <select
                      value={selectedPalette?.name || ""}
                      onChange={(e) => setSelectedPalette(selectedProduct.options.palettes.find(p => p.name === e.target.value))}
                    >
                      {selectedProduct.options.palettes.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name} {p.price > 0 ? `(+${formatPrice(p.price)})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 2.7 Resin Frame Background */}
                {selectedProduct.options.backgrounds && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Resin Frame Background
                    </span>
                    <select
                      value={selectedBackground?.name || ""}
                      onChange={(e) => setSelectedBackground(selectedProduct.options.backgrounds.find(b => b.name === e.target.value))}
                    >
                      {selectedProduct.options.backgrounds.map((b) => (
                        <option key={b.name} value={b.name}>
                          {b.name} {b.price > 0 ? `(+${formatPrice(b.price)})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Custom Inscriptions */}
            {selectedProduct.options.customText?.enabled && (
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyItems: "center", width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", fontSize: "0.8rem", fontWeight: "bold", justifyContent: "center" }}>3</span>
                  Add Personal Inscription
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "white", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor="custom-inscription" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-medium)" }}>
                      Text / Monogram <span style={{ color: "var(--text-light)" }}>({customText.length}/{selectedProduct.options.customText.maxLength} chars)</span>
                    </label>
                    <input
                      id="custom-inscription"
                      type="text"
                      placeholder="Type your custom name, initials or quote..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.substring(0, selectedProduct.options.customText.maxLength))}
                      style={{ fontSize: "0.9rem" }}
                    />
                  </div>

                  {customText.trim().length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor="font-family" style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-medium)" }}>
                        Lettering Font Style
                      </label>
                      <select
                        id="font-family"
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                        style={{ fontSize: "0.9rem" }}
                      >
                        {selectedProduct.options.customText.fonts.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      <p style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "500", marginTop: "2px" }}>
                        Inscription Fee: +{formatPrice(selectedProduct.options.customText.basePrice)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Embellishments / Addons */}
            {selectedProduct.options.addOns && selectedProduct.options.addOns.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", justifyItems: "center", width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary)", fontSize: "0.8rem", fontWeight: "bold", justifyContent: "center" }}>4</span>
                  Select Hand-Applied Embellishments
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "white", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                  {selectedProduct.options.addOns.map((a) => (
                    <label
                      key={a.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "0.9rem",
                        color: "var(--text-dark)",
                        cursor: "pointer",
                        padding: "4px 0"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={activeAddOns.includes(a.id)}
                        onChange={() => handleAddOnToggle(a.id)}
                        style={{
                          width: "18px",
                          height: "18px",
                          accentColor: "var(--primary)",
                          cursor: "pointer"
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <span>{a.name}</span>
                        <span style={{ fontWeight: "600", color: "var(--text-medium)" }}>+{formatPrice(a.price)}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Summary & Add to Bag */}
            <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "var(--radius-lg)", border: "2px solid var(--primary)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "600", fontFamily: "var(--font-serif)", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
                Summary & Pricing
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem", color: "var(--text-medium)", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Base product price</span>
                  <span>{formatPrice(basePrice)}</span>
                </div>

                {stylingPrice > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Selected styling options</span>
                    <span>+{formatPrice(stylingPrice)}</span>
                  </div>
                )}

                {customTextPrice > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Inscription fee</span>
                    <span>+{formatPrice(customTextPrice)}</span>
                  </div>
                )}

                {addOnsPrice > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Embellishments</span>
                    <span>+{formatPrice(addOnsPrice)}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-color)", paddingTop: "14px", marginTop: "4px", fontSize: "1.15rem", fontWeight: "700", color: "var(--text-dark)" }}>
                  <span>Customized Total</span>
                  <span style={{ color: "var(--primary)", fontFamily: "var(--font-serif)" }}>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                onClick={handleAddToBag}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                  fontSize: "1.05rem"
                }}
              >
                <ShoppingBag style={{ width: "20px", height: "20px" }} /> Add Customized to Bag
              </button>
            </div>

          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 1px yellow); }
          50% { opacity: 1; filter: drop-shadow(0 0 4px gold); }
        }
        .glow-light {
          animation: glow 1.5s infinite ease-in-out;
        }
        .glow-light:nth-child(even) {
          animation-delay: 0.5s;
        }
        .glow-light:nth-child(3n) {
          animation-delay: 1s;
        }

        @media (min-width: 992px) {
          .designer-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </div>
  );
}
