/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';

// const useFetchData = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No token found. Please log in.');
//         }
        
//         const res = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
    
//         const result = await res.json();
    
//         if (!res.ok) {
//           if (res.status === 401) {
//             throw new Error('Unauthorized. Session may have expired.');
//           }
//           throw new Error(result.message || 'Erreur serveur');
//         }
    
//         setData(result.data);
//       } catch (error) {
//         // Add user redirect if necessary
//         if (error.message.includes('No token found')) {
//           // Redirect to login or show login prompt
//           console.error('User is not logged in. Redirecting to login...');
//           // For example, window.location.href = '/login';
//         }
    
//         setError(error.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchData();
//   }, [url]); 

//   return { data, loading, error };
// };

// export default useFetchData;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add a refetch function to manually trigger data fetching
  const refetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state on refetch

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set content type for clarity
        },
      });

      if (!res.ok) {
        const result = await res.json();
        handleError(res.status, result.message);
        return;
      }

      const result = await res.json();
      setData(result.data); // Assuming result has a 'data' property

    } catch (error) {
      handleGlobalError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchData(); // Call refetchData on initial render
  }, [url, navigate]);

  const handleError = (status, message) => {
    if (status === 401) {
      throw new Error('Unauthorized. Session may have expired.');
    } else {
      throw new Error(message || 'Server error');
    }
  };

  const handleGlobalError = (error) => {
    if (error.message.includes('No token found') || error.message.includes('Unauthorized')) {
      navigate('/'); // Redirect to login on unauthorized access
    }
    setError(error.message || 'Something went wrong');
  };

  return { data, loading, error, refetchData }; // Add refetchData to the return object
};

export default useFetchData;