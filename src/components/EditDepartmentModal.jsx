//To create the edit department modal after setting up the manager thing
import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '320px', // Adjust the width as needed
    padding: '20px', // Add padding
  },
};

const EditDepartmentModal = ({ isOpen, onRequestClose, departmentData,onSave }) => {
  const [editedData, setEditedData] = useState(departmentData);

  const handleSave = () => {
    //onSave(editedData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Department Modal"
      style={customStyles} // Apply custom styles
    >
      <div className="bg-white rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Edit Department Data</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={editedData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <input
              type="text"
              value={editedData.location}
              onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={onRequestClose}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditDepartmentModal;