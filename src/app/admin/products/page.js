"use client";

import { useState, useEffect, useCallback } from "react";
import AdminNavbar from "@/components/admin/Navbar";

const STATUS_STYLES = {
  Active:         { color: "#3d9970", bg: "#d5f5e3" },
  "Out of Stock": { color: "#c0392b", bg: "#fde8e8" },
  "Low Stock":    { color: "#d68910", bg: "#fef9e7" },
};

const EMPTY_FORM = { name: "", description: "", basePrice: "", categories: "", trending: false, image: "" };

function getStatus(p) {
  if (!p.stock && p.stock !== 0) return "Active";
  if (p.stock === 0) return "Out of Stock";
  if (p.stock < 10) return "Low Stock";
  return "Active";
}

export default function ProductsPage() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [search, setSearch]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // null = add, obj = edit
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [deleteId, setDeleteId]   = useState(null);
  const [toast, setToast]         = useState(null);

  /* ── helpers ── */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  /* ── filtered list ── */
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.categories || []).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  /* ── open modal ── */
  const openAdd = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };
  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name:        p.name,
      description: p.description || "",
      basePrice:   String(p.basePrice),
      categories:  (p.categories || []).join(", "),
      trending:    !!p.trending,
      image:       p.image || "",
    });
    setShowModal(true);
  };

  /* ── save (add or edit) ── */
  const handleSave = async () => {
    if (!form.name.trim() || !form.basePrice) {
      showToast("Name and price are required", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...(editProduct ? { id: editProduct.id } : {}),
        name:        form.name.trim(),
        description: form.description.trim(),
        basePrice:   Number(form.basePrice),
        categories:  form.categories.split(",").map((c) => c.trim()).filter(Boolean),
        trending:    form.trending,
        image:       form.image.trim(),
      };
      const res = await fetch("/api/products", {
        method:  editProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      await fetchProducts();
      setShowModal(false);
      showToast(editProduct ? "Product updated!" : "Product added!");
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  /* ── delete ── */
  const handleDelete = async (id) => {
    setDeleteId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchProducts();
      showToast("Product deleted");
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setDeleteId(null);
    }
  };

  /* ── render ── */
  return (
    <div style={s.page}>
      <AdminNavbar title="Products" />

      {/* Toast */}
      {toast && (
        <div style={{ ...s.toast, background: toast.type === "error" ? "#c0392b" : "#3d9970" }}>
          {toast.msg}
        </div>
      )}

      <main style={s.content}>
        {/* Top bar */}
        <div style={s.topBar}>
          <input
            id="products-search"
            type="text"
            placeholder="Search by name or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.searchInput}
          />
          <div style={s.topBarRight}>
            <button id="refresh-products" onClick={fetchProducts} style={s.refreshBtn} title="Refresh">
              ↻
            </button>
            <button id="add-product-btn" onClick={openAdd} style={s.addBtn}>
              + Add Product
            </button>
          </div>
        </div>

        {/* States */}
        {loading && <div style={s.center}>Loading products…</div>}
        {error   && <div style={{ ...s.center, color: "#c0392b" }}>Error: {error}</div>}

        {/* Table */}
        {!loading && !error && (
          <div style={s.tableCard}>
            <div style={s.tableHeader}>
              <span style={s.tableTitle}>{filtered.length} Products</span>
            </div>
            <div style={s.tableWrapper}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {["Image", "Name", "Categories", "Base Price", "Trending", "Status", "Actions"].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} style={s.empty}>No products found.</td></tr>
                  ) : (
                    filtered.map((p) => {
                      const status = getStatus(p);
                      const sc     = STATUS_STYLES[status] || {};
                      return (
                        <tr key={p.id} style={s.tr}>
                          <td style={s.td}>
                            {p.image ? (
                              <img src={p.image} alt={p.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                            ) : (
                              <div style={{ width: "40px", height: "40px", background: "#f0f0f0", borderRadius: "6px" }} />
                            )}
                          </td>
                          <td style={{ ...s.td, fontWeight: "600" }}>
                            <div>{p.name}</div>
                            <div style={s.subText}>{p.description?.slice(0, 48)}{p.description?.length > 48 ? "…" : ""}</div>
                          </td>
                          <td style={s.td}>
                            <div style={s.pills}>
                              {(p.categories || []).map((c) => (
                                <span key={c} style={s.pill}>{c}</span>
                              ))}
                            </div>
                          </td>
                          <td style={{ ...s.td, fontWeight: "700" }}>₹{p.basePrice?.toLocaleString()}</td>
                          <td style={s.td}>
                            <span style={p.trending ? s.trendingOn : s.trendingOff}>
                              {p.trending ? "🔥 Yes" : "No"}
                            </span>
                          </td>
                          <td style={s.td}>
                            <span style={{ ...s.badge, color: sc.color, background: sc.bg }}>{status}</span>
                          </td>
                          <td style={s.td}>
                            <div style={s.actions}>
                              <button
                                id={`edit-${p.id}`}
                                onClick={() => openEdit(p)}
                                style={s.editBtn}
                              >
                                Edit
                              </button>
                              <button
                                id={`delete-${p.id}`}
                                onClick={() => handleDelete(p.id)}
                                style={s.deleteBtn}
                                disabled={deleteId === p.id}
                              >
                                {deleteId === p.id ? "…" : "Delete"}
                              </button>
                            </div>
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

        {/* Modal */}
        {showModal && (
          <div style={s.overlay} onClick={() => setShowModal(false)}>
            <div style={s.modal} onClick={(e) => e.stopPropagation()}>
              <h2 style={s.modalTitle}>{editProduct ? "Edit Product" : "Add New Product"}</h2>
              <div style={s.formGrid}>
                <div style={{ ...s.formGroup, gridColumn: "1 / -1" }}>
                  <label style={s.label}>Product Name *</label>
                  <input id="prod-name" type="text" placeholder="e.g. Floral Hoodie"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={s.input} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Base Price (₹) *</label>
                  <input id="prod-price" type="number" placeholder="e.g. 1299"
                    value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} style={s.input} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Categories (comma separated)</label>
                  <input id="prod-categories" type="text" placeholder="e.g. apparel, handmade"
                    value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} style={s.input} />
                </div>
                <div style={{ ...s.formGroup, gridColumn: "1 / -1" }}>
                  <label style={s.label}>Image URL</label>
                  <input id="prod-image" type="text" placeholder="e.g. /floral_hoodie.png or https://..."
                    value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={s.input} />
                </div>
                <div style={{ ...s.formGroup, gridColumn: "1 / -1" }}>
                  <label style={s.label}>Description</label>
                  <textarea id="prod-desc" rows={3} placeholder="Short product description…"
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    style={{ ...s.input, resize: "vertical" }} />
                </div>
                <div style={s.checkRow}>
                  <input id="prod-trending" type="checkbox" checked={form.trending}
                    onChange={(e) => setForm({ ...form, trending: e.target.checked })}
                    style={{ width: "auto", marginRight: "8px" }} />
                  <label htmlFor="prod-trending" style={{ fontSize: "14px", color: "#2C2627", cursor: "pointer" }}>
                    Mark as Trending 🔥
                  </label>
                </div>
              </div>
              <div style={s.modalActions}>
                <button id="cancel-product" onClick={() => setShowModal(false)} style={s.cancelBtn}>Cancel</button>
                <button id="save-product" onClick={handleSave} disabled={saving} style={s.saveBtn}>
                  {saving ? "Saving…" : editProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const s = {
  page: { display: "flex", flexDirection: "column", flex: 1 },
  content: { padding: "32px", display: "flex", flexDirection: "column", gap: "24px" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" },
  topBarRight: { display: "flex", gap: "10px", alignItems: "center" },
  searchInput: {
    padding: "10px 16px", border: "1px solid #F0E3DF", borderRadius: "10px",
    fontSize: "14px", width: "280px", color: "#2C2627", background: "#fff",
  },
  refreshBtn: {
    width: "38px", height: "38px", borderRadius: "10px", border: "1px solid #F0E3DF",
    background: "#FFF9F6", fontSize: "18px", cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  addBtn: {
    padding: "10px 22px", background: "linear-gradient(135deg,#D67B88,#E58E97)", color: "#fff",
    border: "none", borderRadius: "10px", fontWeight: "600", fontSize: "14px", cursor: "pointer",
    boxShadow: "0 4px 12px rgba(214,123,136,0.3)",
  },
  center: { textAlign: "center", padding: "60px", color: "#A89B9D", fontSize: "15px" },
  tableCard: {
    background: "#fff", borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(214,123,136,0.07)", border: "1px solid #F0E3DF", overflow: "hidden",
  },
  tableHeader: { padding: "18px 24px", borderBottom: "1px solid #F0E3DF" },
  tableTitle: { fontFamily: "var(--font-serif,Georgia,serif)", fontSize: "16px", fontWeight: "700", color: "#2C2627" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "11px 20px", fontSize: "11px", fontWeight: "600",
    color: "#A89B9D", textTransform: "uppercase", letterSpacing: "0.06em",
    background: "#FFF9F6", borderBottom: "1px solid #F0E3DF",
  },
  tr: { borderBottom: "1px solid #F0E3DF" },
  td: { padding: "13px 20px", fontSize: "14px", color: "#2C2627", verticalAlign: "middle" },
  subText: { fontSize: "12px", color: "#A89B9D", marginTop: "2px", fontWeight: "400" },
  pills: { display: "flex", gap: "5px", flexWrap: "wrap" },
  pill: {
    background: "#FCECEF", color: "#9B626C", padding: "2px 9px",
    borderRadius: "9999px", fontSize: "11px", fontWeight: "500",
  },
  badge: { padding: "3px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: "600" },
  trendingOn: { color: "#d68910", fontWeight: "600", fontSize: "13px" },
  trendingOff: { color: "#A89B9D", fontSize: "13px" },
  actions: { display: "flex", gap: "8px" },
  editBtn: {
    padding: "5px 14px", borderRadius: "7px", border: "1px solid #D67B88",
    color: "#D67B88", background: "transparent", fontWeight: "600", fontSize: "12px", cursor: "pointer",
  },
  deleteBtn: {
    padding: "5px 14px", borderRadius: "7px", border: "1px solid #fde8e8",
    color: "#c0392b", background: "#fde8e8", fontWeight: "600", fontSize: "12px", cursor: "pointer",
  },
  empty: { textAlign: "center", padding: "40px", color: "#A89B9D", fontSize: "14px" },
  // Modal
  overlay: {
    position: "fixed", inset: 0, background: "rgba(44,38,39,0.45)",
    backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200,
  },
  modal: {
    background: "#fff", borderRadius: "20px", padding: "36px",
    width: "520px", maxWidth: "92vw", boxShadow: "0 20px 60px rgba(44,38,39,0.2)",
  },
  modalTitle: {
    fontFamily: "var(--font-serif,Georgia,serif)", fontSize: "20px",
    fontWeight: "700", color: "#2C2627", marginBottom: "24px",
  },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "11px", fontWeight: "700", color: "#6E6264", textTransform: "uppercase", letterSpacing: "0.06em" },
  input: {
    padding: "10px 14px", border: "1px solid #F0E3DF",
    borderRadius: "8px", fontSize: "14px", color: "#2C2627", width: "100%",
  },
  checkRow: { gridColumn: "1 / -1", display: "flex", alignItems: "center" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "12px" },
  cancelBtn: {
    padding: "10px 20px", border: "1px solid #F0E3DF", borderRadius: "10px",
    background: "#FFF9F6", color: "#6E6264", fontWeight: "600", fontSize: "14px", cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 24px", background: "linear-gradient(135deg,#D67B88,#E58E97)", color: "#fff",
    border: "none", borderRadius: "10px", fontWeight: "600", fontSize: "14px", cursor: "pointer",
    boxShadow: "0 4px 12px rgba(214,123,136,0.3)",
  },
  toast: {
    position: "fixed", bottom: "28px", right: "28px", color: "#fff",
    padding: "12px 24px", borderRadius: "12px", fontWeight: "600",
    fontSize: "14px", zIndex: 300, boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
  },
};
