import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton() {
  const whatsAppLink = "https://wa.me/243856493284"; // Remplace par ton numéro

  return (
    <a
      href={whatsAppLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

export default WhatsAppButton;
