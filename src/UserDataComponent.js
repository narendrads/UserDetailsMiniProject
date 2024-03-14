import React, { useState } from 'react';
import axios from 'axios';
import './App1.css'
import { Link } from 'react-router-dom';
import { useFilteredUserData } from './FilteredUserDataContext'; // Import the context hook

const UserDataComponent = () => {
    const [userFilters, setUserFilters] = useState({
        userId: '',
        userFirstName: '',
        userLastName: '',
        userAge: '',
        userPhoneNo: ''
        
    });
    console.log('sss',userFilters);
    const { setFilteredUserData } = useFilteredUserData()||[]; // Get the setter function from context
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const filteredData = Object.fromEntries(Object.entries(userFilters).filter(([_, v]) => v !== ''));
            
            const response = await axios.get('http://localhost:8090/users', {
                params: filteredData
            });
            console.log('data',response.data);
            setFilteredUserData(response.data); // Set filtered data using context
            
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const handleEdit = (userId) => {
        // Handle edit action
    };

    const handleDelete = (userId) => {
        // Handle delete action
    };
    

    return (
        <div>
            <Link to="/" className='btn btn-primary'>Back to User Details</Link>
            <div className="form-container">
                <form onSubmit={handleSubmit} className='form'>
                 
                        <label>User ID:</label>
                        <input type="text" name="userId" value={userFilters.userId} onChange={handleChange} className="form-control" />
                    
                   
                        <label>User First Name:</label>
                        <input type="text" name="userFirstName" value={userFilters.userFirstName} onChange={handleChange} className="form-control"/>
                   
                        <label>User Last Name:</label>
                        <input type="text" name="userLastName" value={userFilters.userLastName} onChange={handleChange} className="form-control"/>
                   
                        <label>User Age:</label>
                        <input type="number" name="userAge" value={userFilters.userAge} onChange={handleChange} className="form-control"/>
                    
                    
                        <label>User Phone Number:</label>
                        <input type="text" name="userPhoneNo" value={userFilters.userPhoneNo} onChange={handleChange} className="form-control"/>
                    
                        <button type="submit" className='btn btn-primary'>Filter</button>
                    <Link to='/' className='btn btn-primary m-lg-4'>Viwe filtered data</Link>
                                        </form>
            </div>
        </div>
    );
};

export default UserDataComponent;
