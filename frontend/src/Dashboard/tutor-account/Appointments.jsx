/* eslint-disable react/prop-types */
// import { formateDate } from '../../utils/formateDate';

const Appointments = ({ appointments }) => {

   // Utility function to format date
  const formatBookingDate = (dateString) => {
   const options = { day: 'numeric', month: 'short', year: 'numeric' };
   return new Date(dateString).toLocaleDateString('fr-FR', options);
 };

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className='min-w-full text-left text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-4 py-3'>Noms</th>
              <th scope='col' className='px-4 py-3'>Genre</th>
              <th scope='col' className='px-4 py-3'>Paiement</th>
              <th scope='col' className='px-4 py-3'>Prix</th>
              <th scope='col' className='px-4 py-3'>Date de réservation</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map(item => (
              <tr key={item._id} className="border-b bg-white">
                {/* Mobile-friendly row with flexbox for horizontal alignment */}
                <th
                  scope='row'
                  className='flex items-center px-4 py-4 text-gray-900 whitespace-nowrap'>
                  <img src={item.user.photo} alt='' className='w-10 h-10 rounded-full' />
                  <div className='pl-3'>
                    <div className='text-base font-semibold'>{item.user.name}</div>
                    <div className='text-normal text-gray-500'>{item.user.email}</div>
                  </div>
                </th>
                <td className='px-4 py-4 text-center lg:text-left'>
                  {item.user.gender}
                </td>
                <td className='px-4 py-4 text-center lg:text-left'>
                  {item.isPaid ? (
                    <div className='flex items-center justify-center lg:justify-start'>
                      <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>
                      Payé
                    </div>
                  ) : (
                    <div className='flex items-center justify-center lg:justify-start'>
                      <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>
                      Non Payé
                    </div>
                  )}
                </td>
                <td className='px-4 py-4 text-center lg:text-left'>
                  {item.ticketPrice}
                </td>
                <td className="px-4 py-4">{formatBookingDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
