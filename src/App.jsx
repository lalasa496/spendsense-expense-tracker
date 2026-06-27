import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";
import AIInsight from "./components/AIInsight";

const CATEGORIES = ["Food", "Transport", "Shopping", "Entertainment", "Health", "Bills", "Other"];

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Groceries", amount: 850, category: "Food", date: "2026-06-20" },
      { id: 2, title: "Bus Pass", amount: 300, category: "Transport", date: "2026-06-21" },
      { id: 3, title: "Netflix", amount: 199, category: "Entertainment", date: "2026-06-22" },
      { id: 4, title: "Electricity Bill", amount: 1200, category: "Bills", date: "2026-06-23" },
      { id: 5, title: "Medicine", amount: 450, category: "Health", date: "2026-06-24" },
    ];
  });
  const [budget, setBudget] = useState(() => Number(localStorage.getItem("budget")) || 10000);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses((prev) => [{ ...expense, id: Date.now() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = budget - totalSpent;
  const overBudget = remaining < 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", color: "#e8e8f0", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderBottom: "1px solid #2a2a4a",
        padding: "0 24px",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>💸</span>
            <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px", color: "#a78bfa" }}>SpendSense</span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: overBudget ? "#3b0a0a" : "#0a3b1a",
            border: `1px solid ${overBudget ? "#ef4444" : "#22c55e"}`,
            borderRadius: 20, padding: "6px 14px", fontSize: 13
          }}>
            <span style={{ color: overBudget ? "#ef4444" : "#22c55e" }}>
              {overBudget ? "⚠️ Over Budget" : "✅ On Track"}
            </span>
            <span style={{ color: "#94a3b8" }}>₹{Math.abs(remaining).toLocaleString()} {overBudget ? "over" : "left"}</span>
          </div>
        </div>
      </header>

      {/* Budget Bar */}
      <div style={{ background: "#16213e", borderBottom: "1px solid #2a2a4a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "12px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>
            <span>Monthly Budget: ₹{budget.toLocaleString()}</span>
            <span>Spent: ₹{totalSpent.toLocaleString()} ({Math.round((totalSpent / budget) * 100)}%)</span>
          </div>
          <div style={{ height: 6, background: "#1e293b", borderRadius: 99 }}>
            <div style={{
              height: "100%", borderRadius: 99,
              width: `${Math.min((totalSpent / budget) * 100, 100)}%`,
              background: overBudget ? "#ef4444" : totalSpent / budget > 0.8 ? "#f59e0b" : "#a78bfa",
              transition: "width 0.5s ease"
            }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#16213e", borderBottom: "1px solid #2a2a4a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", padding: "0 24px" }}>
          {["dashboard", "add", "expenses", "ai"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "14px 20px", border: "none", background: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 500, textTransform: "capitalize",
              color: activeTab === tab ? "#a78bfa" : "#64748b",
              borderBottom: activeTab === tab ? "2px solid #a78bfa" : "2px solid transparent",
              transition: "all 0.2s"
            }}>
              {tab === "ai" ? "✨ AI Insights" : tab === "add" ? "+ Add" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>
        {activeTab === "dashboard" && (
          <Dashboard expenses={expenses} budget={budget} setBudget={setBudget} categories={CATEGORIES} />
        )}
        {activeTab === "add" && (
          <ExpenseForm onAdd={addExpense} categories={CATEGORIES} onDone={() => setActiveTab("expenses")} />
        )}
        {activeTab === "expenses" && (
          <ExpenseList expenses={expenses} onDelete={deleteExpense} categories={CATEGORIES} />
        )}
        {activeTab === "ai" && (
          <AIInsight expenses={expenses} budget={budget} totalSpent={totalSpent} />
        )}
      </main>
    </div>
  );
}
