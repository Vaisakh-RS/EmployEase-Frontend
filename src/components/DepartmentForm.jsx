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
import EditDepartmentModal from './EditDepartmentModal';

const DepartmentForm = () => {
  const [ChooseManager,setChooseManager] = useState(false)
  const [selectedDepId,setSelectedDepId] = useState()
  const [refresh,setRefresh] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  const [tableData,setTableData]=useState([]);
  const [employees, setEmployees] = useState([]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);



  function getEmployees() {
    const apiUrl = 'https://employease-backend-production.up.railway.app/api/employees/';

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
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
 
    const apiUrl = `https://employease-backend-production.up.railway.app/api/departments/${row.id}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      if (response.ok) {
        console.log(`DELETE request successful for department with ID ${row.id}`);
        CustomToastSuccess('Department Successfully Deleted.');
  
        setTableData((prevData) => prevData.filter((item) => item.id !== row.id));
      } else {

        console.error('DELETE request failed:', response.status, response.statusText);
        CustomToastError('Failed to delete department due to active employees.');
      }
    } catch (error) {

      console.error('DELETE request error:', error);
    }
  };

  

  async function getDepartments() {
    const apiUrl = 'https://employease-backend-production.up.railway.app/api/departments/';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setTableData(responseData); 
      } else {
        console.error('GET request failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('GET request error:', error);
    }
  }
  function convertManagerIdToName(managerId) {
  
    if (employees.length === 0) {
      return 'Loading...'; 
    }

   
    const employee = employees.find((employee) => employee.id === managerId);

    if (employee) {
      return employee.name; 
    } else {
      return 'Manager not Assigned'; 
    }
  }


  const handleUpdate = (row) => {
    setEditModalOpen(true);
    setDepartmentToEdit(row);
  };


  
  const handleSave = (editedData) => {
    
  

    const apiUrl = `https://employease-backend-production.up.railway.app/api/departments/${editedData.id}`;
  
    const requestOptions = {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(editedData), 
    };
  
    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
 
          console.log('PUT request successful');
          CustomToastSuccess('Department Successfully Updated.');
  
          setTableData((prevData) =>
            prevData.map((item) =>
              item.id === editedData.id ? editedData : item
            )
          );
  

          setEditModalOpen(false);
        } else {

          console.error('PUT request failed:', response.status, response.statusText);
          CustomToastError('Failed to update department.');
  

          setEditModalOpen(false);
        }
      })
      .catch((error) => {

        console.error('PUT request error:', error);
  
        setEditModalOpen(false)
      });
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    const apiUrl = 'https://employease-backend-production.up.railway.app/api/departments/'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        setRefresh(!refresh)

        const responseData = await response.json(); 
        console.log('POST request successful:', responseData);
        CustomToastSuccess('Department Successfully Added.');
      } else {
  
        
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
 
return (
  <> <AppBar/>
    <div className="form-container min-h-[100vh]">
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
    {isEditModalOpen && departmentToEdit && (
        <EditDepartmentModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
          departmentToEdit={departmentToEdit}
          onSave={handleSave}
          /> 
          
    )} 
    </>
  );
  
};

export default DepartmentForm;