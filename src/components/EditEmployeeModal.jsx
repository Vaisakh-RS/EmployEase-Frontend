import React, { useState } from 'react';
import Modal from 'react-modal';
import { CustomToastError, CustomToastSuccess } from './CustomToast';

const UpdateEmployee = ({onClose,rowToUpdate,isOpen,onRequestClose}) => {
  const [formData, setFormData] = useState(rowToUpdate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        CustomToastSuccess("Employee Details Updated")
      } else {
        // Request failed, handle the error
        console.error('POST request failed:', response.status, response.statusText);
        CustomToastError("Employee Details cannot be Updated");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('POST request error:', error);
    }
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Edit Employee Modal"
    className="modal"
    style={{
      overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      content: {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        padding: '0',
        border: 'none',
        background: 'none',
        width: '70%', 
        maxWidth: '400px', 
      },
    }}
  >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Date of Joining:</label>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                onClick={findExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
  );
}


export default UpdateEmployee;
