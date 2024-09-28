/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useContext, useState } from 'react'; 
import { AuthContext } from '../../context/AuthContext';
import MyBookings from './MyBookings.jsx';
import Profile from './Profile.jsx';
import useFetchData from '../../hooks/useFetchData.js';
import { BASE_URL, token } from '../../config.js';
import Error from '../../components/Error/Error.jsx';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState('bookings');
  const navigate = useNavigate();

  // Fetch profile data
  const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: "LOGOUT" });
    navigate('/');
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error state
  }

  const userProfile = userData || { name: "Giovanni Masala", email: "example@gmail.com" };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    if (confirmDelete) {
      try {
        const apiUrl = `${BASE_URL}/users/${userData._id}`; // Use the user ID from fetched data
  
        const response = await fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Ensure the token is valid
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
    } else {
      console.log('Delete action canceled by the user');
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {error && <Error />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="pb-5 px-5 md:px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img 
                  src={userProfile.photo || '/path/to/default/image.png'} // Ensure photo is available
                  alt="User profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[16px] md:text-[18px] leading-[24px] md:leading-[30px] text-headingColor font-bold">{userProfile.name}</h3>
              <p className="text-textColor text-[14px] md:text-[15px] leading-6 font-medium">{userProfile.email}</p>
            </div>
            <div className="mt-[30px] md:mt-[50px]">
              <button 
                onClick={handleLogout} 
                className="w-full bg-[#181A1E] p-2 md:p-3 text-[14px] md:text-[16px] leading-7 rounded-md text-white">
                Se déconnecter
              </button>
              <button 
                onClick={handleDeleteAccount} 
                className="w-full bg-red-600 p-2 md:p-3 text-[14px] md:text-[16px] mt-3 leading-7 rounded-md text-white">
                Éffacer mon compte
              </button>
            </div>
          </div>  
          <div className='col-span-2 md:col-span-2 px-5 md:px-[30px]'>
            <div className="flex justify-center md:justify-start">
              <button 
                onClick={() => setTab('bookings')} 
                className={`${tab === "bookings" && 'bg-primaryColor text-white font-normal'} p-2 md:px-5 rounded-md text-headingColor font-semibold text-[14px] md:text-[16px] leading-7 border border-solid border-primaryColor mr-3`}>
                Mes réservations
              </button>
              <button 
                onClick={() => setTab('settings')} 
                className={`${tab === "settings" && 'bg-primaryColor text-white font-normal'} p-2 md:px-5 rounded-md text-headingColor font-semibold text-[14px] md:text-[16px] leading-7 border border-solid border-primaryColor`}>
                Réglages Profile
              </button>
            </div>
            <div className="mt-4">
              {tab === 'bookings' && <MyBookings />}  
              {tab === 'settings' && <Profile user={userData} />}  
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
