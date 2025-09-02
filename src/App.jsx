import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';

const App = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            loginStatus ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setUserDetails={setUserDetails} setLoginStatus={setLoginStatus} />
            )
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            loginStatus ? (
              <Dashboard userDetails={userDetails} />
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
