// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login1';
import Home from './components/Home';
import ChatScreen from './components/ChatScreen';
import Contact from './pages/Contact';
import Header from './components/common/header';
import Footer from './components/common/footer';
import AboutUs from './pages/AboutUs';
import CartItems from './components/cart/CartItems';
import CardDetails from './components/card/CardDetails';
import FavouriteItem from './components/cart/FavouriteItem';

const App = () => {
  return (
    // <AuthProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favourite" element={<FavouriteItem />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/cardDetails/:id" element={<CardDetails />} />
          <Route path="/cartPage" element={<CartItems />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<ChatScreen />} />
          </Route>
          {/* Add more protected routes here */}
        </Routes>
        <Footer/>
      </Router>
    // </AuthProvider>
  );
};

export default App;
