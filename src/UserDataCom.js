import React, { useState } from 'react';
import axios from 'axios';

const UserDataCom = () => {
    const [userData, setUserData] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchData = async () => {
        try {
            let url = 'http://localhost:8090/users';
            if (filter) {
                url += `?${filter}`;
            }
            const response = await axios.get(url);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleFilter = () => {
        fetchData();
    };

    return (
        <div>
            <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by column (e.g., userFirstName=krishna)" />
            <button onClick={handleFilter}>Filter</button>

            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userFirstName}</td>
                            <td>{user.userLastName}</td>
                            <td>{user.userAge}</td>
                            <td>{user.userPhoneNo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDataCom;
