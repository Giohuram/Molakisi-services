/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, allowedRoles}) => {

    const {token, role} = useContext(AuthContext)
    const isAllowed = allowedRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children : <Navigate to="/login" replace={true} />

  return accessibleRoute; 
}

export default ProtectedRoute; 