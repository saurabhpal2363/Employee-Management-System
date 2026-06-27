# 👥 Employee Management System (MERN Stack)

A full-stack web application with CRUD operations, JWT Authentication, and protected routes.

---

## 📁 FOLDER STRUCTURE

```
employee-management-system/
│
├── backend/                    ← Node.js + Express + MongoDB
│   ├── controllers/
│   │   ├── authController.js   ← Login / Register logic
│   │   └── employeeController.js ← CRUD logic
│   ├── middleware/
│   │   └── authMiddleware.js   ← JWT token verification
│   ├── models/
│   │   ├── User.js             ← Admin user schema
│   │   └── Employee.js         ← Employee schema
│   ├── routes/
│   │   ├── authRoutes.js       ← /api/auth/*
│   │   └── employeeRoutes.js   ← /api/employees/*
│   ├── .env                    ← Environment variables (edit this!)
│   ├── package.json
│   └── server.js               ← Main entry point
│
└── frontend/                   ← React.js
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js       ← Top navigation bar
    │   ├── context/
    │   │   └── AuthContext.js  ← Global auth state
    │   ├── pages/
    │   │   ├── Login.js        ← Login page
    │   │   ├── Register.js     ← Register page
    │   │   ├── Dashboard.js    ← Stats overview
    │   │   ├── EmployeeList.js ← View/Search/Delete employees
    │   │   ├── AddEmployee.js  ← Add new employee form
    │   │   └── EditEmployee.js ← Update employee form
    │   ├── utils/
    │   │   └── api.js          ← Axios API calls
    │   ├── App.js              ← Routes setup
    │   ├── App.css             ← All styles
    │   └── index.js            ← React entry point
    └── package.json
```

---

## 🚀 HOW TO RUN THE PROJECT

### STEP 1 — Install MongoDB
Download and install MongoDB Community from: https://www.mongodb.com/try/download/community
After installing, MongoDB runs automatically on port 27017.

### STEP 2 — Setup Backend

Open terminal, go to the backend folder:
```
cd employee-management-system/backend
```

Install packages:
```
npm install
```

Open the `.env` file and you'll see:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```
✅ You can leave this as-is for local development.

Start the backend server:
```
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Server running on http://localhost:5000
```

### STEP 3 — Setup Frontend

Open a NEW terminal window, go to frontend folder:
```
cd employee-management-system/frontend
```

Install packages:
```
npm install
```

Start the React app:
```
npm start
```

Browser will open at: http://localhost:3000

---

## 📌 HOW TO USE

1. Go to http://localhost:3000
2. Click "Register here" to create an admin account
3. Login with your credentials
4. You'll see the Dashboard with stats
5. Click "Add Employee" to add employees
6. Click "Employees" in navbar to see the list
7. Use Edit / Delete buttons to manage employees

---

## 🔑 API ENDPOINTS

| Method | URL | Description | Auth Required |
|--------|-----|-------------|---------------|
| POST | /api/auth/register | Register admin | ❌ |
| POST | /api/auth/login | Login | ❌ |
| GET | /api/auth/me | Get current user | ✅ |
| GET | /api/employees | Get all employees | ✅ |
| POST | /api/employees | Create employee | ✅ |
| GET | /api/employees/:id | Get one employee | ✅ |
| PUT | /api/employees/:id | Update employee | ✅ |
| DELETE | /api/employees/:id | Delete employee | ✅ |

---

## 🛠️ TECH STACK

- **M** — MongoDB (Database)
- **E** — Express.js (Backend framework)
- **R** — React.js (Frontend)
- **N** — Node.js (Runtime)
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **Axios** — HTTP requests
- **React Router** — Page navigation
- **React Hot Toast** — Notifications
