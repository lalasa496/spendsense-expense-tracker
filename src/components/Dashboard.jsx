import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#a78bfa", "#60a5fa", "#34d399", "#f472b6", "#fb923c", "#facc15", "#94a3b8"];

export default function Dashboard({ expenses, budget, setBudget, categories }) {
  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // Category breakdown
  const categoryData = categories.map((cat, i) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0),
    color: COLORS[i % COLORS.length],
  })).filter((d) => d.value > 0);

  // Last 7 days trend
  const today = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-IN", { weekday: "short" });
    const amount = expenses
      .filter((e) => e.date === dateStr)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return { label, amount };
  });

  const topCategory = categoryData.sort((a, b) => b.value - a.value)[0];

  const cardStyle = {
    background: "#1a1a2e", border: "1px solid #2a2a4a",
    borderRadius: 16, padding: "20px 24px"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Total Spent", value: `₹${totalSpent.toLocaleString()}`, sub: `of ₹${budget.toLocaleString()} budget`, color: "#a78bfa" },
          { label: "Transactions", value: expenses.length, sub: "this month", color: "#60a5fa" },
          { label: "Top Category", value: topCategory?.name || "—", sub: topCategory ? `₹${topCategory.value.toLocaleString()}` : "No data", color: "#34d399" },
        ].map((card) => (
          <div key={card.label} style={{ ...cardStyle, borderTop: `3px solid ${card.color}` }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{card.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Budget Setting */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f0", marginBottom: 12 }}>Set Monthly Budget</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "#a78bfa", fontSize: 18, fontWeight: 700 }}>₹</span>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{
              background: "#0f0f1a", border: "1px solid #2a2a4a", borderRadius: 10,
              color: "#e8e8f0", padding: "10px 14px", fontSize: 16, width: 160,
              outline: "none"
            }}
          />
          <span style={{ fontSize: 13, color: "#64748b" }}>Remaining: <strong style={{ color: budget - totalSpent < 0 ? "#ef4444" : "#34d399" }}>₹{(budget - totalSpent).toLocaleString()}</strong></span>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Pie Chart */}
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f0", marginBottom: 16 }}>Spending by Category</div>
          {categoryData.length === 0 ? (
            <div style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>No expenses yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, color: "#e8e8f0" }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", marginTop: 8 }}>
                {categoryData.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bar Chart */}
        <div style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e8f0", marginBottom: 16 }}>Last 7 Days</div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={last7} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 8, color: "#e8e8f0" }} />
              <Bar dataKey="amount" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
