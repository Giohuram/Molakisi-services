/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formateDate } from '../../utils/formateDate';
import { formateTime } from '../../utils/formateTime'; // import the new function

const TutorAbout = ({ name, about, qualifications, experiences, timeSlots }) => {

  const dayTranslations = {
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
  };

  return (
    <div>
      <p className='text__para'>{about}</p>
      
      {/* Education Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>
        <ul className='pt-4 md:p-5'>
          {qualifications?.map((item, index) => (
            <li key={index} className='flex flex-col sm:flex-row justify-between sm:items-end mf:gap-5 mb-[30px]'>
              <div>
                <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                  {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                </span>
                <p className='text-[15px] leading-6 font-medium text-textColor'>{item.degree}</p>
              </div>
              <p className='text-[16px] leading-5 font-medium text-textColor'>{item.university}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Experience Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
          Experience
        </h3>
        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
          {experiences?.map((item, index) => (
            <li key={index} className='p-4 rounded bg-[#fff9ea]'>
              <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
              </span>
              <p className='text-[15px] leading-6 font-medium text-textColor'>{item.position}</p>
              <p className='text-[16px] leading-5 font-medium text-textColor'>{item.school}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Time Slots Section */}
      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
          Horaire de Travail
        </h3>
        <div className="mt-[30px]">
          <ul className="mt-3">
            {timeSlots?.length > 0 ? (
              timeSlots.map((item, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <p className="text-[15px] leading-6 text-textColor font-semibold">
                    {dayTranslations[item.day.toLowerCase()] || item.day}
                  </p>
                  <p className="text-[15px] leading-6 text-textColor font-semibold">
                    {formateTime(item.startingTime)} - {formateTime(item.endingTime)}
                  </p>
                </li>
              ))
            ) : (
              <li className="text-[15px] leading-6 text-textColor font-semibold">Aucun créneau disponible</li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default TutorAbout;
