import { useState } from 'react';
import "../styles/formStyle.css"

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    //departmentId: '',
    name: '',
    location: '',
    //managerId:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    // Define the API endpoint
    const apiUrl = 'https://employease-backend-production.up.railway.app/api/departments/'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
        body: JSON.stringify(formData), // Convert formData to JSON
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
        //departmentId: '',
        name: '',
        location: '',
        //managerId:''
    });
  };



return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      {/*<div className="form-input">
          <input
            type="text"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            required
            placeholder="Department ID"
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
    </div>
  );
  
};

export default DepartmentForm;