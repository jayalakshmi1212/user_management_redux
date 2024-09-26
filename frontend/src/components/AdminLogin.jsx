// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../store/adminAuthSlice';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.adminAuth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(formData)).then((result) => {
      if (!result.error) {
        navigate('/admin/dashboard');  // Redirect to dashboard on success
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          {error && <p className="error">{error}</p>}

          <div className="input-group">
            <i className="fa-regular fa-user"></i>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              required
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              autoComplete="off"
            />
          </div>

          <button id="btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;