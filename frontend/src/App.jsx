import { useState } from 'react'
import LoginSignup from './components/Login'
import HomePage from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store/store"; 
import EditProfile from './components/Editprofile';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/edit" element={<EditProfile />} /> 
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
    </Provider>
  )
}

export default App
