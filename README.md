# 💸 SpendSense — AI-Powered Expense Tracker

> A full-stack web application that helps users track expenses, visualize spending patterns, and receive AI-generated financial insights powered by Claude AI.

## 🌐 Live Demo
[View Live on Vercel](#) ← Replace with your Vercel link

## 📸 Screenshots
<!-- Add screenshots after deployment -->

---

## 🚀 Features

- **📊 Interactive Dashboard** — Real-time pie chart and bar chart showing spending by category and daily trends
- **➕ Expense Management** — Add, filter, search, sort, and delete expenses with a clean UI
- **💰 Budget Tracker** — Set monthly budget with a live progress bar and over-budget alerts
- **✨ AI Financial Advisor** — Get personalized spending insights powered by Claude AI (Anthropic)
- **💾 Persistent Storage** — Data saved to localStorage, persists across sessions
- **📱 Responsive Design** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Pure CSS-in-JS (no framework) |
| Charts | Recharts |
| AI Integration | Anthropic Claude API |
| Deployment | Vercel |

---

## 🧠 Problem Statement

People struggle to track their daily expenses manually and often overspend without realizing it. SpendSense solves this by providing:
1. A fast, intuitive way to log expenses
2. Visual breakdowns to understand spending patterns
3. AI-powered advice to make better financial decisions

---

## 💡 Key Technical Decisions

- **No backend needed** — localStorage for persistence keeps it fast and simple
- **Claude AI integration** — Sends expense summary to Claude API and renders personalized insights
- **Recharts for visualization** — Lightweight, responsive charts with custom dark theme
- **Component architecture** — Modular React components (Dashboard, ExpenseForm, ExpenseList, AIInsight)

---

## 📦 Installation & Running Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/spendsense.git
cd spendsense

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment (Vercel)

```bash
npm install -g vercel
vercel
```

---

## 🔑 AI Feature Setup

The AI Insights feature calls the Anthropic Claude API. In a production environment, set your API key in environment variables:

```env
VITE_ANTHROPIC_API_KEY=your_key_here
```

---

## 👤 Author

**Lalasa** — SkillBolt Internship Program Submission

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main app with routing & state
├── components/
│   ├── Dashboard.jsx    # Charts & budget overview
│   ├── ExpenseForm.jsx  # Add expense form
│   ├── ExpenseList.jsx  # Filter, search, list expenses
│   └── AIInsight.jsx    # Claude AI integration
```
