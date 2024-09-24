/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import {BASE_URL} from './../../config';
import useFetchData from './../../hooks/useFetchData';
import Error from '../../components/Error/Error';
import TutorCard from './TutorCard';
import '../../Styles/TutorList.css'; // Add custom CSS for scrolling effect

const TutorList = () => {

  const { data: tutors, error } = useFetchData(`${BASE_URL}/tutors`);

  return (
    <>
      {error && <Error />}
      {!error && tutors && (  // Check if tutors is not null and not undefined
        <div className="tutor-list-container mt-[30px] lg:mt-[55px]">
          <div className="tutor-row">
            {tutors.map(tutor => ( 
              <TutorCard key={tutor.id} tutor={tutor} />  
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TutorList;

