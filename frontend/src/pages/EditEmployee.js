import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getEmployee, updateEmployee } from '../utils/api';
import toast from 'react-hot-toast';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '',
    position: '', salary: '', joiningDate: '', status: 'Active',
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await getEmployee(id);
        setFormData({
          ...data,
          joiningDate: data.joiningDate ? data.joiningDate.split('T')[0] : '',
        });
      } catch (err) {
        toast.error('Failed to load employee data');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateEmployee(id, formData);
      toast.success('Employee updated successfully!');
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="loading">Loading employee data...</div>;

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>✏️ Edit Employee</h1>
        <Link to="/employees" className="btn btn-secondary">← Back to List</Link>
      </div>

      <div className="form-card">
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone Number * (10 digits)</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required maxLength={10} />
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
              <input type="text" name="position" value={formData.position} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Salary (₹) *</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} required min={0} />
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
            <button type="submit" className="btn btn-warning" disabled={loading}>
              {loading ? 'Updating...' : '💾 Update Employee'}
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

export default EditEmployee;
