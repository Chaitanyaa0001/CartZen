# 🤖 Cartzenn – AI-Powered E-Commerce Sales Chatbot
**Submitted to**: Uplyft.ai  
**Submitted by**: Chaitanya

---

## 📌 Introduction

Cartzenn is a full-stack AI chatbot for e-commerce platforms that redefines product discovery using conversational UX. Instead of traditional catalog browsing, users interact with a smart chatbot assistant that provides real-time product recommendations from a mock inventory.

It simulates a virtual shopping assistant — helping users explore, filter, and select products via natural language queries, enabling a guided and intuitive shopping experience.

---

## 🎯 Objective

- 🔐 Secure user authentication (session-based)
- 💬 Natural language product queries
- ⚡ Real-time product recommendations
- 📱 Mobile-first responsive design
- 🌐 Cross-origin integration (frontend + backend)
- 👨‍💻 Personalized, guided shopping experience

---

## 🛠️ Tech Stack

### Frontend (React + Vite)
- React.js with Vite
- React Router DOM
- Axios (`withCredentials`)
- React Toastify
- Context API & Custom Hooks
- GlareHover & Ballpit (animations)
- Plain CSS Modules

### Backend (Flask)
- Flask (REST API)
- Flask-CORS
- Flask-SQLAlchemy
- Flask Sessions

### Database
- SQLite (Mock Inventory)
- SQLAlchemy ORM
- Seeded data (100+ products: electronics, books, clothing, etc.)

---

## 🚀 Deployment

- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)
- Axios configured with `withCredentials: true`
- CORS enabled on Flask with `supports_credentials=True`

---

## 🧪 Features

| Feature                   | Description                                                             |
|--------------------------|-------------------------------------------------------------------------|
| 🧑‍💻 Authentication       | Session-based login/signup using Flask sessions                          |
| 💬 Chatbot Interface     | Natural-language search like “Suggest books under ₹500”                 |
| 📦 Real-Time Suggestions | Product replies based on SQLite inventory                               |
| 🗃️ Mock Inventory        | 100+ products across categories                                          |
| 📱 Responsive UI         | Fully functional across desktop, tablet, and mobile                     |
| 🔁 Reset Conversation    | Restart chatbot interaction at any time                                 |
| ✅ Notifications         | Toast success/error messages via React Toastify                         |

---


##  Technical Report :
https://docs.google.com/document/d/14h5dw2PurBraj_Pm_IzWxkZvVk0bC2Vwvp_qvJD6sWA/edit?tab=t.0
