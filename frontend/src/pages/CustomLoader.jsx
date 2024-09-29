// import React from 'react';
import { ClipLoader } from 'react-spinners';
import { FaBook } from 'react-icons/fa'; // Icône de livre

const CustomLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {/* Icône de livre en rotation */}
      <FaBook className="animate-spin text-primaryColor" size={50} />

      {/* Texte indiquant le chargement */}
      <p className="text-xl text-gray-600">Anglais na ndaku is getting ready. Thanks for waiting...</p>

      {/* Spinner pour indiquer le chargement */}
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
};

export default CustomLoader;
