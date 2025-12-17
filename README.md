# Garments Order & Production Tracker System

A modern, full-stack web application designed for small and medium-sized garment factories to efficiently manage buyer orders, production stages (cutting, sewing, finishing), inventory, payments, and delivery tracking.

Live Site: [https://garments-tracker-projects.netlify.app](https://garments-tracker-projects.netlify.app)  

## Key Features

### User Roles & Authentication
- Three roles: **Admin**, **Manager**, **Buyer**
- Email/password authentication + Google Sign-in
- Role-based dashboard and route protection
- Account approval & suspension system with reason

### Buyer Features
- Browse all products with grid view
- View detailed product page with images and demo video
- Place orders with quantity validation (min/max)
- Stripe payment integration (Pay First) or Cash on Delivery
- My Orders page with cancel option (if pending)
- Visual order tracking timeline

### Manager Features
- Add new products with multiple images, demo video, payment options
- Manage own products (update/delete)
- View and approve/reject pending orders
- Add production & shipping tracking updates
- View approved orders with tracking timeline

### Admin Features
- Full user management (approve, make admin, suspend with reason)
- View all products and orders
- Toggle products to show on homepage

### General Features
- Fully responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Loading spinners & toast notifications
- Framer Motion animations on homepage
- Reusable modals and components
- 404 Not Found page

### Technology Stack

**Frontend (Client)**
- React.js
- React Router 
- Tailwind CSS + DaisyUI
- Tanstack Query (React Query)
- Axios
- React Hook Form
- React Toastify + SweetAlert2
- Framer Motion
- Heroicons
- swiper.js
- carousel

**Backend (Server)**
- Node.js
- Express.js
- MongoDB 
- Stripe Payment Integration
- Firebase Authentication (JWT)
- CORS, dotenv, 

**Deployment**
- Client: Netlify 
- Server: Vercel
- Database: MongoDB Atlas

## Installation & Setup

### Prerequisites
- Node.js 
- MongoDB Atlas account
- Stripe account (for payment)
- Firebase project (for auth)

### Client Setup
```bash
git clone https://github.com/Juma-islam/assignment-number-11-client.git
npm install
npm run dev