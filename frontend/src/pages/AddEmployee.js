import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createEmployee } from '../utils/api';
import toast from 'react-hot-toast';

const initialState = {
  name: '', email: '', phone: '', department: '',
  position: '', salary: '', joiningDate: '', status: 'Active',
};

const AddEmployee = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createEmployee(formData);
      toast.success('Employee added successfully!');
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>➕ Add New Employee</h1>
        <Link to="/employees" className="btn btn-secondary">← Back to List</Link>
      </div>

      <div className="form-card">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number * (10 digits)</label>
              <input type="text" name="phone" placeholder="9876543210" value={formData.phone} onChange={handleChange} required maxLength={10} />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Position / Job Title *</label>
              <input type="text" name="position" placeholder="Software Engineer" value={formData.position} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Salary (₹) *</label>
              <input type="number" name="salary" placeholder="50000" value={formData.salary} onChange={handleChange} required min={0} />
            </div>
            <div className="form-group">
              <label>Joining Date *</label>
              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Adding...' : '✅ Add Employee'}
            </button>
            <Link to="/employees" className="btn btn-secondary" style={{ textAlign: 'center' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
