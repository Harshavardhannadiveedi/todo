import React, { useState } from 'react';
import './Signup.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Corrected spelling here
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let formData = {
      username: username,
      email: email,
      password: password, // Corrected spelling here
    };

    let url = 'https://todo-qqgo.onrender.com/api/admin/Signup';

    try {
      const response = await axios.post(url, formData);
      alert(response.data.message);
      console.log("Response data:", response.data);
      setUsername("");
      setEmail("");
      setPassword(""); // Resetting password state
      navigate('/login');
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHandler}>
        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email ID"
          />
        </div>
        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Corrected here
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>
      {/* Footer */}
      <div className="footer">
        <span>Already have an account?</span>
        <Link to="/login" className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
