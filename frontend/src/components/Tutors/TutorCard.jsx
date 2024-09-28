/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import '../../Styles/TutorList.css';

const TutorCard = ({ tutor }) => {
    const { name, photo, bio } = tutor;

    return (
        <Link 
            to={`/tutors/${tutor._id}`} 
            className="w-[calc(80%-15px)] m-2 rounded-lg overflow-hidden transition-transform transform hover:translate-y-[-5px] hover:shadow-2xl bg-white shadow-md text-center text-inherit"
        >
            <div className="relative w-full pb-[100%]">
                <img 
                    src={photo} 
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg" 
                    alt={`${name}'s photo`} 
                />
            </div>
            <h2 className="text-lg leading-6 font-semibold my-2">{name}</h2>
            <span className="bg-[#CCF0F3] text-[var(--irisBlueColor)] py-1 px-2 text-sm rounded mb-2 inline-block">
                {bio}
            </span>
        </Link>
    );
}

export default TutorCard;


