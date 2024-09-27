/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
// import {BASE_URL} from './../../config';
// import useFetchData from './../../hooks/useFetchData';
// import Error from '../../components/Error/Error';
// import TutorCard from './TutorCard';
// import '../../Styles/TutorList.css'; // Add custom CSS for scrolling effect

// const TutorList = () => {

//   const { data: tutors, error, isLoading } = useFetchData(`${BASE_URL}/tutors`);

// return (
//   <>
//     {isLoading && <p>Loading...</p>} {/* Add loading indicator */}
//     {error && <Error />}
//     {!error && tutors && (
//       <div className="tutor-list-container mt-[30px] lg:mt-[55px]">
//         <div className="tutor-row">
//           {tutors.map(tutor => ( 
//             <TutorCard key={tutor.id} tutor={tutor} />  
//           ))}
//         </div>
//       </div>
//     )}
//   </>
// );
// }; 

// export default TutorList;

import { BASE_URL } from './../../config';
import useFetchData from './../../hooks/useFetchData';
import Error from '../../components/Error/Error';
import TutorCard from './TutorCard';
import '../../Styles/TutorList.css'; // Add custom CSS for scrolling effect

const TutorList = () => {
  const { data: tutors, error, isLoading } = useFetchData(`${BASE_URL}/tutors`);

  return (
    <>
      {isLoading && <p>Loading...</p>} {/* Add loading indicator */}
      {error && <Error />}
      {!error && tutors && (
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
};

export default TutorList;
