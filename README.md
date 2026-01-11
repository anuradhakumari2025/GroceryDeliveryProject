# 🛒 Grocery Delivery Project

A full-stack **Grocery Delivery Web App** that allows users to browse grocery items, add them to a cart, and place orders. Sellers can add products, update stock, and manage inventory.

---

## 📁 Folder Structure

Frontend /frontend
```bash
groceryDeliveryProject/ 
├──frontend/
 ├── components/
 ├── pages/
 ├── assets/
 ├── App.jsx
 ├── main.jsx
 ├── index.css
```

Backend /backend
```bash
groceryDeliveryProject/ 
├──backend/
 ├── src/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── middleware/
  ├── configs/
  ├── app.js
 ├── server.js
 ├── .env
```

---

## 🧩 Tech Stack

### 🖥 Frontend:
- React.js
- Tailwind CSS
- React Router
- Axios

### 🛠 Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Multer (File uploads)
- Cloudinary (Image storage)

---

## 🌐 Live Demo

Coming soon...

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js
- MongoDB Atlas or local MongoDB
- Cloudinary Account

---

## ⚙️ Backend Setup

### 📍 Navigate to Backend

```bash
cd backend
```

📦 Install Dependencies
```bash
npm install
```

🗝 Create .env File
```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

▶️ Run Server
Server will run at http://localhost:5000

### 📂 API Route Overview

| **Route Path**      | **Description**         | **Handled By**     |
|---------------------|-------------------------|--------------------|
| `/api/user`         | User auth & profile     | `userRouter`       |
| `/api/seller`       | Seller operations       | `sellerRouter`     |
| `/api/product`      | Product management      | `productRouter`    |
| `/api/cart`         | Cart operations         | `cartRouter`       |
| `/api/address`      | Address management      | `addressRouter`    |
| `/api/order`        | Order processing        | `orderRouter`      |


🌐 API Endpoints (Examples)

Authentication

POST /api/user/register

POST /api/user/login

Seller
POST /api/seller/register

POST /api/seller/login

Products
POST /api/product/add (Protected - Seller)

GET /api/product/list

GET /api/product/productById?id=

Cart & Orders
POST /api/cart/add

GET /api/cart/view

POST /api/order/place

🧑‍🎨 Frontend Setup
📍 Navigate to Frontend
bash
Copy
Edit
cd frontend
📦 Install Dependencies
```bash
Copy
Edit
npm install
```
📁 Environment Variables (Optional)
If using environment variables (e.g., for base API URL), create a .env file:

```bash
VITE_API_URL=http://localhost:5000
```

▶️ Run Frontend
```bash
npm run dev
```
App runs on http://localhost:5173

🖼 Features
👤 User
Register/Login

Browse products

Add to cart

Place orders

View order history

🛒 Seller/Admin
Register/Login

Add new products with images

View all products

Update stock

Manage orders

📤 Deployment Suggestions
Backend
Render

Railway

Vercel Functions (API)

Frontend
Vercel

Netlify

GitHub Pages (for static build)

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License.


