
import { useContext, useState } from 'react'; 
import { AuthContext } from '../../context/AuthContext';
import MyBookings from './MyBookings.jsx';
import Profile from './Profile.jsx';
import useFetchData from '../../hooks/useFetchData.js';
import { BASE_URL } from '../../config.js';
import Error from '../../components/Error/Error.jsx';

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState('bookings');

  // Fetch profile data
  const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    localStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
        // Optionally redirect to the login page
        // navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error state
  }

  // Provide fallback if userData is null or undefined
  const userProfile = userData || { name: "Giovanni Masala", email: "example@gmail.com" };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">

        { error && <Error />}

        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img 
                  src={userProfile.photo} // You could replace this with userData?.profilePicture if available
                  alt="User profile"
                  className="w-full h-full rounded-full"                  
                />
              </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userProfile.name}</h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">{userProfile.email}</p>
              <p className="text-textColor text-[15px] leading-6 font-medium">Blood Type: <span className="ml-2 text-headingColor text-[22px] leading-8">{userProfile.bloodType}</span></p>
            </div>

            <div className="mt-[50px] md:mt-[10px]">
              <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Se déconnecter</button>
              <button className="w-full bg-red-600 p-3 text-[16px] mt-3 leading-7 rounded-md text-white">Éffacer mon compte</button>
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
}

export default MyAccount;
