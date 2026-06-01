"use client";

import React, { useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartSubtotal
  } = useCart();

  const drawerRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  // Format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(44, 38, 39, 0.4)",
        backdropFilter: "blur(4px)",
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.2s ease"
      }}
      onClick={() => setIsCartOpen(false)}
    >
      {/* Drawer Body */}
      <div
        ref={drawerRef}
        style={{
          width: "100%",
          maxWidth: "450px",
          height: "100%",
          backgroundColor: "white",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--border-color)",
            paddingBottom: "16px",
            marginBottom: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShoppingBag style={{ color: "var(--primary)", width: "22px", height: "22px" }} />
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", fontFamily: "var(--font-serif)" }}>Your Craft Bag</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: "4px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-medium)"
            }}
            aria-label="Close cart"
          >
            <X style={{ width: "20px", height: "20px" }} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", paddingRight: "4px" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60%",
                gap: "16px",
                color: "var(--text-medium)",
                textAlign: "center"
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary)"
                }}
              >
                <ShoppingBag style={{ width: "32px", height: "32px" }} />
              </div>
              <div>
                <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "var(--text-dark)" }}>Your bag is empty</p>
                <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Start designing custom gifts to fill it up!</p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  window.location.href = "/designer";
                }}
                className="btn-primary"
                style={{ marginTop: "12px", padding: "10px 20px", fontSize: "0.9rem" }}
              >
                Start Customizing
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  position: "relative"
                }}
              >
                {/* Details */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: "var(--primary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    {item.isCustomized ? "Custom Made" : "Standard Model"}
                  </span>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-dark)" }}>{item.name}</h3>
                  
                  {/* Custom Selections list */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", margin: "4px 0" }}>
                    {Object.entries(item.selections).map(([key, val]) => {
                      if (!val) return null;
                      let displayVal = "";
                      
                      if (typeof val === "object" && val.name) {
                        displayVal = val.name;
                      } else if (Array.isArray(val)) {
                        displayVal = val.map((v) => v.name).join(", ");
                      } else {
                        displayVal = String(val);
                      }

                      if (!displayVal) return null;

                      // Humanize keys
                      const keyLabel = key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase());

                      return (
                        <span key={key} style={{ fontSize: "0.8rem", color: "var(--text-medium)" }}>
                          <strong>{keyLabel}:</strong> {displayVal}
                        </span>
                      );
                    })}
                  </div>

                  {/* Quantity and Price */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px"
                    }}
                  >
                    {/* Qty Buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "white",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-full)",
                        padding: "2px 8px"
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        style={{ padding: "4px", color: "var(--text-medium)" }}
                      >
                        <Minus style={{ width: "12px", height: "12px" }} />
                      </button>
                      <span style={{ fontSize: "0.85rem", fontWeight: "600", padding: "0 8px", minWidth: "20px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        style={{ padding: "4px", color: "var(--text-medium)" }}
                      >
                        <Plus style={{ width: "12px", height: "12px" }} />
                      </button>
                    </div>

                    {/* Price */}
                    <span style={{ fontWeight: "700", color: "var(--text-dark)", fontSize: "0.95rem" }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  style={{
                    alignSelf: "flex-start",
                    color: "var(--text-light)",
                    padding: "4px"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-light)")}
                  aria-label="Remove item"
                >
                  <Trash2 style={{ width: "18px", height: "18px" }} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with checkout */}
        {cartItems.length > 0 && (
          <div
            style={{
              borderTop: "1px solid var(--border-color)",
              paddingTop: "20px",
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1rem", color: "var(--text-medium)" }}>Subtotal</span>
              <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "var(--text-dark)", fontFamily: "var(--font-serif)" }}>
                {formatPrice(getCartSubtotal())}
              </span>
            </div>
            
            <p style={{ fontSize: "0.75rem", color: "var(--text-light)", textAlign: "center" }}>
              Shipping, taxes, and custom handmade packaging calculated at checkout.
            </p>

            <button
              onClick={() => {
                alert(`Proceeding to checkout with total: ${formatPrice(getCartSubtotal())}\nThank you for choosing BloomCraft!`);
              }}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                fontSize: "1rem"
              }}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
