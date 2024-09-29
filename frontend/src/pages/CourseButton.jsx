import { useState } from 'react';
import { FaBook } from 'react-icons/fa'; // Icône de livre
import { ClipLoader } from 'react-spinners';

const CourseButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // Simuler un délai
  };

  return (
    <button 
      onClick={handleClick} 
      className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2"
      disabled={loading}
    >
      {loading ? <ClipLoader color="#fff" size={20} /> : <FaBook size={20} />}
      <span>{loading ? 'Chargement...' : 'Voir les cours à domicile'}</span>
    </button>
  );
};

export default CourseButton;
