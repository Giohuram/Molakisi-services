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
  const { data: tutor, error, isLoading, refetchData } = useFetchData(`${BASE_URL}/tutors/${id}`); // Destructure refetchData

  // Fetch tutor data when a new review is submitted
  const handleReviewSubmitted = async () => {
    try {
      console.log("Fetching updated tutor data...");
      await refetchData(); // Use refetchData to fetch updated tutor data
      toast.success('Reviews updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error(`Failed to fetch updated reviews: ${error.message}`);
    }
  };

  // Only destructure if tutor is defined
  const {
    name,
    qualifications,
    experiences,
    timeSlots,
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
            <div className="grid md:grid-cols-3 gap-5 md:gap-[50px]">
              <div className="md:col-span-1 flex flex-col items-center gap-3">
                <figure className="w-[100px] h-[100px]">
                  {photo && <img src={photo} alt={name} className="w-full h-full object-cover rounded-full" />}
                </figure>
                <div className="text-center">
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {bio}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-2 font-bold">{name}
                  </h3>
                  <p>{specialization}</p>
                </div>
              </div>
  
              {/* Price and Availability section */}
              <div className="md:col-span-2">
                <SidePanel 
                  tutorId={tutor?._id} // Use optional chaining
                  ticketPrice={ticketPrice}
                />
              </div>
            </div>
  
            <div>
              <div className="mt-5 border-b border-solid border-[#0066ff34] flex flex-wrap justify-start">
                <button
                  onClick={() => setTab('about')}
                  className={`py-2 px-5 mr-3 text-[16px] leading-7 text-headingColor font-semibold ${tab === 'about' ? 'border-b-2 border-primaryColor' : ''}`}>
                  À propos
                </button>
                <button
                  onClick={() => setTab('feedback')}
                  className={`py-2 px-5 mr-3 text-[16px] leading-7 text-headingColor ${tab === 'feedback' ? 'border-b-2 border-primaryColor' : ''}`}>
                  Feedbacks
                </button>
              </div>
  
              <div className="mt-5">
                {tab === 'about' && <TutorAbout name={name} about={about} qualifications={qualifications} experiences={experiences} timeSlots={timeSlots} />}
                {tab === 'feedback' && (
                  <Feedback 
                    reviews={tutor?.reviews || []} // Use tutor instead of data
                    totalRating={tutor?.totalRating || 0} 
                    onReviewSubmitted={handleReviewSubmitted} 
                    averageRating={tutor?.averageRating || 0}
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
