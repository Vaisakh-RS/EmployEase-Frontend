import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditEmployeeModal = ({ isOpen, onRequestClose, departmentData, onSave }) => {
  const [editedData, setEditedData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    dateOfJoining: '',
    department: '',
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (isOpen && departmentData) {
      setEditedData(departmentData);
    }
  }, [isOpen, departmentData]);

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
        setDepartments(responseData);
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
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-md rounded px-6 py-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Employee Data</h2>
      <form>
        <div className="form-input mb-3">
          <label className="text-lg block">Name:</label>
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="form-input mb-3">
          <label className="text-lg block">Email:</label>
          <input
            type="email"
            value={editedData.email}
            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="form-input mb-3">
          <label className="text-lg block">Contact Number:</label>
          <input
            type="text"
            value={editedData.contactNumber}
            onChange={(e) => setEditedData({ ...editedData, contactNumber: e.target.value })}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="form-input mb-3">
          <label className="text-lg block">Date of Joining:</label>
          <input
            type="date"
            value={editedData.dateOfJoining}
            onChange={(e) => setEditedData({ ...editedData, dateOfJoining: e.target.value })}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="form-input mb-3">
          <label className="text-lg block">Department:</label>
          <select
            value={editedData.department}
            onClick={getDepartments}
            onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={onRequestClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover-bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeModal;
