import React, { useState } from 'react';

const UpdateEmployee = ({onClose,rowToUpdate}) => {
  const [formData, setFormData] = useState(rowToUpdate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    findExperience();
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `https://employease-backend-production.up.railway.app/api/employees/${formData.id}`; 

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Request was successful
        // You can handle the success response here, e.g., show a success message
        onClose(); // Close the modal or navigate to another page
      } else {
        // Request failed, handle the error
        console.error('POST request failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('POST request error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
