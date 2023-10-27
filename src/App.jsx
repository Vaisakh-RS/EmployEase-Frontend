
import React from 'react';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer/>
    </Router>
    </>
  );
}

export default App;
