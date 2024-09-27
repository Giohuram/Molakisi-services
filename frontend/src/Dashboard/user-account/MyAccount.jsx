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
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error state
  }

  // Provide fallback if userData is null or undefined
  const userProfile = userData || { name: "Giovanni Masala", email: "example@gmail.com" };

  const handleDeleteAccount = async () => {
    // console.log('Delete button clicked');
    // console.log('User ID:', userData._id); // Use the user ID from fetched data

    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.');
    // console.log('Confirm delete result:', confirmDelete);

    if (confirmDelete) {
      try {
        const apiUrl = `${BASE_URL}/users/${userData._id}`; // Use the user ID from fetched data
        // console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Ensure the token is valid
          }
        });

        // console.log('Full response:', response);
        // console.log('Response Status:', response.status);

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
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img 
                  src={userProfile.photo} // Ensure photo is available
                  alt="User profile"
                  className="w-full h-full rounded-full"                  
                />
              </figure>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userProfile.name}</h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">{userProfile.email}</p>
            </div>
            <div className="mt-[50px] md:mt-[10px]">
              <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Se déconnecter</button>
              <button onClick={handleDeleteAccount} className="w-full bg-red-600 p-3 text-[16px] mt-3 leading-7 rounded-md text-white">Éffacer mon compte</button>
            </div>
          </div>  
          <div className='md:col-span-2 md:px-[30px]'>
            <div>
              <button onClick={() => setTab('bookings')} className={`${tab === "bookings" && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Mes réservations</button>
              <button onClick={() => setTab('settings')} className={`${tab === "settings" && 'bg-primaryColor text-white font-normal'} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                Réglages Profile
              </button>
            </div>
            {tab === 'bookings' && <MyBookings />}  
            {tab === 'settings' && <Profile user={userData} />}  
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
