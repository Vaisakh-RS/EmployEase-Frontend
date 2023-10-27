import { useState, useEffect } from 'react';

const ChooseManagerComponent = ({ selectedDepId, setChooseManager }) => {
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

  function assignManager(employee) {
    // Create a copy of the department data with the updated managerId
    const updatedDepartmentData = {
      managerId:employee.id,
    };

    // Define the API endpoint with the department ID you want to update
    const apiUrl = `https://employease-backend-production.up.railway.app/api/departments/${selectedDepId}/`;

    // Define the request options for the PUT request
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Adjust the content type as needed
      },
      body: JSON.stringify(updatedDepartmentData), // Convert data to JSON
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`PUT request failed: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('PUT request successful:', data);
        setChooseManager(false);
      })
      .catch((error) => {
        console.error('PUT request error:', error);
      });
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Eligible Employees</h2>
          <button
            onClick={() => {
              setChooseManager(false);
            }}
            className="text-red-600 hover:text-red-800"
          >
            Close
          </button>
        </div>
        <div>
          {employees
            .filter(
              (employee) =>
                employee.department === selectedDepId &&
                employee.yearsOfExperience >= 5
            )
            .map((employee, index) => (
              <div
                className="p-2 border border-gray-200 rounded-lg mb-2 flex justify-between items-center"
                key={index}
              >
                <div>
                  <p className="text-lg font-semibold">{employee.name}</p>
                  <p>Experience: {employee.yearsOfExperience} years</p>
                </div>
                <button onClick={()=>{assignManager(employee)}}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                >
                  Assign as Manager
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseManagerComponent;
