import {  useEffect, useState } from 'react';
import "../styles/formStyle.css";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from './AppBar';
import EditEmployeeModal from './EditEmployeeModal';
import { CustomToastSuccess, CustomToastError } from './CustomToast';


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
  const [editedData, setEditedData] = useState(formData);
  const [rowToUpdate, setRowToUpdate] = useState()
  const [refresh,setRefresh]= useState(false);


  const handleUpdate = (row) => {
    console.log("hello");
    setEditModalOpen(true);
    setRowToUpdate(row);
  };

  const handleSaveEditedData = () => {
    // Define the API endpoint with the employee ID you want to update
    const apiUrl = `https://employease-backend-production.up.railway.app/api/employees/${rowToUpdate.id}`;

    // Define the request options for the PUT request
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Adjust the content type as needed
      },
      body: JSON.stringify(editedData), // Assuming editedData contains the data to send
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Request was successful, handle the response here
          setRefresh(!refresh)  
          // Update the tableData state to reflect the changes
          setTableData((prevData) =>
            prevData.map((item) =>
              item.id === editedData.id ? { ...item, ...editedData } : item
            )
          );

          // Close the edit modal
          setEditModalOpen(false);
        } else {
          // Request failed, handle the error
          console.error('PUT request failed:', response.status, response.statusText);
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error('PUT request error:', error);
      });
  };

  const handleDelete = (employee) => {
    const apiUrl = `https://employease-backend-production.up.railway.app/api/employees/${employee.id}`;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Request was successful, handle the response here
          CustomToastSuccess('Employee Details Successfully Deleted.');
          // Remove the deleted employee from the tableData state
          setTableData((prevData) => prevData.filter((item) => item.id !== employee.id));
        } else {
          // Request failed, handle the error
          CustomToastError('Failed to Delete Employee Details');
          console.error('DELETE request failed:', response.status, response.statusText);
        }
      })
      .catch((error) => {
        // Handle any network or other errors
        console.error('DELETE request error:', error);
      });
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

    if (response.ok) { setRefresh(!refresh)
      // Request was successful, handle the response here
      const responseData = await response.json(); // Parse the response if it returns JSON
      CustomToastSuccess('Employee Details Successfully Added.');
      console.log('POST request successful:', responseData);
    } else {
      // Request failed, handle the error
      console.error('POST request failed:', response.status, response.statusText);
      CustomToastError('Failed to add Employee Details.');
      CustomToastError('Make sure you select a Department.');
    }
  } catch (error) {
    // Handle any network or other errors
    console.error('POST request error:', error);
  }

};

//To display the employees data from db
useEffect(() => {
  getDepartments();
  const apiUrl = 'https://employease-backend-production.up.railway.app/api/employees';
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      setTableData(data);
    })
    .catch((error) => {
      console.error('Error fetching employee data:', error);
    });
}, [refresh]);

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
  function convertToDepName(depId) {
    const department = departments.find((dep) => dep.id === depId);
    return department ? department.name : ''; // Return the department name if found, otherwise an empty string
  }

return (
  <>
   <AppBar/>  
    <div className="form-container min-h-[100vh]">
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
            type="number"
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

        <div className='form-input'>
          <select name='department' value={formData.department} onChange={handleChange} onClick={getDepartments} className='border rounded p-2 w-70'>
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
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
                  <TableCell>{convertToDepName(row.department)}</TableCell>
                  <TableCell>
                    <button onClick={() => handleUpdate(row)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Update</button>
                    <button onClick={() => handleDelete(row)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Delete</button>
                  </TableCell>
                </TableRow>
              ))}

                {isEditModalOpen && (
                    <EditEmployeeModal
                      isOpen={isEditModalOpen}
                      onRequestClose={() => setEditModalOpen(false)}
                      editedData={editedData}
                      functionToEdit={setEditedData}
                      onSave={handleSaveEditedData}
                    />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
    </>
  );
  
};

export default EmployeeForm;