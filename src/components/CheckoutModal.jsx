"use client";

import React, { useState } from "react";
import { X, ShieldCheck, Truck, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutModal({ isOpen, onClose }) {
  const { user, updateProfile } = useAuth();
  const { cartItems, getCartSubtotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update formData when user data loads if it was empty initially
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || ""
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(price);
  };

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Save/Update profile if they entered a new address
    updateProfile(formData);

    // Construct Order Data
    const orderData = {
      customer: formData.name || user.phone,
      email: user.phone, // using phone as identifier for backend mockup
      product: cartItems.map(item => `${item.quantity}x ${item.name}`).join(", "),
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        selections: item.selections
      })),
      amount: total,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
      
      if (res.ok) {
        setIsSuccess(true);
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while placing the order.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSuccess) {
      onClose();
    }
  };

  if (isSuccess) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(44,38,39,0.6)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "450px", backgroundColor: "white", borderRadius: "var(--radius-lg)", padding: "40px 32px", textAlign: "center", animation: "slideUp 0.3s ease" }}>
          <CheckCircle size={64} color="var(--primary)" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--text-dark)", marginBottom: "8px" }}>Order Confirmed!</h2>
          <p style={{ color: "var(--text-medium)", marginBottom: "24px" }}>Thank you, {formData.name || "Customer"}. Your custom handcrafted items will be prepared and shipped soon.</p>
          <div style={{ backgroundColor: "var(--bg-secondary)", padding: "16px", borderRadius: "var(--radius-md)", marginBottom: "24px" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--text-dark)" }}><strong>Shipping to:</strong><br/>{formData.address}, {formData.city}</p>
          </div>
          <button onClick={() => { setIsSuccess(false); onClose(); window.location.href = "/"; }} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(44, 38, 39, 0.6)", backdropFilter: "blur(4px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease"
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "800px", backgroundColor: "white", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)", position: "relative", animation: "slideUp 0.3s ease",
          display: "flex", flexDirection: "row", overflow: "hidden", maxHeight: "90vh"
        }}
        className="checkout-modal-container"
      >
        {/* Left Side: Order Summary */}
        <div style={{ flex: 1, backgroundColor: "var(--bg-primary)", padding: "32px", borderRight: "1px solid var(--border-color)", overflowY: "auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-dark)", marginBottom: "20px" }}>Order Summary</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            {cartItems.map((item) => (
              <div key={item.cartItemId} style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "600", fontSize: "0.95rem", color: "var(--text-dark)" }}>{item.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-medium)" }}>Qty: {item.quantity}</p>
                </div>
                <div style={{ fontWeight: "600", color: "var(--text-dark)" }}>{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-medium)", fontSize: "0.9rem" }}>
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-medium)", fontSize: "0.9rem" }}>
              <span>Shipping <Truck size={14} style={{ display: "inline", marginLeft: "4px" }} /></span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)", fontSize: "1.2rem", fontWeight: "700", marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed var(--border-color)" }}>
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Shipping Form */}
        <div style={{ flex: 1.2, padding: "32px", overflowY: "auto", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", padding: "8px", borderRadius: "50%", backgroundColor: "var(--bg-secondary)", color: "var(--text-medium)", border: "none", cursor: "pointer" }}>
            <X size={20} />
          </button>

          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-dark)", marginBottom: "20px" }}>Shipping Details</h2>
          
          <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} required />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Street Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} required />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} required />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} required />
            </div>

            <div style={{ marginTop: "12px", padding: "16px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "12px" }}>
              <ShieldCheck size={24} color="#166534" />
              <div>
                <p style={{ fontWeight: "600", color: "#166534", fontSize: "0.95rem", margin: 0 }}>Cash on Delivery</p>
                <p style={{ fontSize: "0.8rem", color: "#15803D", margin: 0 }}>Pay when your order arrives securely.</p>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isProcessing} style={{ padding: "16px", width: "100%", justifyContent: "center", fontSize: "1.1rem", marginTop: "12px" }}>
              {isProcessing ? "Processing..." : `Place Order - ${formatPrice(total)}`}
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile flex-direction fix */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .checkout-modal-container {
            flex-direction: column !important;
            height: 95vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}
