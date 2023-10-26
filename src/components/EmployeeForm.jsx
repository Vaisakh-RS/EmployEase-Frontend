import { useState } from 'react';
import "../styles/formStyle.css"

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    //employeeId: '',
    name: '',
    email: '',
    contactNumber: '',
    dateOfJoining: '',
    yearsOfExperience: '',
  });

  const [departments, setDepartments] = useState([]);

  const [isDateInput, setIsDateInput] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getDepartments = async () => {
    const apiUrl = 'http://127.0.0.1:8000/api/departments/';

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
  };

  const handleDateInputFocus=()=>{
    setIsDateInput(true);
  }

  const handleDateInputBlur = () => {
    setIsDateInput(false);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData)

  const apiUrl = 'http://127.0.0.1:8000/api/employees/';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Adjust the content type as needed
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

  const handleClear = () => {
    setFormData({
      //employeeId: '',
      name: '',
      email: '',
      contactNumber: '',
      dateOfJoining: '',
      yearsOfExperience: '',
    });
  };



return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
                placeholder='Date of Joining'
                onFocus={handleDateInputFocus}
                onBlur={handleDateInputBlur}
                className="border rounded p-2"
              />
            )}
          
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
    </div>
  );
  
};

export default EmployeeForm;