"use client";

import { useState, useEffect, useCallback } from "react";
import AdminNavbar from "@/components/admin/Navbar";

const STATUS_COLORS = {
  Delivered: { color: "#3d9970", bg: "#d5f5e3" },
  Processing: { color: "#d68910", bg: "#fef9e7" },
  Shipped: { color: "#2980b9", bg: "#d6eaf8" },
  Cancelled: { color: "#c0392b", bg: "#fde8e8" },
};

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      // Update locally
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      showToast(`Order ${id} marked as ${newStatus}`);
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesStatus = activeFilter === "All" || o.status === activeFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={styles.page}>
      <AdminNavbar title="Orders" />
      
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === "error" ? "#c0392b" : "#3d9970" }}>
          {toast.msg}
        </div>
      )}
      
      <main style={styles.content}>
        {/* Controls */}
        <div style={styles.controls}>
          <input
            id="orders-search"
            type="text"
            placeholder="Search by order ID or customer…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f}
                id={`filter-${f.toLowerCase()}`}
                onClick={() => setActiveFilter(f)}
                style={{
                  ...styles.filterBtn,
                  ...(activeFilter === f ? styles.filterBtnActive : {}),
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <button onClick={fetchOrders} style={styles.refreshBtn} title="Refresh">↻</button>
        </div>

        {/* States */}
        {loading && <div style={styles.center}>Loading orders…</div>}
        {error && <div style={{ ...styles.center, color: "#c0392b" }}>Error: {error}</div>}

        {/* Table */}
        {!loading && !error && (
          <div style={styles.tableCard}>
            <div style={styles.tableHeader}>
              <h2 style={styles.tableTitle}>
                {filtered.length} {activeFilter === "All" ? "Total" : activeFilter} Orders
              </h2>
            </div>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["Order ID", "Customer", "Product", "Amount", "Date", "Status", "Actions"].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={styles.empty}>No orders found.</td>
                    </tr>
                  ) : (
                    filtered.map((order) => {
                      const s = STATUS_COLORS[order.status] || {};
                      return (
                        <tr key={order.id} style={styles.tr}>
                          <td style={{ ...styles.td, fontWeight: "600", color: "#D67B88" }}>{order.id}</td>
                          <td style={styles.td}>
                            <div style={styles.customerName}>{order.customer}</div>
                            <div style={styles.customerEmail}>{order.email}</div>
                          </td>
                          <td style={styles.td}>
                            {order.items && order.items.length > 0 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                {order.items.map((item, idx) => (
                                  <div key={idx} style={{ paddingBottom: idx !== order.items.length - 1 ? "6px" : 0, borderBottom: idx !== order.items.length - 1 ? "1px dashed #F0E3DF" : "none" }}>
                                    <div style={{ fontWeight: "600" }}>{item.quantity}x {item.name}</div>
                                    {item.selections && Object.keys(item.selections).length > 0 && (
                                      <div style={{ fontSize: "11px", color: "#A89B9D", marginTop: "2px", display: "flex", flexDirection: "column", gap: "1px" }}>
                                        {Object.entries(item.selections).map(([key, val]) => {
                                          if (key === "addOns" && Array.isArray(val) && val.length > 0) {
                                            return <div key={key}>• Add-ons: {val.map(a => a.name).join(", ")}</div>;
                                          }
                                          if (typeof val === "object" && val?.name) {
                                            return <div key={key} style={{ textTransform: "capitalize" }}>• {key}: {val.name}</div>;
                                          }
                                          if (val && typeof val !== "object" && (!Array.isArray(val) || val.length > 0)) {
                                            return <div key={key} style={{ textTransform: "capitalize" }}>• {key}: {val}</div>;
                                          }
                                          return null;
                                        })}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              order.product
                            )}
                          </td>
                          <td style={{ ...styles.td, fontWeight: "600" }}>₹{order.amount?.toLocaleString()}</td>
                          <td style={{ ...styles.td, color: "#A89B9D" }}>{order.date}</td>
                          <td style={styles.td}>
                            <span style={{ ...styles.badge, color: s.color, background: s.bg }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={styles.td}>
                            <select 
                              value={order.status} 
                              onChange={(e) => updateStatus(order.id, e.target.value)}
                              disabled={updating === order.id}
                              style={styles.statusSelect}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", flex: 1 },
  content: { padding: "32px", display: "flex", flexDirection: "column", gap: "24px" },
  controls: { display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" },
  searchInput: {
    padding: "10px 16px", border: "1px solid #F0E3DF", borderRadius: "10px",
    fontSize: "14px", width: "280px", outline: "none", color: "#2C2627", background: "#fff",
  },
  refreshBtn: {
    width: "38px", height: "38px", borderRadius: "10px", border: "1px solid #F0E3DF",
    background: "#FFF9F6", fontSize: "18px", cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center", marginLeft: "auto"
  },
  filters: { display: "flex", gap: "8px", flexWrap: "wrap" },
  filterBtn: {
    padding: "8px 18px", borderRadius: "9999px", fontSize: "13px", fontWeight: "500",
    background: "#FFF9F6", border: "1px solid #F0E3DF", color: "#6E6264", cursor: "pointer",
    transition: "all 0.15s ease",
  },
  filterBtnActive: { background: "#D67B88", color: "#fff", borderColor: "#D67B88", fontWeight: "600" },
  center: { textAlign: "center", padding: "60px", color: "#A89B9D", fontSize: "15px" },
  tableCard: {
    background: "#fff", borderRadius: "16px", boxShadow: "0 2px 12px rgba(214,123,136,0.07)",
    border: "1px solid #F0E3DF", overflow: "hidden",
  },
  tableHeader: { padding: "20px 24px", borderBottom: "1px solid #F0E3DF" },
  tableTitle: { fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "16px", fontWeight: "700", color: "#2C2627" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "10px 20px", fontSize: "11px", fontWeight: "600",
    color: "#A89B9D", textTransform: "uppercase", letterSpacing: "0.06em",
    background: "#FFF9F6", borderBottom: "1px solid #F0E3DF",
  },
  tr: { borderBottom: "1px solid #F0E3DF", transition: "background 0.15s" },
  td: { padding: "14px 20px", fontSize: "14px", color: "#2C2627", verticalAlign: "middle" },
  customerName: { fontWeight: "500" },
  customerEmail: { fontSize: "12px", color: "#A89B9D", marginTop: "2px" },
  badge: { padding: "3px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" },
  statusSelect: {
    padding: "4px 8px", borderRadius: "6px", border: "1px solid #F0E3DF",
    fontSize: "12px", background: "#fff", cursor: "pointer", color: "#2C2627"
  },
  empty: { textAlign: "center", padding: "40px", color: "#A89B9D", fontSize: "14px" },
  toast: {
    position: "fixed", bottom: "28px", right: "28px", color: "#fff",
    padding: "12px 24px", borderRadius: "12px", fontWeight: "600",
    fontSize: "14px", zIndex: 300, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
  },
};
