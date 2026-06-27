import { useState } from "react";

export default function ExpenseForm({ onAdd, categories, onDone }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0] });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!form.title.trim()) return setError("Enter a title for this expense.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) return setError("Enter a valid amount.");
    setError("");
    onAdd(form);
    setSuccess(true);
    setForm({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0] });
    setTimeout(() => { setSuccess(false); onDone(); }, 1200);
  };

  const inputStyle = {
    width: "100%", background: "#0f0f1a", border: "1px solid #2a2a4a",
    borderRadius: 10, color: "#e8e8f0", padding: "12px 16px", fontSize: 15,
    outline: "none", boxSizing: "border-box", transition: "border 0.2s"
  };

  const labelStyle = { fontSize: 13, color: "#94a3b8", marginBottom: 6, display: "block", fontWeight: 500 };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 20, padding: "32px 28px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#e8e8f0", marginBottom: 24, marginTop: 0 }}>Add New Expense</h2>

        {success && (
          <div style={{ background: "#0a3b1a", border: "1px solid #22c55e", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#22c55e", fontSize: 14 }}>
            ✅ Expense added successfully!
          </div>
        )}

        {error && (
          <div style={{ background: "#3b0a0a", border: "1px solid #ef4444", borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: "#ef4444", fontSize: 14 }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={labelStyle}>Expense Title</label>
            <input
              style={inputStyle}
              placeholder="e.g. Lunch, Uber, Electricity"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label style={labelStyle}>Amount (₹)</label>
            <input
              style={inputStyle}
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Date</label>
            <input
              style={inputStyle}
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              border: "none", borderRadius: 12, color: "#fff",
              padding: "14px 0", fontSize: 15, fontWeight: 600,
              cursor: "pointer", marginTop: 8, letterSpacing: "0.3px",
              transition: "opacity 0.2s"
            }}
            onMouseOver={(e) => e.target.style.opacity = 0.88}
            onMouseOut={(e) => e.target.style.opacity = 1}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}
