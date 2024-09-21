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
        
        // console.log('Token being sent:', token); // Log token for debugging

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
        console.error('Fetch error:', error); // Log error for debugging
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
