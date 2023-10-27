import React, { useState } from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, editedData, functionToEdit, onSave }) => {
  const [departments, setDepartments] = useState([]);


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


  const handleSave = () => {
    onSave(editedData);
    onRequestClose();
  };
  function findExperience() {
    const dateOfJoining = editedData.dateOfJoining;
    
    if (dateOfJoining) {
      const joinDate = new Date(dateOfJoining);
      const currentDate = new Date();
  
      // Calculate the difference in milliseconds
      const difference = currentDate - joinDate;
  
      // Calculate the number of years of experience
      const yearsOfExperience = difference / (1000 * 60 * 60 * 24 * 365.25); // Approximate days in a year
  
      // Update the state with the calculated experience
      functionToEdit({
        ...editedData,
        yearsOfExperience: Math.floor(yearsOfExperience)
      });
    }
  }

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Edit Modal"
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-md rounded px-6 py-4"
  >
    <h2 className="text-2xl font-semibold mb-4">Edit Employee Data</h2>
    <form>
      <div className="form-input mb-3">
        <label className="text-lg block">Name:</label>
        <input
          type="text"
          value={editedData.name}
          onChange={(e) => functionToEdit({ ...editedData, name: e.target.value })}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="form-input mb-3">
        <label className="text-lg block">Email:</label>
        <input
          type="email"
          value={editedData.email}
          onChange={(e) => functionToEdit({ ...editedData, email: e.target.value })}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="form-input mb-3">
        <label className="text-lg block">Contact Number:</label>
        <input
          type="text"
          value={editedData.contactNumber}
          onChange={(e) => functionToEdit({ ...editedData, contactNumber: e.target.value })}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="form-input mb-3">
        <label className="text-lg block">Date of Joining:</label>
        <input
          type="date"
          value={editedData.dateOfJoining}
          onChange={(e) => {
            functionToEdit({ ...editedData, dateOfJoining: e.target.value });
            findExperience();
          }}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="form-input mb-3">
        <label className="text-lg block">Department:</label>
        <select
          value={editedData.department}
          onClick={getDepartments}
          onChange={(e) => functionToEdit({ ...editedData, department: e.target.value })}
          className="border rounded w-full p-2"
        >
          <option value="">Select Department</option>
          {departments.map((department, index) => (
            <option key={index} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  </Modal>
  );
};

export default EditModal;
