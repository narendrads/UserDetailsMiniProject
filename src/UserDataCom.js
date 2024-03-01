import React, { useState } from 'react';
import axios from 'axios';
import './App1.css';

const UserDataCom = () => {
    const [userData, setUserData] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8090/get');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (userId) => {
        setEditingUserId(userId);
    };

    const handleSave = async (userId, updatedUserData) => {
        try {
            await axios.put(`http://localhost:8090/update/${userId}`, updatedUserData);
            fetchData();
            setEditingUserId(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8090/delete/${userId}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    return (
        <div>
            
            <button onClick={fetchData} className='btn btn-primary'>User Details</button>

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
                    {userData.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <EditableCell
                                value={user.userFirstName}
                                editing={editingUserId === user.userId}
                                onChange={(value) => handleSave(user.userId, { ...user, userFirstName: value })}
                            />
                            <EditableCell
                                value={user.userLastName}
                                editing={editingUserId === user.userId}
                                onChange={(value) => handleSave(user.userId, { ...user, userLastName: value })}
                            />
                            <EditableCell
                                value={user.userAge}
                                editing={editingUserId === user.userId}
                                onChange={(value) => handleSave(user.userId, { ...user, userAge: value })}
                            />
                            <EditableCell
                                value={user.userPhoneNo}
                                editing={editingUserId === user.userId}
                                onChange={(value) => handleSave(user.userId, { ...user, userPhoneNo: value })}
                            />
                            <td>
                                {editingUserId === user.userId ? (
                                    <button className='btn btn-primary' onClick={() => handleSave(user.userId, user)}>Save</button>
                                ) : (
                                    <button className='btn btn-primary' onClick={() => handleEdit(user.userId)}>Edit</button>
                                )}
                                    <button onClick={() => handleDelete(user.userId)} className='btn btn-danger ml-2'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const EditableCell = ({ value, editing, onChange }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleInputChange = (e) => {
        setLocalValue(e.target.value);
    };

    const handleInputBlur = () => {
        onChange(localValue);
    };

    return editing ? (
        <td><input type="text" value={localValue} onChange={handleInputChange} onBlur={handleInputBlur} /></td>
    ) : (
        <td>{value}</td>
    );
};

export default UserDataCom;
