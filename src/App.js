
import './App.css';
import Homepage from './pages/Homepage';
import {Route , BrowserRouter, Routes } from 'react-router-dom'
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/sales' element={<Sales/>}/>
    <Route path='/purchases' element={<Purchases/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/admin' element={<AdminPanel/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
