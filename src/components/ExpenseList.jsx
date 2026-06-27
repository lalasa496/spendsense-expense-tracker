import { useState } from "react";

const CATEGORY_ICONS = {
  Food: "🍔", Transport: "🚌", Shopping: "🛍️",
  Entertainment: "🎬", Health: "💊", Bills: "⚡", Other: "📦"
};

const CATEGORY_COLORS = {
  Food: "#a78bfa", Transport: "#60a5fa", Shopping: "#f472b6",
  Entertainment: "#fb923c", Health: "#34d399", Bills: "#facc15", Other: "#94a3b8"
};

export default function ExpenseList({ expenses, onDelete, categories }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filtered = expenses
    .filter((e) => filter === "All" || e.category === filter)
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "date"
      ? new Date(b.date) - new Date(a.date)
      : Number(b.amount) - Number(a.amount)
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Filters */}
      <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 16, padding: "16px 20px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <input
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "#0f0f1a", border: "1px solid #2a2a4a", borderRadius: 8,
            color: "#e8e8f0", padding: "8px 14px", fontSize: 13, outline: "none", flex: 1, minWidth: 160
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            background: "#0f0f1a", border: "1px solid #2a2a4a", borderRadius: 8,
            color: "#94a3b8", padding: "8px 14px", fontSize: 13, outline: "none", cursor: "pointer"
          }}
        >
          <option value="date">Sort: Latest</option>
          <option value="amount">Sort: Highest</option>
        </select>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "6px 14px", borderRadius: 20, border: "1px solid",
              borderColor: filter === cat ? "#a78bfa" : "#2a2a4a",
              background: filter === cat ? "#2d1b69" : "transparent",
              color: filter === cat ? "#a78bfa" : "#64748b",
              fontSize: 12, cursor: "pointer", fontWeight: 500, transition: "all 0.2s"
            }}
          >
            {cat !== "All" && CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Expense Items */}
      {filtered.length === 0 ? (
        <div style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 16, padding: "48px 24px", textAlign: "center", color: "#64748b" }}>
          No expenses found. Add one to get started!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((expense) => (
            <div
              key={expense.id}
              style={{
                background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 14,
                padding: "16px 20px", display: "flex", alignItems: "center", gap: 16,
                transition: "border-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "#3a3a5a"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "#2a2a4a"}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                background: `${CATEGORY_COLORS[expense.category]}22`, fontSize: 22, flexShrink: 0
              }}>
                {CATEGORY_ICONS[expense.category] || "📦"}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#e8e8f0", fontSize: 15 }}>{expense.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                  <span style={{ color: CATEGORY_COLORS[expense.category] || "#94a3b8" }}>{expense.category}</span>
                  {" · "}{new Date(expense.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>

              {/* Amount */}
              <div style={{ fontWeight: 700, fontSize: 18, color: "#e8e8f0" }}>₹{Number(expense.amount).toLocaleString()}</div>

              {/* Delete */}
              <button
                onClick={() => onDelete(expense.id)}
                style={{
                  background: "none", border: "1px solid #3b0a0a", borderRadius: 8,
                  color: "#ef4444", padding: "6px 10px", cursor: "pointer", fontSize: 14,
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.target.style.background = "#3b0a0a"; }}
                onMouseOut={(e) => { e.target.style.background = "none"; }}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div style={{ textAlign: "right", fontSize: 13, color: "#64748b" }}>
          Showing {filtered.length} expense{filtered.length !== 1 ? "s" : ""} ·{" "}
          Total: <strong style={{ color: "#a78bfa" }}>₹{filtered.reduce((s, e) => s + Number(e.amount), 0).toLocaleString()}</strong>
        </div>
      )}
    </div>
  );
}
