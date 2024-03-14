import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App1.css';
import EditableCell from './Editecell';
import { Link } from 'react-router-dom';
import PdfDownloadButton from './PdfDownloadButton';
import UserDataCom from './UserDataCom';
import { useFilteredUserData } from './FilteredUserDataContext';

const UserPage = (props) => {
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [editingUserId, setEditingUserId] = useState(null);
    const [sortColumn, setSortColumn] = useState('userId'); // Default sorting column
    const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
    const { filteredUserData } = useFilteredUserData() || {};
 
    console.log("hello",filteredUserData);

    useEffect(() => {
        fetchData();
        
       
    }, [currentPage, pageSize, sortColumn, sortOrder]);

    const fetchData = async () => {
        try {
            let response;
            response = await axios.get(`http://localhost:8090/pagedAndSorted?columnName=${sortColumn}&sortOrder=${sortOrder}&page=${currentPage}&size=${pageSize}`);
            setUserData(response.data);
            if (filteredUserData.length > 0) {
                setUserData(filteredUserData);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
   


    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
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

    const handleSort = (columnName) => {
        // If clicking on the same column, toggle the sort order
        if (columnName === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // If clicking on a different column, set new sort column and default to ascending order
            setSortColumn(columnName);
            setSortOrder('asc');
        }
        // Reset currentPage to 0 when sorting
        setCurrentPage(0);
    };

    const handleFilter = async () => {
        // Reset currentPage to 0 when filtering
        setCurrentPage(0);
        try {
            const response = await axios.get(`http://localhost:8090/sorted?columnName=${sortColumn}&sortOrder=${sortOrder}&page=${currentPage}&size=${pageSize}`);
            setUserData(response.data);
           
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    return (
        <div>
           <h2 className='text-center mt-4 ' style={{color:'tomato'}}>USER DETAILS</h2>
          
           <Link to="/user" className='btn btn-primary'>Add User</Link>
           <Link to="/filet" className='btn btn-primary'>Filter Users</Link>
            <table className='table mt-2'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('userId')}>User ID</th>
                        <th onClick={() => handleSort('userFirstName')}>First Name</th>
                        <th onClick={() => handleSort('userLastName')}>Last Name</th>
                        <th onClick={() => handleSort('userAge')}>Age</th>
                        <th onClick={() => handleSort('userPhoneNo')}>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {userData && userData.map(user => (
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
                                    <button className='btn btn-primary bi bi-pen' onClick={() => handleEdit(user.userId)}></button>
                                )}
                                    <button onClick={() => handleDelete(user.userId)} className='btn btn-danger ml-2 bi bi-trash'></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
                <span>Page: {currentPage + 1}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>
            <div style={{ textAlign: 'right' }}>
            <PdfDownloadButton />
            </div> 
  </div>
    );
};

export default UserPage;
