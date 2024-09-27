/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import starIcon from "../../assets/images/Star.png";
import TutorAbout from '../../components/Tutors/TutorAbout';
import Feedback from '../../components/Tutors/Feedback';
import SidePanel from '../../components/Tutors/SidePanel';
import { BASE_URL } from './../../config';
import useFetchData from './../../hooks/useFetchData';
import Error from '../../components/Error/Error';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const TutorDetails = () => {
  const [tab, setTab] = useState('about');
  const { id } = useParams();
  const { data: tutor, error, isLoading, fetchData: fetchTutor } = useFetchData(`${BASE_URL}/tutors/${id}`);

  // Fetch tutor data when a new review is submitted
  const handleReviewSubmitted = async () => {
    try {
      await fetchTutor(); // Re-fetch the tutor data
      toast.success('Reviews updated successfully!');
    } catch (error) {
      toast.error(`Failed to fetch updated reviews: ${error.message}`);
    }
  };

  // Only destructure if tutor is defined
  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = tutor || {}; // Use an empty object to prevent destructuring null

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {isLoading && <p>Loading...</p>} {/* Add loading indicator */}
        {error && <Error />}
        {!isLoading && !error && (
          <>
            <div className="grid md:grid-cols-3 gap-[50px]">
              <div className="md:col-span-1 flex flex-col items-center gap-3">
                {/* Profile picture closer to the title */}
                <figure className="w-[100px] h-[100px]">
                  {photo && <img src={photo} alt={name} className="w-full h-full object-cover rounded-full" />}
                </figure>
                {/* Tutor specialization and name */}
                <div className="text-center">
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-2 font-bold">{name}</h3>
                  <div className="flex items-center justify-center gap-[6px] mt-2">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="Star" className="w-[16px] h-[16px]" />
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              {/* Price and Availability section */}
              <div className="md:col-span-2">
                <SidePanel 
                  tutorId={tutor?._id} // Use optional chaining
                  ticketPrice={ticketPrice}
                  timeSlots={timeSlots}
                />
              </div>
            </div>

            <div>
              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab('about')}
                  className={`${tab === 'about' ? 'border-b border-solid border-primaryColor' : ''} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                  About
                </button>
                <button
                  onClick={() => setTab('feedback')}
                  className={`${tab === 'feedback' ? 'border-b border-solid border-primaryColor' : ''} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                  Feedbacks
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === 'about' && <TutorAbout name={name} about={about} qualifications={qualifications} experiences={experiences} />}
                {tab === 'feedback' && (
                  <Feedback 
                    reviews={reviews} 
                    totalRating={totalRating} 
                    onReviewSubmitted={handleReviewSubmitted} 
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div> 
    </section>
  );
};

export default TutorDetails;
