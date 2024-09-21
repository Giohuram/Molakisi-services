/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tabs = ({ tab, setTab }) => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <div>
            <span className='lg:hidden'>
                <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
            <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                {/* Tabs */}
                <button 
                    onClick={() => setTab('overview')} 
                    className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} 
                                w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setTab('appointments')} 
                    className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} 
                                w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}
                >
                    Appointments
                </button>
                <button 
                    onClick={() => setTab('settings')} 
                    className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} 
                                w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}
                >
                    Profile
                </button>

                {/* Add space after the profile option */}
                <div className="mt-[100px] w-full space-y-3">
                    <button 
                        onClick={handleLogout} 
                        className="w-full bg-black p-3 text-[16px] leading-7 rounded-md text-white"
                    >
                        Se déconnecter
                    </button>
                    <button 
                        className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white"
                    >
                        Éffacer mon compte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
