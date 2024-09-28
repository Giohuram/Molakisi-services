import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import TutorCard from "../../components/Tutors/TutorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from './../../config';
import useFetchData from './../../hooks/useFetchData';
import Error from '../../components/Error/Error';

const Tutors = () => {
  const { token } = useContext(AuthContext); // Get token from context
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState("");
  const { data: tutors, error, isLoading } = useFetchData(`${BASE_URL}/tutors?query=${debounceQuery}`); 
  const navigate = useNavigate(); // For navigation redirection

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate('/Login');
    }
  }, [token, navigate]);

  const handleSearch = () => {
    setQuery(query.trim());
    console.log('handle search');
  }; 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Trouver un répétiteur</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input 
              type="search" 
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Chercher un répétiteur"
              value={query}
              onChange={e => setQuery(e.target.value)}
            /> 
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>Recherche</button>
          </div>
        </div>
      </section>
      
      <section>
        <div className="container">
          {isLoading && <p>Loading...</p>} 
          {error && <Error />}
          {!isLoading && !error && Array.isArray(tutors) && tutors.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
          {!isLoading && !error && tutors && tutors.length === 0 && (
            <p>No tutors found.</p>
          )}
        </div>
      </section>

      <section>
        <div className='container'>
          <div className="xl:w-[470px] mx-auto">
            <h2 className='heading text-center'>Que disent nos apprenants</h2>
            <p className='text__para text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum corrupti nemo ea ex ad.</p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
}

export default Tutors;
