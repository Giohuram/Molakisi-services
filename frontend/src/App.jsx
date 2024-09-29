import { useState, useEffect } from 'react';
import './App.css';
import Layout from './layout/Layout';
import WhatsAppButton from './pages/WhatsAppButton'; // Assure-toi que le chemin est correct
import CustomLoader from './pages/CustomLoader'; // Assure-toi que le chemin est correct

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement de 3 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tu peux ajuster le délai ici

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Si en mode loading, afficher le loader */}
      {isLoading ? (
        <CustomLoader />
      ) : (
        <>
          {/* Sinon, afficher le Layout et le bouton WhatsApp */}
          <Layout />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}

export default App;

