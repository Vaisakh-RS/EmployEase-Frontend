
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import DepartmentForm from './components/DepartmentForm';

import AppBar from './components/AppBar';

function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/src/components/EmployeeForm" element={<EmployeeForm />} />
        <Route path="src/components/DepartmentForm" element={<DepartmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
