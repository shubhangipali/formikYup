import React from 'react';
import ChatScreen from './ChatScreen';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
// import { useAuth } from '../AuthContext';

const Dashboard = () => {
  // const { user, logout } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
 // Handle logout
 const handleLogout = () => {
  dispatch(logout()); // Dispatch the logout action
};

  return (
    <div className="container">
      <h1>dashboard</h1>
    <Link to='/chat'>  <ChatScreen /></Link>
      <Profile/>
      {user && <h1>Welcome, {user.username}</h1>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
