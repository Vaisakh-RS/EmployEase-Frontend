import React, { useState } from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, dataToEdit, onSave }) => {
  const [editedData, setEditedData] = useState(dataToEdit);
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



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Modal"
    >
      <h2>Edit Employee Data</h2>
      <form>
        <div className="form-input">
          <label>Name:</label>
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label>Email:</label>
          <input
            type="email"
            value={editedData.email}
            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label>Contact Number:</label>
          <input
            type="text"
            value={editedData.contactNumber}
            onChange={(e) => setEditedData({ ...editedData, contactNumber: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label>Date of Joining:</label>
          <input
            type="date"
            value={editedData.dateOfJoining}
            onChange={(e) => setEditedData({ ...editedData, dateOfJoining: e.target.value })}
          />
        </div>
        <div className="form-input">
          <label>Department:</label>
          <select
            value={editedData.department}
            onClick={getDepartments}
            onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EditModal;
