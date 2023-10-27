'use client';

import React from 'react';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/DepartmentForm" element={<DepartmentForm />} />
      </Routes>
      <Footer />  
    </Router>

    </>
  );
}

export default App;
