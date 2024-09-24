import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Tutors from '../pages/Tutors/Tutors';
import TutorDetails from '../pages/Tutors/TutorDetails';
import  MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/tutor-account/Dashboard';

import { Routes, Route } from 'react-router-dom'; 
import ProtectedRoute from './ProctectedRoute';


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/Services" element={<Services />} /> 
      <Route path="/Login" element={<Login />} /> 
      <Route path="/Signup" element={<Signup />} /> 
      <Route path="/Contact" element={<Contact />} /> 
      <Route path="/tutors" element={<Tutors />} /> 
      <Route path="/tutors/:id" element={<TutorDetails />} /> 
      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['student']}><MyAccount /></ProtectedRoute>} /> 
      <Route path="/tutors/profile/me" element={<ProtectedRoute allowedRoles={['tutor']}><Dashboard /></ProtectedRoute>} /> 
    </Routes>
  )
}

export default Routers;