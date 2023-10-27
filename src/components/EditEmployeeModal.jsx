import React, { useState } from 'react';
import Modal from 'react-modal';

const EditDepartmentModal = ({ isOpen, onRequestClose, departmentData, managers, onSave }) => {
  const [editedData, setEditedData] = useState(departmentData);

  const handleSave = () => {
    onSave(editedData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Department Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-md rounded px-6 py-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Department Data</h2>
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
          <label className="text-lg block">Location:</label>
          <input
            type="text"
            value={editedData.location}
            onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="form-input mb-3">
          <label className="text-lg block">Manager:</label>
          <select
            value={editedData.managerId}
            onChange={(e) => setEditedData({ ...editedData, managerId: e.target.value })}
            className="border rounded w-full p-2"
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
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

export default EditDepartmentModal;
