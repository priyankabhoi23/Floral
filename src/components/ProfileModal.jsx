"use client";

import React, { useState, useEffect } from "react";
import { X, User, MapPin, Phone, Save, LogOut, Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfileModal({ isOpen, onClose }) {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "orders"
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || ""
      });
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (isOpen && activeTab === "orders" && user?.phone) {
      fetchOrders();
    }
  }, [isOpen, activeTab, user]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch(`/api/orders?email=${user.phone}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error("Failed to fetch orders", e);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }, 500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Delivered": return <CheckCircle size={16} color="#166534" />;
      case "Processing": return <Clock size={16} color="#CA8A04" />;
      case "Shipped": return <Truck size={16} color="#2563EB" />; // Fallback if truck imported, but using generic
      case "Cancelled": return <XCircle size={16} color="#DC2626" />;
      default: return <Package size={16} color="var(--text-medium)" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return { bg: "#DCFCE7", text: "#166534" };
      case "Processing": return { bg: "#FEF9C3", text: "#CA8A04" };
      case "Shipped": return { bg: "#DBEAFE", text: "#1D4ED8" };
      case "Cancelled": return { bg: "#FEE2E2", text: "#DC2626" };
      default: return { bg: "#F3F4F6", text: "#4B5563" };
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(44, 38, 39, 0.6)", backdropFilter: "blur(4px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease"
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "550px", backgroundColor: "white", borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)", position: "relative", animation: "slideUp 0.3s ease",
          maxHeight: "90vh", display: "flex", flexDirection: "column"
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "16px", right: "16px", padding: "8px", borderRadius: "50%", backgroundColor: "var(--bg-secondary)", color: "var(--text-medium)", border: "none", cursor: "pointer", zIndex: 10 }}
        >
          <X style={{ width: "20px", height: "20px" }} />
        </button>

        {/* Header */}
        <div style={{ padding: "32px 32px 16px", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={28} />
            </div>
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--text-dark)", marginBottom: "4px" }}>
                {user.name || "Your Profile"}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-medium)", fontSize: "0.95rem" }}>
                <Phone size={14} /> {user.phone}
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
            <button
              onClick={() => setActiveTab("profile")}
              style={{
                background: "none", border: "none", padding: "8px 0", cursor: "pointer",
                fontWeight: activeTab === "profile" ? "600" : "500",
                color: activeTab === "profile" ? "var(--primary)" : "var(--text-medium)",
                borderBottom: activeTab === "profile" ? "2px solid var(--primary)" : "2px solid transparent",
                transition: "all 0.2s"
              }}
            >
              Account Details
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              style={{
                background: "none", border: "none", padding: "8px 0", cursor: "pointer",
                fontWeight: activeTab === "orders" ? "600" : "500",
                color: activeTab === "orders" ? "var(--primary)" : "var(--text-medium)",
                borderBottom: activeTab === "orders" ? "2px solid var(--primary)" : "2px solid transparent",
                transition: "all 0.2s"
              }}
            >
              My Orders
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 32px 32px", overflowY: "auto", flex: 1 }}>
          
          {activeTab === "profile" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              {message && (
                <div style={{ padding: "12px", backgroundColor: "#D1FAE5", color: "#065F46", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "0.85rem", textAlign: "center", fontWeight: "500" }}>
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Street Address</label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={18} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-light)" }} />
                    <textarea name="address" value={formData.address} onChange={handleChange} style={{ width: "100%", padding: "10px 10px 10px 38px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none", resize: "vertical", minHeight: "80px" }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-dark)", marginBottom: "6px" }}>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", outline: "none" }} />
                </div>

                <button type="submit" className="btn-primary" disabled={isSaving} style={{ padding: "12px", width: "100%", justifyContent: "center", marginTop: "8px", gap: "8px" }}>
                  <Save size={18} /> {isSaving ? "Saving..." : "Save Details"}
                </button>
              </form>
              
              <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border-color)" }}>
                <button
                  onClick={() => { onClose(); logout(); }}
                  style={{ width: "100%", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "var(--radius-md)", fontWeight: "600", cursor: "pointer" }}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              {isLoadingOrders ? (
                <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-medium)" }}>Loading orders...</div>
              ) : orders.length === 0 ? (
                <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-medium)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                  <Package size={48} color="var(--border-color)" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {orders.map((order) => {
                    const statusStyle = getStatusColor(order.status);
                    return (
                      <div key={order.id} style={{ border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                          <div>
                            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-light)" }}>{order.id}</span>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-dark)", marginTop: "2px" }}>{order.product}</h3>
                            {/* Render Customizations if available */}
                            {order.items && order.items.length > 0 && (
                              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                {order.items.map((item, idx) => (
                                  <div key={idx} style={{ fontSize: "0.85rem", color: "var(--text-medium)", backgroundColor: "var(--bg-secondary)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                                    <strong style={{ color: "var(--text-dark)" }}>{item.quantity}x {item.name}</strong>
                                    {item.selections && Object.keys(item.selections).length > 0 && (
                                      <ul style={{ margin: "6px 0 0 16px", padding: 0, listStyleType: "circle" }}>
                                        {Object.entries(item.selections).map(([key, val]) => {
                                          if (key === "addOns" && Array.isArray(val)) {
                                            if (val.length === 0) return null;
                                            return <li key={key} style={{ marginTop: "2px" }}>Add-ons: {val.map(a => a.name).join(", ")}</li>;
                                          }
                                          if (typeof val === "object" && val?.name) {
                                            return <li key={key} style={{ marginTop: "2px", textTransform: "capitalize" }}>{key}: {val.name}</li>;
                                          }
                                          if (val && typeof val !== "object") {
                                            return <li key={key} style={{ marginTop: "2px", textTransform: "capitalize" }}>{key}: {val}</li>;
                                          }
                                          return null;
                                        })}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div style={{ backgroundColor: statusStyle.bg, color: statusStyle.text, padding: "4px 8px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                            {getStatusIcon(order.status)} {order.status}
                          </div>
                        </div>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "8px" }}>
                          <span style={{ fontSize: "0.85rem", color: "var(--text-medium)" }}>{new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
                          <span style={{ fontWeight: "700", color: "var(--text-dark)" }}>{formatPrice(order.amount)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
