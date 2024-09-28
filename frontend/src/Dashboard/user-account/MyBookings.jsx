import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const { data: appointments, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  // Utility function to format date
  const formatBookingDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="p-4">
      {error && <Error errMessage={error} />}
      {appointments && appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3">Noms</th>
                <th scope="col" className="px-4 py-3">Genre</th>
                <th scope="col" className="px-4 py-3">Paiement</th>
                <th scope="col" className="px-4 py-3">Prix</th>
                <th scope="col" className="px-4 py-3">Date de réservation</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item._id} className="border-b bg-white">
                  <th
                    scope="row"
                    className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <img
                      src={item.tutor.photo || "/path/to/default/image.png"}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {item.tutor.name || "Nom inconnu"}
                      </div>
                      <div className="text-normal text-gray-500">
                        {item.tutor.email || "Email inconnu"}
                      </div>
                    </div>
                  </th>
                  <td className="px-4 py-4">
                    {item.tutor.gender || "Genre inconnu"}
                  </td>
                  <td className="px-4 py-4">
                    {item.isPaid ? (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        Payé
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                        Non Payé
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">{item.ticketPrice}</td>
                  <td className="px-4 py-4">{formatBookingDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
