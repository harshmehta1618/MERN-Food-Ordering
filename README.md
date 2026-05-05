# MERN Food Ordering System

A full-stack web application for ordering food online, built with the MERN stack (MongoDB, Express, React, Node.js). This project includes three main components: a customer frontend, an admin dashboard, and a backend API server.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This is a complete food ordering platform that allows customers to browse food items, add them to a cart, place orders, and make payments through Stripe. Admin users can manage food inventory, view orders, and add new food items.

The project is divided into three main parts:
- **Frontend**: Customer-facing React application
- **Admin**: Admin dashboard for managing the restaurant
- **Backend**: Express.js server with REST API

## Features

### Customer Frontend
- 🏠 **Home Page**: Browse available food items with category filtering
- 🛒 **Shopping Cart**: Add/remove items, update quantities
- 👤 **User Authentication**: Sign up and login functionality
- 📦 **Order Management**: Place orders and view order history
- 💳 **Payment Integration**: Secure payment processing with Stripe
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface

### Admin Dashboard
- ➕ **Add Food Items**: Create new food products with details
- 📋 **View Food List**: Manage all available food items
- 📊 **Order Management**: Track and manage customer orders
- 🎯 **Real-time Updates**: See orders as they come in

### Backend Services
- 🔐 **User Authentication**: JWT-based secure authentication
- 🔒 **Password Security**: Bcrypt password hashing
- 🛍️ **Cart Management**: Store and manage user shopping carts
- 📦 **Order Processing**: Handle order creation and status updates
- 💰 **Payment Processing**: Stripe integration for secure payments
- 📝 **Food Catalog**: Manage food items and categories

## Tech Stack

### Frontend & Admin
- **React 19.2.0**: Modern React library with hooks
- **React Router v7**: Client-side routing
- **Vite 7.2**: Fast build tool and dev server
- **Axios 1.13**: HTTP client for API requests
- **React Toastify 11.0** (Admin only): Toast notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express 5.2**: Minimalist web framework
- **MongoDB 9.0**: NoSQL database
- **Mongoose 9.0**: MongoDB ODM
- **JWT (JSON Web Tokens)**: Secure authentication
- **Bcrypt 6.0**: Password hashing
- **Stripe 20.0**: Payment processing
- **Multer 2.0**: File upload handling
- **CORS 2.8**: Cross-origin resource sharing
- **Nodemon 3.1**: Development auto-reload

### Development Tools
- **ESLint**: Code quality and style checking
- **Vite**: Next-generation frontend tooling

## Project Structure

```
MERN-Food-Ordering-main/
├── frontend/                 # Customer-facing React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── LoginPopup/
│   │   │   ├── ExploreMenu/
│   │   │   ├── FoodDisplay/
│   │   │   ├── FoodItem/
│   │   │   └── AppDownload/
│   │   ├── pages/            # Page components
│   │   │   ├── Home/
│   │   │   ├── Cart/
│   │   │   └── PlaceOrder/
│   │   ├── context/          # React context for state management
│   │   │   └── StoreContext.jsx
│   │   ├── assets/           # Static assets
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Application entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── admin/                    # Admin dashboard React application
│   ├── admin/
│   │   ├── src/
│   │   │   ├── components/   # Admin components
│   │   │   │   ├── Navbar/
│   │   │   │   └── Sidebar/
│   │   │   ├── pages/        # Admin pages
│   │   │   │   ├── Add/      # Add new food items
│   │   │   │   ├── List/     # View food list
│   │   │   │   └── Orders/   # View orders
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── index.html
│
└── backend/                  # Express.js server
    ├── config/               # Configuration files
    │   └── db.js             # MongoDB connection
    ├── controllers/          # Request handlers
    │   ├── userController.js
    │   ├── foodController.js
    │   ├── cartController.js
    │   └── orderController.js
    ├── models/               # Database schemas
    │   ├── userModel.js
    │   ├── foodModel.js
    │   └── orderModel.js
    ├── routes/               # API routes
    │   ├── userRoute.js
    │   ├── foodRoute.js
    │   ├── cartRoute.js
    │   └── orderRoute.js
    ├── middleware/           # Custom middleware
    │   └── auth.js           # JWT authentication
    ├── uploads/              # Food image storage
    ├── server.js             # Application entry point
    └── package.json
```

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn** (Node package manager)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Git** (for version control)
- **Stripe Account** (for payment processing)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MERN-Food-Ordering-main
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start the backend server
npm run server
```

The backend server will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port shown in console)

### 4. Admin Dashboard Setup

```bash
cd ../admin/admin

