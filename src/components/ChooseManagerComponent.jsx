import "../styles/ChooseManager.css";
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

const ChooseManagerComponent = ({selectedDepId,setChooseManager}) => {

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

      useEffect(() => {
        getEmployees();
      }, []);

    return ( 
        <div className="base">
            <div className="closeicon">
                <Fab
                  color="error"
                  aria-label="close"
                  onClick={() => {
                    setChooseManager(false);
                }}
                >
                  <CloseIcon />
                </Fab>
            </div>
            <h2>Eligible Employees</h2>
            <div>
              {employees
                .filter(
                  (employee) =>
                    employee.department === selectedDepId &&
                    employee.yearOfExperience <= 5
                )
                .map((employee, index) => (
                  <div className="employee" key={index}>
                    <p>{employee.name}</p>
                    <p>{employee.yearOfExperience}</p>
                    <button>Assign as Manager</button>
                  </div>
                ))}
            </div>
        </div>
     );
}
 
export default ChooseManagerComponent;