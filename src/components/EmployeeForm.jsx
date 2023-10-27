import {  useEffect, useState } from 'react';
import "../styles/formStyle.css";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditModal from './EditEmployeeModal';



const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    //employeeId: '',
    name: '',
    email: '',
    contactNumber: '',
    dateOfJoining: '',
    yearsOfExperience: '',
    department:''
  });


  const [tableData,setTableData]=useState([]);

  const [departments, setDepartments] = useState([]);

  const [isDateInput, setIsDateInput] = useState(false);

  //To handle the modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);


  const handleUpdate = (row) => {
    setDataToEdit(row);
    setEditModalOpen(true);
  };

  const handleSaveEditedData = (editedData) => {
    // Implement the logic to save the edited data to your data source
    // Update the table data or make an API request to save the changes
    // Close the modal
    setEditModalOpen(false);
  };

  const handleDelete = (row) => {
    // Implement the logic to delete the employee
    // Update the table data or make an API request to delete the employee
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function findExperience() {
    const dateOfJoining = formData.dateOfJoining;
    
    if (dateOfJoining) {
      const joinDate = new Date(dateOfJoining);
      const currentDate = new Date();
  
      // Calculate the difference in milliseconds
      const difference = currentDate - joinDate;
  
      // Calculate the number of years of experience
      const yearsOfExperience = difference / (1000 * 60 * 60 * 24 * 365.25); // Approximate days in a year
  
      // Update the state with the calculated experience
      setFormData({
        ...formData,
        yearsOfExperience: Math.floor(yearsOfExperience).toFixed(2)
      });
    }
  }

  async function getDepartments() {
    const apiUrl = 'https://employease-backend-production.up.railway.app/api/departments/';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setDepartments(responseData); // Update the state with the fetched departments
      } else {
        console.error('GET request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('GET request error:', error);
    }
  }

  const handleDateInputFocus=()=>{
    setIsDateInput(true);
  }

  const handleDateInputBlur = () => {
    setIsDateInput(false);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
   //useeffect
  console.log(formData)

  const apiUrl = 'https://employease-backend-production.up.railway.app/api/employees/';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Assuming formData contains the data to send
    });

    if (response.ok) {
      // Request was successful, handle the response here
      const responseData = await response.json(); // Parse the response if it returns JSON
      console.log('POST request successful:', responseData);
    } else {
      // Request failed, handle the error
      console.error('POST request failed:', response.status, response.statusText);
    }
  } catch (error) {
    // Handle any network or other errors
    console.error('POST request error:', error);
  }

};

//To display the employees data from db
useEffect(() => {
  const apiUrl = 'https://employease-backend-production.up.railway.app/api/employees';
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setTableData(data);
    })
    .catch((error) => {
      console.error('Error fetching employee data:', error);
    });
}, []);

  const handleClear = () => {
    setFormData({
      //employeeId: '',
      name: '',
      email: '',
      contactNumber: '',
      dateOfJoining: '',
      yearsOfExperience: '',
      department:'',
    });
  };



 
  
return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className='mb-10'>
      {/*<div className="form-input">
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            placeholder="Employee ID"
            className="border rounded p-2"
          />
      </div>*/}
        <div className="form-input">
          
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="border rounded p-2"
          />
        </div>
        <div className="form-input">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='Email'
            className="border rounded p-2"
          />
        </div>
        <div className="form-input">
          
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder='Contact'
            className="border rounded p-2"
          />
        </div>
        <div className="form-input">
            {isDateInput?(
                <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={(e)=>{
                  handleChange(e);
                  findExperience();
                }}
                required
                placeholder='Date of Joining'
                onFocus={handleDateInputFocus}
                onBlur={handleDateInputBlur}
                className="border rounded p-2"
              />
            ):(
                <input
                type="text"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={(e)=>{
                  handleChange(e);
                  findExperience();
                }}
                required
                placeholder='Date of Joining'
                onFocus={handleDateInputFocus}
                onBlur={handleDateInputBlur}
                className="border rounded p-2"
              />
            )}
          
        </div>
        <p>Years of Experience:{formData.yearsOfExperience}</p>

        <div className='form-input'>
          <select name='department' value={formData.department} onChange={handleChange} onClick={getDepartments} className='border rounded p-2 w-70'>
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <p>Selected Department: {formData.department}</p>
        </div>

        <div>
          <button
            type="submit"
            className="form-button bg-green-500 text-white p-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="form-button bg-red-500 text-white p-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>
      {tableData.length > 0 && (
        <TableContainer component={Paper} className='w-20'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className='bg-slate-200'>
                <TableCell className='font-sans' >Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Date of Joining</TableCell>
                <TableCell>Years of Experience</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.contactNumber}</TableCell>
                  <TableCell>{row.dateOfJoining}</TableCell>
                  <TableCell>{row.yearsOfExperience}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    <button onClick={() => handleUpdate(row)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Update</button>
                    <button onClick={() => handleDelete(row)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Delete</button>
                  </TableCell>
                </TableRow>
              ))}

              {isEditModalOpen && (
                  <EditModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setEditModalOpen(false)}
                    dataToEdit={dataToEdit}
                    onSave={handleSaveEditedData}
                  />
            )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
  
};

export default EmployeeForm;