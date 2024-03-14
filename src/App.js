import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilteredUserDataProvider } from './FilteredUserDataContext';
import UserPage from './userCom';
import MyFormComponent from './MyFormComponent';
import UserDataComponent from './UserDataComponent';

function App() {
  return (
    <FilteredUserDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserPage />} />
          <Route path='/user' element={<MyFormComponent />} />
          <Route path='/filet' element={<UserDataComponent />} />
        </Routes>
      </BrowserRouter>
    </FilteredUserDataProvider>
  );
}

export default App;
