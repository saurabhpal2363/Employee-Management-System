import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../utils/api';
import toast from 'react-hot-toast';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const fetchEmployees = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (department) params.department = department;
      if (status) params.status = status;
      const { data } = await getEmployees(params);
      setEmployees(data);
    } catch (err) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, [search, department, status]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await deleteEmployee(id);
      toast.success(`${name} deleted successfully`);
      fetchEmployees();
    } catch (err) {
      toast.error('Failed to delete employee');
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>👥 All Employees</h1>
        <Link to="/employees/add" className="btn btn-success">
          ➕ Add Employee
        </Link>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="🔍 Search by name, email, position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'].map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary (₹)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="no-employees">
                    No employees found. <Link to="/employees/add">Add one now!</Link>
                  </td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td><strong>{emp.name}</strong></td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>₹{emp.salary.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <Link to={`/employees/edit/${emp._id}`} className="btn btn-warning">
                          ✏️ Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(emp._id, emp.name)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
