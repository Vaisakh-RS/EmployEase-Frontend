import { useState } from 'react';
import "../styles/formStyle.css"
import { useApi } from '../ApiContext';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    contact_number: '',
    date_of_joining: '',
    years_of_experience: '',
    department:'',
  });

  const {api} = useApi();

  const [isDateInput, setIsDateInput] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateInputFocus=()=>{
    setIsDateInput(true);
  }

  const handleDateInputBlur = () => {
    setIsDateInput(false);
  };
  //handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(api)
  };

  const handleClear = () => {
    setFormData({
      employeeId: '',
      name: '',
      email: '',
      contact_number: '',
      date_of_joining: '',
      years_of_experience: '',
      department:'',
    });
  };



return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="form-input">
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            placeholder="Employee ID"
            className="border rounded p-2"
          />
        </div>
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
            name="contact_number"
            value={formData.contact_number}
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
                name="date_of_joining"
                value={formData.date_of_joining}
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
                name="date_of_joining"
                value={formData.date_of_joining}
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