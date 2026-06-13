export default function DashboardCard({ title, value, icon, change, color = "#D67B88" }) {
  const isPositive = change && change.startsWith("+");
  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={{ ...styles.iconBox, background: color + "22" }}>
          <span style={{ fontSize: "22px" }}>{icon}</span>
        </div>
        {change && (
          <span
            style={{
              ...styles.badge,
              color: isPositive ? "#3d9970" : "#c0392b",
              background: isPositive ? "#d5f5e3" : "#fde8e8",
            }}
          >
            {change}
          </span>
        )}
      </div>
      <div style={styles.value}>{value}</div>
      <div style={styles.title}>{title}</div>
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(214,123,136,0.07)",
    border: "1px solid #F0E3DF",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  iconBox: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "9999px",
  },
  value: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2C2627",
    fontFamily: "var(--font-serif, Georgia, serif)",
    marginBottom: "4px",
  },
  title: {
    fontSize: "13px",
    color: "#A89B9D",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
};
