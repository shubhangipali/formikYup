import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice'; // Update with the actual path

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loginInProgress, error } = useSelector(state => state.auth);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch the login action
      const resultAction = await dispatch(login({ username, password }));

      // Check if login was successful
      if (login.fulfilled.match(resultAction)) {
        // Ensure resultAction.payload is defined and contains necessary data
        const { username, token, decodedToken } = resultAction.payload || {};
        if (username && token) {
          navigate('/dashboard');
        } else {
          alert('Login failed: Invalid response');
        }
      } else {
        // Handle rejected case
        alert('Login failed: ' + (resultAction.payload || 'Unknown error'));
      }
    } catch (error) {
      console.error('Login error', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loginInProgress}>
          {loginInProgress ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
