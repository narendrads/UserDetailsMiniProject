import React, { useState } from 'react';
import axios from 'axios';
import './App1.css';
import { Link } from 'react-router-dom';

const MyFormComponent = () => {
    const [formData, setFormData] = useState({
        userFirstName: '',
        userLastName: '',
        userAge: '',
        userPhoneNo: ''
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/save', formData);
            console.log(response.data);
            // Handle success, reset form, show confirmation, etc.
        } catch (error) {
            console.error('Error submitting form:', error.message); // Log the error message
            // Handle error
        }
    };
    
    return (
       <div>
         <Link to="/" className='btn btn-primary'>Back to User Details</Link>
         <div className="form-container">
           
            <h2>POST DATA</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userFirstName">User First Name:</label>
                    <input type="text" id="userFirstName" name="userFirstName" value={formData.userFirstName} onChange={handleChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="userLastName">User Last Name:</label>
                    <input type="text" id="userLastName" name="userLastName" value={formData.userLastName} onChange={handleChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="userAge">User Age:</label>
                    <input type="number" id="userAge" name="userAge" value={formData.userAge} onChange={handleChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="userPhoneNo">User Phone Number:</label>
                    <input type="number" id="userPhoneNo" name="userPhoneNo" value={formData.userPhoneNo} onChange={handleChange} className="form-control"/>
                </div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
       </div>
    );
};

export default MyFormComponent;
