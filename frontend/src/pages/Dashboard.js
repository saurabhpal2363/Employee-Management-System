import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const active = employees.filter((e) => e.status === 'Active').length;
  const inactive = employees.filter((e) => e.status === 'Inactive').length;

  const deptCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="main-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#1e1b4b', fontSize: '1.8rem' }}>
          Welcome back, {user?.name} 👋
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.3rem' }}>
          Here's what's happening in your organization today.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ede9fe' }}>👥</div>
          <div className="stat-info">
            <h3>{employees.length}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#d1fae5' }}>✅</div>
          <div className="stat-info">
            <h3>{active}</h3>
            <p>Active Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fee2e2' }}>❌</div>
          <div className="stat-info">
            <h3>{inactive}</h3>
            <p>Inactive Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>🏢</div>
          <div className="stat-info">
            <h3>{Object.keys(deptCount).length}</h3>
            <p>Departments</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Department Breakdown */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e1b4b' }}>Department Breakdown</h3>
          {Object.keys(deptCount).length === 0 ? (
            <p style={{ color: '#6b7280' }}>No employees yet.</p>
          ) : (
            Object.entries(deptCount).map(([dept, count]) => (
              <div key={dept} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#374151' }}>{dept}</span>
                <strong style={{ color: '#4f46e5' }}>{count}</strong>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1e1b4b' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link to="/employees/add" className="btn btn-primary" style={{ textAlign: 'center' }}>
              ➕ Add New Employee
            </Link>
            <Link to="/employees" className="btn btn-secondary" style={{ textAlign: 'center' }}>
              📋 View All Employees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
