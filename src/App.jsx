
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from './components/AppBar';
function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="EmployEase-Frontend/src/components/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/DepartmentForm" element={<DepartmentForm />} />
        <Route path="" element={<DepartmentForm />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
