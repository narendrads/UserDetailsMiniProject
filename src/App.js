import logo from './logo.svg';
import './App.css';
import MyFormComponent from './MyFormComponent';
import UserDataComponent from './UserDataComponent';
import UserDataCom from './UserDataCom';
import UserPage from './userCom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    
       
    
    <BrowserRouter>
     
    <Routes>
      <Route path='/' element={<UserPage/>}></Route>
      <Route path='/user' element={<MyFormComponent/>} />
      <Route path='/filet' element={<UserDataComponent/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
