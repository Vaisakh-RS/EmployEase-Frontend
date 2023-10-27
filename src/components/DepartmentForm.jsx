import { useState,useEffect } from 'react';
import "../styles/formStyle.css";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ChooseManagerComponent from './ChooseManagerComponent';
import { CustomToastSuccess, CustomToastError } from './CustomToast';
import AppBar from './AppBar';

const DepartmentForm = () => {
  const [ChooseManager,setChooseManager] = useState(false)
  const [selectedDepId,setSelectedDepId] = useState()
  const [refresh,setRefresh] = useState(false)
  const [formData, setFormData] = useState({
    //departmentId: '',
    name: '',
    location: '',
    //managerId:''
  });

  const [tableData,setTableData]=useState([]);
  const [employees, setEmployees] = useState([]);

  function getEmployees() {
    const apiUrl = 'https://employease-backend-production.up.railway.app/api/employees/';

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Adjust the content type as needed
      },
    };

    return fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GET request failed: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {

        console.log('GET request successful:', data);
        setEmployees(data);

      })
      .catch((error) => {
        console.error('GET request error:', error);
        throw error;
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (row) => {
    // Define the API endpoint with the department ID you want to delete
    const apiUrl = `https://employease-backend-production.up.railway.app/api/departments/${row.id}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      });
  
      if (response.ok) {
        console.log(`DELETE request successful for department with ID ${row.id}`);
        CustomToastSuccess('Department Successfully Deleted.');
        // You might want to remove the deleted department from your state
        setTableData((prevData) => prevData.filter((item) => item.id !== row.id));
      } else {
        // Request failed, handle the error
        console.error('DELETE request failed:', response.status, response.statusText);
        CustomToastError('Failed to delete department due to active employees.');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('DELETE request error:', error);
    }
  };

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
        setTableData(responseData); // Update the state with the fetched departments
      } else {
        console.error('GET request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('GET request error:', error);
    }
  }
  function convertManagerIdToName(managerId) {
    // Check if employees data is available
    if (employees.length === 0) {
      return 'Loading...'; // You can return a loading message or any other appropriate value
    }

    // Find the employee with the matching managerId
    const employee = employees.find((employee) => employee.id === managerId);

    if (employee) {
      return employee.name; // Return the employee name if found
    } else {
      return 'Manager not Assigned'; // Return a message if manager is not found
    }
  }


  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setTableData((prevData) => [...prevData, formData]);
    console.log(formData)
    // Define the API endpoint
    const apiUrl = 'https://employease-backend-production.up.railway.app/api/departments/'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS' // Adjust the content type as needed
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });

      if (response.ok) {
        setRefresh(!refresh)
        // Request was successful, handle the response here
        const responseData = await response.json(); // Parse the response if it returns JSON
        console.log('POST request successful:', responseData);
        CustomToastSuccess('Department Successfully Added.');
      } else {
        // Request failed, handle the error
        
        console.error('POST request failed:', response.status, response.statusText);
        CustomToastError('Creation of new Department failed');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('POST request error:', error);
      CustomToastError('An error occurred while adding the department');
    }
  };

  const handleClear = () => {
    setFormData({
        //departmentId: '',
        name: '',
        location: '',
        //managerId:''
    });
  };
  useEffect(() => {
    getDepartments();
    getEmployees();
  }, [ChooseManager,refresh]);
 

const choosemanager=()=>{
  
}

const handleUpdate=()=>{
  
}

return (
  <> <AppBar/>
    <div className="form-container">
      <div>
        {ChooseManager ? (
          <ChooseManagerComponent selectedDepId={selectedDepId} setChooseManager={setChooseManager}/>
       ) : null}
      </div>
      <form onSubmit={handleSubmit} className='mb-10'>
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
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder='Location'
            className="border rounded p-2"
          />
        </div>
        {/*<div className="form-input">
          
          <input
            type="text"
            name="managerId"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder='Manager ID'
            className="border rounded p-2"
          />
      </div>*/}
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
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{convertManagerIdToName(row.managerId)}</TableCell>
                  <TableCell>
                  <TableCell>
                    <button onClick={() => handleUpdate(row)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Update</button>
                    <button onClick={() => handleDelete(row)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Delete</button>
                  </TableCell>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => {
                      setChooseManager(true)
                      setSelectedDepId(row.id)
                      }} className=' bg-indigo-500 text-white p-2 rounded'>Choose Manager</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
    </>
  );
  
};

export default DepartmentForm;