# 📚 Online Book Store (MERN)

A full-stack **Online Book Store Web Application** built using the **MERN stack**.  
It allows users to browse, search, and purchase books with secure payments (Razorpay), while admins can manage books, users, and transactions.  

🔗 **Live Demo**: [Bookstore App](https://book-store-app-psi-henna.vercel.app/)  
📂 **GitHub Repo**: [bookStoreApp](https://github.com/rishabh-2088/bookStoreApp.git)

---

## ✨ Features

### 👤 User
- Secure signup & login with JWT authentication  
- Role-based access control (User / Admin)  
- Browse and download **50+ books**  
- Add books to cart & purchase via Razorpay  
- Manage profile & purchase history  

### 🛠️ Admin
- Add / update / delete books  
- Manage users & roles  
- Track payments & transactions  

### 💡 General
- **20+ REST APIs** (authentication, sessions, books, payments)  
- Optimized UI with **React Hooks & Context API**  
- Responsive design (Flexbox & Grid)  
- **95+ Lighthouse score** with ~40% faster load times  

---

## 🖼️ Screenshots

> Replace these with actual images from your app.

- **Home Page**  
  ![Home Page](<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/f77a62ea-82f8-4e55-86a7-6d26aee58ad0" />)

- **Book Listing**  
  ![Books](<img width="1913" height="1005" alt="Image" src="https://github.com/user-attachments/assets/e1d605d7-75b8-4cff-b217-8eb8ffdee12c" />)

- **Payment Checkout**  
  ![Payment](<img width="1596" height="1040" alt="Image" src="https://github.com/user-attachments/assets/d563b916-b5c4-40cd-b066-8c8cb5e7b9d8" />)

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)  
- Tailwind CSS  
- Axios  

**Backend:**
- Node.js + Express.js  
- MongoDB + Mongoose  
- Razorpay Integration  

**Other Tools:**
- JWT Authentication  
- Postman (API Testing)  
- Git & GitHub  
- Vercel (Frontend Hosting)  
- Render / Railway (Backend Hosting)  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rishabh-2088/bookStoreApp.git
cd bookStoreApp
2️⃣ Setup Backend
bash

cd backend
npm install
Create a .env file inside backend/:

env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
Start backend server:

bash

npm run dev
3️⃣ Setup Frontend
bash

cd frontend
npm install
Create a .env file inside frontend/:

env

VITE_RAZORPAY_KEY_ID=your_key_id
Start frontend:

bash

npm run dev
📡 API Endpoints
Some key REST APIs:

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

GET /api/books → Get all books

POST /api/books → Add a new book (Admin only)

POST /api/payment/order → Create Razorpay order

POST /api/payment/verify → Verify payment

📌 Roadmap
 Add Wishlist functionality

 Add Email Notifications

 Deploy backend on Railway/Render

 Add Docker support




👨‍💻 Author
Rishabh Singh



📧 rishabhs2088@gmail.com
File structure
bookStoreApp/
├── backend/ # Node.js + Express + MongoDB
│ ├── config/ # DB and Razorpay config
│ │ └── db.js
│ │ └── razorpay.js
│ ├── controllers/ # Controller logic
│ │ ├── authController.js
│ │ ├── bookController.js
│ │ └── paymentController.js
│ ├── middleware/ # JWT, error handling
│ │ └── authMiddleware.js
│ ├── models/ # MongoDB models
│ │ ├── User.js
│ │ ├── Book.js
│ │ └── Order.js
│ ├── routes/ # Express routes
│ │ ├── auth.js
│ │ ├── books.js
│ │ └── payment.js
│ ├── .env.example # Backend env variables
│ ├── server.js # Entry point
│ └── package.json
│
├── frontend/ # React + Vite + Tailwind
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # UI components
│ │ │ ├── Navbar.jsx
│ │ │ ├── BookCard.jsx
│ │ │ └── PaymentButton.jsx
│ │ ├── pages/ # Pages
│ │ │ ├── Home.jsx
│ │ │ ├── Books.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Admin.jsx
│ │ ├── context/ # Context API
│ │ │ └── AuthContext.jsx
│ │ ├── services/ # API calls (axios)
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env.example # Frontend env variables
│ ├── vite.config.js
│ └── package.json
│
├── README.md # Documentation
└── LICENSE # License file













