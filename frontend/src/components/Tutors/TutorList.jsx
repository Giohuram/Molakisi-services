/* eslint-disable react/jsx-key */
import {doctors} from '../../assets/data/doctors'
import TutorCard from './TutorCard'

const DoctorList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        {doctors.map((doctor) => <TutorCard key={doctor.id} doctor={doctor} />)}
    </div>
  )
}

export default DoctorList