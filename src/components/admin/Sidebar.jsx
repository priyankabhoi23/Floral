"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "🏠" },
  { label: "Products", href: "/admin/products", icon: "🌸" },
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Categories", href: "/admin/categories", icon: "🏷️" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={styles.aside}>
      {/* Brand */}
      <div style={styles.brand}>
        <span style={styles.brandIcon}>🌺</span>
        <span style={styles.brandName}>BloomCraft</span>
        <span style={styles.adminBadge}>Admin</span>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
              {isActive && <span style={styles.activeDot} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={styles.sidebarFooter}>
        <button 
          onClick={() => window.dispatchEvent(new Event("admin-logout"))}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.8)",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            marginBottom: "16px",
            padding: "8px 0",
            transition: "color 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.color = "white"}
          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.8)"}
        >
          <span>🚪</span> Logout Admin
        </button>
        <Link href="/" style={styles.backLink}>
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}

const styles = {
  aside: {
    width: "240px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #2C2627 0%, #3d2f31 100%)",
    display: "flex",
    flexDirection: "column",
    padding: "0",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    boxShadow: "4px 0 20px rgba(44,38,39,0.18)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "28px 20px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexWrap: "wrap",
  },
  brandIcon: {
    fontSize: "28px",
  },
  brandName: {
    fontFamily: "var(--font-serif, Georgia, serif)",
    fontSize: "18px",
    fontWeight: "700",
    color: "#FCECEF",
    letterSpacing: "0.02em",
  },
  adminBadge: {
    background: "rgba(214,123,136,0.25)",
    color: "#E58E97",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "9999px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "16px 12px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "10px",
    color: "rgba(255,255,255,0.65)",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.2s ease",
    position: "relative",
    letterSpacing: "0.01em",
  },
  navLinkActive: {
    background: "rgba(214,123,136,0.2)",
    color: "#FCECEF",
    fontWeight: "600",
  },
  navIcon: {
    fontSize: "18px",
    width: "22px",
    textAlign: "center",
  },
  activeDot: {
    position: "absolute",
    right: "14px",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#D67B88",
  },
  sidebarFooter: {
    padding: "20px 20px 28px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  backLink: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "13px",
    textDecoration: "none",
    transition: "color 0.2s",
  },
};
