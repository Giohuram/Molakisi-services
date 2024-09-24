/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { formateDate } from '../../utils/formateDate';

const TutorAbout = ({ name, about, qualifications, experiences, timeSlots }) => {
  return (
    <div>
      <div className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
        <h3>
          À propos de <span className='text-irisBlueColor font-bold text-[24px] leading-9'>{name}</span>
        </h3>
      </div>
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

      {/* Timeslots Section */}
        <div className='mt-12'>
          <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
            Disponibilité
          </h3>
          <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
            {timeSlots?.map((slot, index) => (
              <li key={index} className='p-4 rounded bg-[#e7f3ff]'>
                <span className='text-blueColor text-[15px] leading-6 font-semibold'>
                  {slot.day}: {slot.startingTime} - {slot.endingTime}
                </span>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default TutorAbout;
