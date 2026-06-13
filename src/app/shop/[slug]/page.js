"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products as staticProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft, ArrowRight, Sparkles, ShoppingCart,
  Check, Star, Shield, RefreshCw, Truck, Heart
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function ProductDetail({ params }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Option selections
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [customText, setCustomText] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (res.ok) {
          const data = await res.json();
          const found = data.find((p) => p.slug === slug || p.id === slug);
          if (found) { initProduct(found); return; }
        }
      } catch (_) {}
      // fallback to static
      const found = staticProducts.find((p) => p.slug === slug || p.id === slug);
      if (found) initProduct(found);
      else router.push("/shop");
    }
    loadProduct();
  }, [slug]);

  function initProduct(p) {
    setProduct(p);
    const opts = p.options || {};
    if (opts.colors?.length) setSelectedColor(opts.colors[0]);
    if (opts.sizes?.length) setSelectedSize(opts.sizes[0]);
    if (opts.shapes?.length) setSelectedShape(opts.shapes[0]);
    if (opts.models?.length) setSelectedModel(opts.models[0]);
    if (opts.flowers?.length) setSelectedFlower(opts.flowers[0]);
    if (opts.palettes?.length) setSelectedPalette(opts.palettes[0]);
    if (opts.backgrounds?.length) setSelectedBackground(opts.backgrounds[0]);
    setSelectedAddOns((opts.addOns || []).filter((a) => a.checkedByDefault));
    setLoading(false);
  }

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.id === addOn.id) ? prev.filter((a) => a.id !== addOn.id) : [...prev, addOn]
    );
  };

  const computedPrice = () => {
    if (!product) return 0;
    let price = product.basePrice;
    [selectedColor, selectedSize, selectedShape, selectedModel, selectedFlower, selectedPalette, selectedBackground]
      .forEach((s) => { if (s?.price) price += s.price; });
    selectedAddOns.forEach((a) => { price += a.price; });
    if (product.options?.customText?.enabled && customText) price += product.options.customText.basePrice;
    return price;
  };

  const handleAddToCart = () => {
    if (!product) return;
    const selections = {
      ...(selectedColor && { color: selectedColor }),
      ...(selectedSize && { size: selectedSize }),
      ...(selectedShape && { shape: selectedShape }),
      ...(selectedModel && { model: selectedModel }),
      ...(selectedFlower && { flower: selectedFlower }),
      ...(selectedPalette && { palette: selectedPalette }),
      ...(selectedBackground && { background: selectedBackground }),
      addOns: selectedAddOns,
      ...(product.options?.customText?.enabled && { customText }),
    };
    addToCart(product, selections, computedPrice(), false);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div className="spinner" />
          <p style={{ color: "var(--text-medium)", fontSize: "0.95rem" }}>Loading product…</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const opts = product.options || {};

  const features = [
    { icon: <Shield size={18} />, label: "Handcrafted with care" },
    { icon: <Truck size={18} />, label: "Free shipping above ₹999" },
    { icon: <RefreshCw size={18} />, label: "Easy 7-day returns" },
    { icon: <Heart size={18} />, label: "Made with love in India" },
  ];

  return (
    <div style={{ padding: "40px 0 80px", minHeight: "100vh" }}>
      <div className="container">

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", fontSize: "0.85rem", color: "var(--text-light)" }}>
          <Link href="/shop" style={{ color: "var(--primary)", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
            <ArrowLeft size={14} /> Shop
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-dark)", fontWeight: "500" }}>{product.name}</span>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>

          {/* ── Left: Image ── */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                backgroundColor: "var(--bg-secondary)",
                aspectRatio: "1 / 1",
                position: "relative",
                boxShadow: "var(--shadow-md)",
              }}
            >
              {!imgLoaded && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-secondary)" }}>
                  <div className="spinner" />
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              />

              {/* Live Custom Text Preview Overlay */}
              {product.options?.customText?.enabled && customText && (
                <div style={{
                  position: "absolute",
                  top: product.id === "floral-hoodie" ? "44%" : "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10,
                  fontSize: product.id === "floral-hoodie" ? "2.2rem" : "1.8rem",
                  fontFamily: "var(--font-serif), serif",
                  color: product.id === "floral-hoodie" ? "#c95d6f" : "#333",
                  fontWeight: "800",
                  letterSpacing: "2px",
                  textShadow: "0px 0px 8px rgba(255,255,255,0.8), 0px 0px 4px rgba(255,255,255,0.9)",
                  textAlign: "center",
                  width: "75%",
                  wordWrap: "break-word",
                  pointerEvents: "none",
                  backgroundColor: product.id === "floral-hoodie" ? "rgba(255, 253, 248, 0.75)" : "transparent",
                  padding: product.id === "floral-hoodie" ? "6px 16px" : "0",
                  borderRadius: "12px",
                  backdropFilter: product.id === "floral-hoodie" ? "blur(3px)" : "none",
                  boxShadow: product.id === "floral-hoodie" ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.3s ease"
                }}>
                  {customText.toUpperCase()}
                </div>
              )}
              {product.trending && (
                <span style={{
                  position: "absolute", top: "20px", left: "20px",
                  backgroundColor: "var(--primary-light)", color: "var(--primary)",
                  padding: "8px 16px", borderRadius: "var(--radius-full)",
                  fontSize: "0.78rem", fontWeight: "700",
                  display: "flex", alignItems: "center", gap: "6px",
                  border: "1px solid rgba(214,123,136,0.25)",
                  backdropFilter: "blur(8px)"
                }}>
                  <Sparkles size={13} /> Trending This Week
                </span>
              )}
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px", borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)", backgroundColor: "white",
                  fontSize: "0.8rem", color: "var(--text-medium)", fontWeight: "500"
                }}>
                  <span style={{ color: "var(--primary)" }}>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Details & Options ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Name + Price */}
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
                {product.categories.map((c) => (
                  <span key={c} style={{
                    fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase",
                    letterSpacing: "1px", color: "var(--primary)",
                    backgroundColor: "var(--primary-light)", padding: "4px 10px",
                    borderRadius: "var(--radius-full)"
                  }}>{c}</span>
                ))}
              </div>
              <h1 style={{ fontSize: "2.2rem", fontWeight: "800", fontFamily: "var(--font-serif)", lineHeight: 1.15, marginBottom: "10px" }}>
                {product.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={15} fill="var(--primary)" color="var(--primary)" />)}
                <span style={{ fontSize: "0.82rem", color: "var(--text-medium)", marginLeft: "4px" }}>4.9 · Handcrafted</span>
              </div>
              <p style={{ color: "var(--text-medium)", lineHeight: "1.7", fontSize: "0.97rem" }}>{product.description}</p>
            </div>

            {/* Live Price */}
            <div style={{
              padding: "20px", borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--primary-light) 0%, #fff5f7 100%)",
              border: "1px solid rgba(214,123,136,0.2)"
            }}>
              <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                Your total
              </div>
              <div style={{ fontSize: "2.4rem", fontWeight: "800", fontFamily: "var(--font-serif)", color: "var(--text-dark)", lineHeight: 1 }}>
                {formatPrice(computedPrice())}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "6px" }}>
                Base ₹{product.basePrice} · updates with your selections
              </div>
            </div>

            {/* ── Options ── */}

            {/* Colors */}
            {opts.colors?.length > 0 && (
              <OptionSection label="Color">
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {opts.colors.map((c) => (
                    <button
                      key={c.name}
                      title={c.name}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: c.value || "#eee",
                        border: selectedColor?.name === c.name ? "3px solid var(--primary)" : "3px solid transparent",
                        outline: "2px solid var(--border-color)",
                        cursor: "pointer", transition: "all 0.2s",
                        boxShadow: selectedColor?.name === c.name ? "0 0 0 2px white inset" : "none"
                      }}
                    />
                  ))}
                </div>
                {selectedColor && <SelectedLabel name={selectedColor.name} price={selectedColor.price} />}
              </OptionSection>
            )}

            {/* Sizes */}
            {opts.sizes?.length > 0 && (
              <OptionSection label="Size">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {opts.sizes.map((s) => (
                    <ChipButton key={s.name} label={s.name} price={s.price}
                      active={selectedSize?.name === s.name}
                      onClick={() => setSelectedSize(s)} />
                  ))}
                </div>
              </OptionSection>
            )}

            {/* Shapes */}
            {opts.shapes?.length > 0 && (
              <OptionSection label="Shape">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {opts.shapes.map((s) => (
                    <ChipButton key={s.name} label={s.name} price={s.price}
                      active={selectedShape?.name === s.name}
                      onClick={() => setSelectedShape(s)} />
                  ))}
                </div>
              </OptionSection>
            )}

            {/* Phone Models */}
            {opts.models?.length > 0 && (
              <OptionSection label="Phone Model">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {opts.models.map((m) => (
                    <ChipButton key={m.name} label={m.name} price={m.price}
                      active={selectedModel?.name === m.name}
                      onClick={() => setSelectedModel(m)} />
                  ))}
                </div>
              </OptionSection>
            )}

            {/* Flowers */}
            {opts.flowers?.length > 0 && (
              <OptionSection label="Flower Style">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {opts.flowers.map((f) => (
                    <ChipButton key={f.name} label={f.name} price={f.price}
                      active={selectedFlower?.name === f.name}
                      onClick={() => setSelectedFlower(f)} />
                  ))}
                </div>
              </OptionSection>
            )}

            {/* Palettes */}
            {opts.palettes?.length > 0 && (
              <OptionSection label="Color Palette">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {opts.palettes.map((p) => (
                    <ChipButton key={p.name} label={p.name} price={p.price}
                      active={selectedPalette?.name === p.name}
                      onClick={() => setSelectedPalette(p)} />
                  ))}
                </div>
              </OptionSection>
            )}

            {/* Backgrounds */}
            {opts.backgrounds?.length > 0 && (
              <OptionSection label="Background">
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {opts.backgrounds.map((b) => (
                    <button key={b.name} onClick={() => setSelectedBackground(b)} title={b.name}
                      style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: b.value || "#eee",
                        border: selectedBackground?.name === b.name ? "3px solid var(--primary)" : "3px solid transparent",
                        outline: "2px solid var(--border-color)", cursor: "pointer",
                      }} />
                  ))}
                </div>
                {selectedBackground && <SelectedLabel name={selectedBackground.name} price={selectedBackground.price} />}
              </OptionSection>
            )}

            {/* Custom Text */}
            {opts.customText?.enabled && (
              <OptionSection label={`Custom Text (+${formatPrice(opts.customText.basePrice)})`}>
                <input
                  type="text"
                  value={customText}
                  maxLength={opts.customText.maxLength}
                  placeholder={`Add your text (max ${opts.customText.maxLength} chars)`}
                  onChange={(e) => setCustomText(e.target.value)}
                  style={{
                    width: "100%", padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    fontSize: "0.92rem", fontFamily: "inherit",
                    outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                />
                <div style={{ fontSize: "0.78rem", color: "var(--text-light)", marginTop: "4px" }}>
                  {customText.length}/{opts.customText.maxLength} · Fonts: {opts.customText.fonts?.join(", ")}
                </div>
              </OptionSection>
            )}

            {/* Add-Ons */}
            {opts.addOns?.length > 0 && (
              <OptionSection label="Add-Ons">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {opts.addOns.map((addon) => {
                    const checked = selectedAddOns.find((a) => a.id === addon.id);
                    return (
                      <button key={addon.id} onClick={() => toggleAddOn(addon)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", borderRadius: "var(--radius-md)",
                          border: `1px solid ${checked ? "var(--primary)" : "var(--border-color)"}`,
                          backgroundColor: checked ? "var(--primary-light)" : "white",
                          cursor: "pointer", transition: "all 0.2s", textAlign: "left"
                        }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "20px", height: "20px", borderRadius: "4px",
                            backgroundColor: checked ? "var(--primary)" : "white",
                            border: `2px solid ${checked ? "var(--primary)" : "var(--border-color)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s", flexShrink: 0
                          }}>
                            {checked && <Check size={12} color="white" strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: "0.88rem", fontWeight: "600", color: "var(--text-dark)" }}>{addon.name}</span>
                        </div>
                        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: checked ? "var(--primary)" : "var(--text-medium)", flexShrink: 0 }}>
                          +{formatPrice(addon.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </OptionSection>
            )}

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
              <button
                onClick={handleAddToCart}
                className={addedToCart ? "" : "btn-primary"}
                style={{
                  padding: "16px", fontSize: "1rem", fontWeight: "700",
                  borderRadius: "var(--radius-md)", border: "none",
                  backgroundColor: addedToCart ? "#22c55e" : undefined,
                  color: addedToCart ? "white" : undefined,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  cursor: "pointer", transition: "all 0.3s",
                }}
              >
                {addedToCart ? <><Check size={20} /> Added to Cart!</> : <><ShoppingCart size={20} /> Add to Cart · {formatPrice(computedPrice())}</>}
              </button>

              <Link
                href={`/designer?product=${product.id}`}
                className="btn-secondary"
                style={{ padding: "14px", fontSize: "0.95rem", justifyContent: "center", borderRadius: "var(--radius-md)" }}
              >
                Customize in Designer <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
        .spinner {
          width: 36px; height: 36px;
          border: 3px solid var(--border-color);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function OptionSection({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--text-dark)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function ChipButton({ label, price, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px", borderRadius: "var(--radius-full)",
      border: `1.5px solid ${active ? "var(--primary)" : "var(--border-color)"}`,
      backgroundColor: active ? "var(--primary-light)" : "white",
      color: active ? "var(--primary)" : "var(--text-medium)",
      fontSize: "0.84rem", fontWeight: active ? "700" : "500",
      cursor: "pointer", transition: "all 0.2s",
      display: "flex", alignItems: "center", gap: "4px"
    }}>
      {label}
      {price > 0 && <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>+₹{price}</span>}
    </button>
  );
}

function SelectedLabel({ name, price }) {
  return (
    <div style={{ fontSize: "0.82rem", color: "var(--text-medium)", marginTop: "2px" }}>
      Selected: <strong style={{ color: "var(--text-dark)" }}>{name}</strong>
      {price > 0 && <span style={{ color: "var(--primary)", marginLeft: "6px" }}>+₹{price}</span>}
    </div>
  );
}
