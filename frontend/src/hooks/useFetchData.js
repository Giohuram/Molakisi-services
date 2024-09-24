import { useEffect, useState } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
        
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const result = await res.json();
    
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized. Session may have expired.');
          }
          throw new Error(result.message || 'Erreur serveur');
        }
    
        setData(result.data);
      } catch (error) {
        // Add user redirect if necessary
        if (error.message.includes('No token found')) {
          // Redirect to login or show login prompt
          console.error('User is not logged in. Redirecting to login...');
          // For example, window.location.href = '/login';
        }
    
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
