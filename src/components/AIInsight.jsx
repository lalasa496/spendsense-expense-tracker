import { useState } from "react";

export default function AIInsight({ expenses, budget, totalSpent }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);

  const getInsight = async () => {
    setLoading(true);
    setAsked(true);
    setInsight("");

    const summary = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {});

    const prompt = `You are a smart personal finance advisor. Analyze this user's expense data and give helpful, friendly, actionable advice.

Budget: ₹${budget}
Total Spent: ₹${totalSpent}
Remaining: ₹${budget - totalSpent}

Category Breakdown:
${Object.entries(summary).map(([cat, amt]) => `- ${cat}: ₹${amt}`).join("\n")}

Recent Expenses (last 5):
${expenses.slice(0, 5).map((e) => `- ${e.title} (${e.category}): ₹${e.amount} on ${e.date}`).join("\n")}

Give 3-4 specific, personalized insights:
1. Where they're spending most and if it's reasonable
2. One thing they can cut back on
3. A saving tip specific to their top expense category
4. Overall budget health assessment

Keep it friendly, concise, and use emojis. Format each insight as a bullet point.`;

    try {
      const response = await fetch("http://localhost:3001/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      console.log('Frontend data:', data);
const text = data.content?.map((b) => b.text || "").join("") || "Could not get insights.";
      setInsight(text);
    } catch (err) {
      setInsight("⚠️ Could not connect to AI. Please try again.");
    }
    setLoading(false);
  };

  const cardStyle = { background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: 16, padding: "24px 28px" };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header card */}
      <div style={{ ...cardStyle, background: "linear-gradient(135deg, #1e1040, #1a1a2e)", borderColor: "#4c1d95" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 40 }}>✨</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#e8e8f0" }}>AI Financial Advisor</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>
              Powered by Claude · Get personalized insights on your spending
            </p>
          </div>
        </div>

        <button
          onClick={getInsight}
          disabled={loading || expenses.length === 0}
          style={{
            marginTop: 20,
            background: loading ? "#3b2f6e" : "linear-gradient(135deg, #7c3aed, #a78bfa)",
            border: "none", borderRadius: 12, color: "#fff",
            padding: "13px 24px", fontSize: 15, fontWeight: 600,
            cursor: loading || expenses.length === 0 ? "not-allowed" : "pointer",
            opacity: expenses.length === 0 ? 0.5 : 1,
            display: "flex", alignItems: "center", gap: 10, transition: "opacity 0.2s"
          }}
        >
          {loading ? (
            <>
              <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff3", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              Analyzing your spending...
            </>
          ) : (
            <>{asked ? "🔄 Refresh Insights" : "🔍 Analyze My Spending"}</>
          )}
        </button>

        {expenses.length === 0 && (
          <p style={{ fontSize: 13, color: "#64748b", marginTop: 10 }}>Add some expenses first to get insights.</p>
        )}
      </div>

      {/* Insight Result */}
      {insight && (
        <div style={cardStyle}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#a78bfa", fontWeight: 600 }}>Your Personalized Insights</h3>
          <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            {insight}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div style={cardStyle}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, color: "#e8e8f0", fontWeight: 600 }}>Quick Summary</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Budget Used", value: `${Math.round((totalSpent / budget) * 100)}%`, color: totalSpent > budget ? "#ef4444" : "#a78bfa" },
            { label: "Avg per Expense", value: `₹${expenses.length ? Math.round(totalSpent / expenses.length).toLocaleString() : 0}`, color: "#60a5fa" },
            { label: "Total Transactions", value: expenses.length, color: "#34d399" },
            { label: "Budget Remaining", value: `₹${(budget - totalSpent).toLocaleString()}`, color: budget - totalSpent < 0 ? "#ef4444" : "#34d399" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#0f0f1a", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
