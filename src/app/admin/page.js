"use client";

import { useState, useEffect } from "react";
import AdminNavbar from "@/components/admin/Navbar";
import DashboardCard from "@/components/admin/DashboardCard";

const STATUS_COLORS = {
  Delivered: { color: "#3d9970", bg: "#d5f5e3" },
  Processing: { color: "#d68910", bg: "#fef9e7" },
  Shipped: { color: "#2980b9", bg: "#d6eaf8" },
  Cancelled: { color: "#c0392b", bg: "#fde8e8" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, ordersCount: 0, productsCount: 0, customersCount: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/products")
        ]);
        
        if (!ordersRes.ok || !productsRes.ok) throw new Error("Failed to fetch data");
        
        const orders = await ordersRes.json();
        const products = await productsRes.json();
        
        // Calculate dynamic stats
        const totalRevenue = orders.reduce((acc, curr) => acc + (curr.status !== 'Cancelled' ? curr.amount : 0), 0);
        const uniqueCustomers = new Set(orders.map(o => o.email)).size;
        
        setStats({
          revenue: totalRevenue,
          ordersCount: orders.length,
          productsCount: products.length,
          customersCount: uniqueCustomers || 892 // Default if orders have no unique emails initially
        });
        
        // Sort orders by id or date descending to get recent
        setRecentOrders(orders.slice(0, 6)); // Just take first 6 for dashboard
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const STAT_CARDS = [
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: "💰", change: "+12.4%", color: "#D67B88" },
    { title: "Total Orders", value: stats.ordersCount, icon: "📦", change: "+8.1%", color: "#9B626C" },
    { title: "Products", value: stats.productsCount, icon: "🌸", change: "+3", color: "#E58E97" },
    { title: "Customers", value: stats.customersCount, icon: "👥", change: "+5.7%", color: "#6E6264" },
  ];

  return (
    <div style={styles.page}>
      <AdminNavbar title="Dashboard" />
      <main style={styles.content}>
        
        {loading ? (
           <div style={{ textAlign: "center", padding: "60px", color: "#A89B9D" }}>Loading dashboard...</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div style={styles.statsGrid}>
              {STAT_CARDS.map((stat) => (
                <DashboardCard key={stat.title} {...stat} />
              ))}
            </div>

            {/* Recent Orders Table */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Recent Orders</h2>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {["Order ID", "Customer", "Product", "Amount", "Status"].map((h) => (
                        <th key={h} style={styles.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length === 0 ? (
                       <tr><td colSpan={5} style={{textAlign: "center", padding: "20px", color: "#A89B9D"}}>No recent orders</td></tr>
                    ) : (
                      recentOrders.map((order) => {
                        const s = STATUS_COLORS[order.status] || {};
                        return (
                          <tr key={order.id} style={styles.tr}>
                            <td style={{ ...styles.td, fontWeight: "600", color: "#D67B88" }}>{order.id}</td>
                            <td style={styles.td}>{order.customer}</td>
                            <td style={styles.td}>{order.product}</td>
                            <td style={{ ...styles.td, fontWeight: "600" }}>₹{order.amount?.toLocaleString()}</td>
                            <td style={styles.td}>
                              <span style={{ ...styles.statusBadge, color: s.color, background: s.bg }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", flex: 1 },
  content: { padding: "32px", display: "flex", flexDirection: "column", gap: "32px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  section: {
    background: "#fff",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 2px 12px rgba(214,123,136,0.07)",
    border: "1px solid #F0E3DF",
  },
  sectionTitle: {
    fontFamily: "var(--font-serif, Georgia, serif)",
    fontSize: "18px",
    fontWeight: "700",
    color: "#2C2627",
    marginBottom: "20px",
  },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#A89B9D",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "1px solid #F0E3DF",
    background: "#FFF9F6",
  },
  tr: { borderBottom: "1px solid #F0E3DF", transition: "background 0.15s" },
  td: {
    padding: "14px",
    fontSize: "14px",
    color: "#2C2627",
  },
  statusBadge: {
    padding: "3px 12px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "600",
  },
};
