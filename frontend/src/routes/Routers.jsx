import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';

import { Routes, Route } from 'react-router-dom'; 


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/Services" element={<Services />} /> 
      <Route path="/Login" element={<Login />} /> 
      <Route path="/Signup" element={<Signup />} /> 
      <Route path="/Contact" element={<Contact />} /> 
      <Route path="/doctors" element={<Doctors />} /> 
      <Route path="/doctors/:id" element={<DoctorDetails />} /> 
    </Routes>
  )
}

export default Routers;