"use client";

export default function AdminNavbar({ title = "Dashboard" }) {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>{title}</h1>
      </div>
      <div style={styles.right}>
        <div style={styles.avatar}>A</div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: "64px",
    background: "rgba(255,249,246,0.92)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid #F0E3DF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  title: {
    fontFamily: "var(--font-serif, Georgia, serif)",
    fontSize: "20px",
    fontWeight: "700",
    color: "#2C2627",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #D67B88, #E58E97)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(214,123,136,0.3)",
  },
};
