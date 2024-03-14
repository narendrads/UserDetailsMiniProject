import React, { useState } from 'react';
import axios from 'axios';
import './App1.css'
import { Link } from 'react-router-dom';


const UserDataComponent = () => {
    const [userFilters, setUserFilters] = useState({
        userId: '',
        userFirstName: '',
        userLastName: '',
        userAge: '',
        userPhoneNo: ''
    });
    const [filteredUserData, setFilteredUserData] = useState([]);

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
            setFilteredUserData(response.data);
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
                </form>
            </div>
            <h2>Filtered User Data</h2>
            <table className='table mt-4'>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserData.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userFirstName}</td>
                            <td>{user.userLastName}</td>
                            <td>{user.userAge}</td>
                            <td>{user.userPhoneNo}</td>
                            <td>
                                <button onClick={() => handleEdit(user.userId)} className='btn btn-primary'>Edit</button>
                                <button onClick={() => handleDelete(user.userId)} className='btn btn-danger ml-2'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDataComponent;
