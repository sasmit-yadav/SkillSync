import './App.css'
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProfileEdit from './pages/ProfileEdit';
import FindCollaborators from './pages/FindCollaborators';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#10101a] overflow-x-hidden">
      <Router>
        <Routes>
           <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/collaborators" element={<FindCollaborators />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