# Install dependencies
npm install

# Start the development server
npm run dev
```

The admin dashboard will run on `http://localhost:5174` (or another available port)

## Environment Variables

### Backend (.env file)

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>

# JWT secret key for token generation
JWT_SECRET=your_jwt_secret_key_here

# Stripe API keys
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# Server port (optional, defaults to 4000)
PORT=4000
```

### Frontend (.env file - optional)

Create a `.env` file in the `frontend` directory if needed for custom configurations:

```env
VITE_API_URL=http://localhost:4000
```

## Running the Application

### Development Mode

1. Start MongoDB (if running locally)
2. Start the backend server:
   ```bash
   cd backend && npm run server
   ```
3. Start the frontend development server:
   ```bash
   cd frontend && npm run dev
   ```
4. Start the admin dashboard:
   ```bash
   cd admin/admin && npm run dev
   ```

### Production Build

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

#### Admin
```bash
cd admin/admin
npm run build
npm run preview
```

#### Backend
```bash
cd backend
node server.js  # Make sure nodemon script is removed or use direct node command
```

## API Endpoints

### Authentication Endpoints (`/api/user`)

- `POST /register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /login` - Login user
  - Body: `{ email, password }`

### Food Endpoints (`/api/food`)

- `GET /` - Get all food items
- `GET /:id` - Get food item by ID
- `POST /` - Add new food item (Admin only)
  - Body: `{ name, description, price, image, category }`
- `PUT /:id` - Update food item (Admin only)
- `DELETE /:id` - Delete food item (Admin only)

### Cart Endpoints (`/api/cart`)

- `GET /` - Get user's cart (Requires authentication)
- `POST /add` - Add item to cart (Requires authentication)
  - Body: `{ foodId, quantity }`
- `POST /remove` - Remove item from cart (Requires authentication)
  - Body: `{ foodId }`
- `POST /clear` - Clear entire cart (Requires authentication)

### Order Endpoints (`/api/order`)

- `POST /place` - Place a new order (Requires authentication)
  - Body: `{ items, address, phone, totalAmount }`
- `GET /userorders` - Get user's orders (Requires authentication)
- `GET /` - Get all orders (Admin only)
- `PUT /:id/status` - Update order status (Admin only)

### Image Endpoints

- `GET /images/<filename>` - Retrieve uploaded food images

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  cartData: Object (stores cart items)
}
```

### Food Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required),
  image: String (required),
  category: String (required)
}
```

### Order Model
```javascript
{
  userId: ObjectId (references User),
  items: Array (food items in order),
  amount: Number (total price),
  address: Object,
  status: String (default: 'Food Being Prepared'),
  date: Date,
  payment: Boolean
}
```

## Key Features Implementation

### Authentication Flow
1. User registers with email and password
2. Password is hashed using bcrypt before storage
3. Upon login, credentials are verified
4. JWT token is generated and sent to client
5. Token is stored in localStorage and sent with authenticated requests

### Shopping Cart
1. Cart data is stored in MongoDB (persistent across sessions)
2. Items can be added/removed/updated
3. Cart persists even after logout

### Order Processing
1. User selects items and adds to cart
2. Proceeds to checkout
3. Enters delivery address
4. Payment processed through Stripe
5. Order saved to database with status tracking
6. Admin can view and update order status

### Image Upload
1. Food images are uploaded via multer
2. Stored in `backend/uploads/` directory
3. Accessible via `/images/<filename>` endpoint

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the ESLint configuration and passes all checks.

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally or your MongoDB Atlas connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas

**CORS Error**
- Ensure the backend CORS configuration allows your frontend URL
- Check that the API URL in frontend matches your backend server

**Port Already in Use**
- Change the port in `server.js` (backend) or `vite.config.js` (frontend/admin)
- Or kill the process using the port

**Payment Integration Not Working**
- Verify Stripe keys are correctly set in `.env`
- Check that Stripe account is in test mode for development

## Future Enhancements

- User profile management
- Order history with filtering
- Restaurant menu categories
- Real-time order tracking
- Email notifications
- Rating and review system
- Multiple payment methods
- Admin analytics dashboard

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Happy Ordering! 🍕🍔🍜**
