
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';

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
    </Router>
  );
}

export default App;
