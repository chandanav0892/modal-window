import React, { useState } from 'react';
import './App.css'

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate username
    if (!formData.username.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Please enter this field.' }));
      isValid = false;
    }

    // Validate email
    if (!formData.email.includes('@')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please include an @ in email address.' }));
      isValid = false;
    }

    // Validate phone number
    if (formData.phone.trim().length !== 10 || isNaN(formData.phone.trim())) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Invalid phone number. Please enter a 10-digit phone number.' }));
      isValid = false;
    }

    // Validate date of birth
    const currentDate = new Date();
    const dobDate = new Date(formData.dob);
    if (dobDate > currentDate) {
      setErrors((prevErrors) => ({ ...prevErrors, dob: 'Invalid date of birth. Date of birth cannot be in future.' }));
      isValid = false;
    }

    if (isValid) {
      setIsOpen(false);
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains('modal')) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <h1>User details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={formData.username} onChange={handleInputChange} />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email Address:</label>
                <input type="text" id="email" value={formData.email} onChange={handleInputChange} />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
