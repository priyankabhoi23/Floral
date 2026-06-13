export default function CategoriesPage() {
  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--text-dark)", marginBottom: "24px" }}>
        Categories Management
      </h1>
      <div style={{
        background: "white",
        padding: "24px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}>
        <p style={{ color: "var(--text-medium)" }}>Categories list will be displayed here.</p>
      </div>
    </div>
  );
}
