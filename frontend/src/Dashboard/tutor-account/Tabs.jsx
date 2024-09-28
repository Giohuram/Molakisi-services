/* eslint-disable react/prop-types */

import { useContext, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, token } from '../../config';

const Tabs = ({ tab, setTab, tutorId }) => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        console.log('Delete button clicked');
        console.log('Tutor ID:', tutorId);

        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
        if (confirmDelete) {
            try {
                const apiUrl = `${BASE_URL}/tutors/${tutorId}`;

                const response = await fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    console.log('Account deleted successfully');
                    dispatch({ type: 'LOGOUT' });
                    navigate('/');
                } else {
                    const errorData = await response.json();
                    console.log('Error response from API:', errorData);
                    alert('Une erreur est survenue lors de la suppression du compte.');
                }
            } catch (error) {
                console.error('Error in fetch:', error);
                alert('Une erreur s\'est produite. Veuillez réessayer.');
            }
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu open/close state
    };

    const handleTabClick = (selectedTab) => {
        setTab(selectedTab);
        setIsMenuOpen(false); // Close the menu after a tab is selected
    };

    return (
        <div>
            {/* Mobile Menu Button */}
            <span className='lg:hidden'>
                <BiMenu onClick={toggleMenu} className='w-6 h-6 cursor-pointer' />
            </span>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='flex flex-col p-4 bg-white shadow-panelShadow rounded-md'>
                    <button onClick={() => handleTabClick('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                        Aperçu général
                    </button>
                    <button onClick={() => handleTabClick('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                        Réservations
                    </button>
                    <button onClick={() => handleTabClick('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                        Profile
                    </button>

                    <div className="mt-4 w-full space-y-3">
                        <button onClick={handleLogout} className="w-full bg-black p-3 text-[16px] leading-7 rounded-md text-white">
                            Se déconnecter
                        </button>
                        <button onClick={handleDeleteAccount} className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                            Éffacer mon compte
                        </button>
                    </div>
                </div>
            )}

            {/* Desktop Menu */}
            <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                <button onClick={() => handleTabClick('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                    Aperçu général
                </button>
                <button onClick={() => handleTabClick('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                    Réservations
                </button>
                <button onClick={() => handleTabClick('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                    Profile
                </button>

                <div className="mt-[100px] w-full space-y-3">
                    <button onClick={handleLogout} className="w-full bg-black p-3 text-[16px] leading-7 rounded-md text-white">
                        Se déconnecter
                    </button>
                    <button onClick={handleDeleteAccount} className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                        Éffacer mon compte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
