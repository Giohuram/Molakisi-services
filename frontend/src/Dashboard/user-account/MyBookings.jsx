import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import TutorCard from './../../components/Tutors/TutorCard';
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const { data: appointments, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {error && <Error errMessage={error} />}
      {appointments && appointments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map(tutor => (
            <TutorCard tutor={tutor} key={tutor._id} />
          ))}
        </div>
      ) : (
        !error && (
          <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
            Vous n&apos;avez encore fait aucune réservation!
          </h2>
        )
      )}
    </div>
  );
};

export default MyBookings;
