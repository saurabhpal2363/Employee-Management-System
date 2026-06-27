import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">👥 EMS Admin</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/employees/add">Add Employee</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="navbar-user">👤 {user?.name}</span>
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
