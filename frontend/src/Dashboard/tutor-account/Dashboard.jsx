/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Tabs from './Tabs';
import { useState } from 'react';
import starIcon from '../../assets/images/Star.png';
import TutorAbout from '../../components/Tutors/TutorAbout';
import Profile from './Profile';
import Appointments from './Appointments';

const Dashboard = () => {
  const { data, error } = useGetProfile(`${BASE_URL}/tutors/profile/me`);
  const [tab, setTab] = useState('overview');

  const isDataAvailable = data && data.isApproved;

  if (error) {
    return <div>{error.message || 'Error loading profile data.'}</div>;
  }

  if (!data) {
    return <div>Loading...</div>; // Handle the loading state
  }

  return (
    <section className="pb-10">
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] lg:gap-[30px]">
          {/* Tabs should stack vertically on mobile */}
          <Tabs tab={tab} setTab={setTab} tutorId={data.id} />
          
          <div className="lg:col-span-2">
            {data.isApproved === 'pending' && (
              <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="ml-3 text-sm font-medium">
                  To get approval, please complete your profile. We&apos;ll review manually and approve within 3 days. 
                </div>
              </div>
            )}

            <div className="mt-8">
              {tab === 'overview' && (
                <div>
                  {/* Profile section */}
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-10">
                    <figure className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full">
                      <img 
                        src={data?.photo || ''} 
                        alt="user's profile photo" 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    </figure>
                    <div className="flex-1 text-center md:text-left">
                      <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] lg:text-[16px] font-semibold">
                        {data?.bio || 'Tutor Bio'}
                      </span>
                      <h3 className="text-[20px] lg:text-[22px] font-bold text-headingColor mt-2 lg:mt-3">
                        {data?.name || 'User'}
                      </h3>
                      {/* <div className="flex justify-center md:justify-start items-center gap-[6px] mt-2">
                        <img src={starIcon} alt="Star icon" className="w-5" />
                        <span className="text-headingColor">
                          {data.averageRating}
                        </span>
                        <span className="text-textColor text-[14px] lg:text-[16px] font-semibold">
                          ({data.totalRating})
                        </span>
                      </div> */}
                      {/* <p className="text-[14px] lg:text-[15px] mt-2">
                        {data?.specialization || 'Tutor Bio'}
                      </p> */}
                    </div>
                  </div>

                  {/* Tutor about section */}
                  <TutorAbout 
                    name={data?.name || 'N/A'}  
                    about={data?.about || 'N/A'} 
                    qualifications={data?.qualifications || []}
                    experiences={data?.experiences || []}
                    timeSlots={data?.timeSlots || []}
                  />
                </div>
              )}
              {tab === 'appointments' && <Appointments appointments={data.appointments} />}
              {tab === 'settings' && <Profile tutorData={data} />} 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
