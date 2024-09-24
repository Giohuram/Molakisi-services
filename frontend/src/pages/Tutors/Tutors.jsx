import TutorCard from "../../components/Tutors/TutorCard";
import { tutors } from "../../assets/data/tutors"; 
import Testimonial from "../../components/Testimonial/Testimonial";

const Tutors = () => {
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
             /> 
             <button className="btn mt-0 rounded-[0px] rounded-r-md">Recherche</button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} />)}
          </div>
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
  )
}

export default Tutors; 