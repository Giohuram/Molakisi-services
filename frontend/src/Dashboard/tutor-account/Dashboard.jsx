import Error from '../../components/Error/Error';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config'
import Tabs from './Tabs';
import { useState } from 'react';

const Dashboard = () => {

  const {data, error} = useGetProfile(`${BASE_URL}/tutors/profile/me`); 

   const [tab, setTab] = useState('overview')

  return (
    <section>
         <div className="max-w-[1170px] px-5 mx-auto">
            {!error && (
              <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
                <Tabs />
              </div>  
            )}
         </div>
    </section>
  )
}

export default Dashboard; 