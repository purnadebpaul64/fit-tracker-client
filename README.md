# 💪 FitTracker – Fitness Training & Booking Platform

A full-stack fitness tracking platform built using the **MERN Stack** and **Firebase Authentication**. FitTracker empowers users to book personal training slots, join fitness classes, apply to become trainers, interact with the community, and manage roles with secure JWT-based access. Developed as part of assignment12_category_007.

### 🔗 Live Site:
👉 [https://fit-tracker-2d229.web.app](https://fit-tracker-2d229.web.app)

---

## 🚀 Features

Here are the top features that make **FitTracker** stand out:

1. 🔐 **Firebase Auth + JWT**: Email/password & social login with secure token-based access to private routes.
2. 📅 **Trainer Booking System**: Members can view trainer availability, choose a slot, and book based on flexible membership plans.
3. 🧑‍🏫 **Trainer Application Workflow**: Members can apply to become trainers with skillsets and schedules.
4. 💳 **Stripe Payment Integration**: Secure and dynamic checkout for selected slots and packages.
5. 🧠 **Role-Based Dashboards**: Fully separated experiences for Admin, Trainer, and Member roles.
6. 📊 **Admin Panel with Analytics**: Admin can manage trainers, view transactions, and compare newsletter vs. paid members with charts.
7. 🧾 **Class & Forum System**: View all classes, trainers, and participate in community forums with upvotes and roles.
8. 📱 **Responsive UI**: Clean and modern responsive design using Material Tailwind + Framer Motion.
9. 📨 **Newsletter Subscription**: Anyone can subscribe to stay updated — saved to database.
10. ⭐ **Review System**: Members can leave reviews for trainers that dynamically display on the homepage.

---

## 🛠 Tech Stack

### 🧩 Frontend
- React 19 + Vite
- Tailwind CSS + Material Tailwind UI
- React Router 7
- Firebase Auth
- React Query (TanStack) – for GET requests
- React Select (Trainer slots)
- React Helmet Async
- Stripe Payment
- Recharts (Dashboard stats)
- SweetAlert2 / React Hot Toast

### 🔧 Backend
- Node.js + Express.js
- MongoDB (No Mongoose)
- JWT Authentication
- Stripe Server SDK
- RESTful API structure

---

## 📂 Project Structure

- `client/` – React app with public and private pages
- `server/` – Express APIs, JWT Auth, and Stripe Integration
- `firebase.config.js` – Hidden with environment variables
- `components/` – Shared UI components
- `pages/` – Public and role-based pages (Trainer, Member, Admin)
