/* eslint-disable react/prop-types */
// import { useContext } from 'react';
// import { BiMenu } from 'react-icons/bi';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Tabs = ({ tab, setTab }) => {
//     const { dispatch } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         dispatch({ type: 'LOGOUT' });
//         navigate('/');
//     };

//     return (
//         <div>
//             <span className='lg:hidden'>
//                 <BiMenu className='w-6 h-6 cursor-pointer' />
//             </span>
//             <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
//                 {/* Tabs */}
//                 <button 
//                     onClick={() => setTab('overview')} 
//                     className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} 
//                                 w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}
//                 >
//                    Aperçu général
//                 </button>
//                 <button 
//                     onClick={() => setTab('appointments')} 
//                     className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} 
//                                 w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}
//                 >
//                     Réservations
//                 </button>
//                 <button 
//                     onClick={() => setTab('settings')} 
//                     className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} 
//                                 w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}
//                 >
//                     Profile
//                 </button>

//                 {/* Add space after the profile option */}
//                 <div className="mt-[100px] w-full space-y-3">
//                     <button 
//                         onClick={handleLogout} 
//                         className="w-full bg-black p-3 text-[16px] leading-7 rounded-md text-white"
//                     >
//                         Se déconnecter
//                     </button>
//                     <button 
//                         className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white"
//                     >
//                         Éffacer mon compte
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tabs;

import { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, token } from '../../config';

const Tabs = ({ tab, setTab, tutorId }) => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        console.log('Delete button clicked');
        console.log('Tutor ID:', tutorId); // Log the tutor ID

        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
        console.log('Confirm delete result:', confirmDelete);

        if (confirmDelete) {
            try {
                const apiUrl = `${BASE_URL}/tutors/${tutorId}`;
                console.log('API URL:', apiUrl);

                const response = await fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Full response:', response);
                console.log('Response Status:', response.status);

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
        } else {
            console.log('Delete action canceled by the user');
        }
    };

    return (
        <div>
            <span className='lg:hidden'>
                <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
            <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                   Aperçu général
                </button>
                <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
                    Réservations
                </button>
                <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full py-2 text-[16px] rounded-md hover:bg-indigo-50`}>
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
