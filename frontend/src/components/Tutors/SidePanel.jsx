/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// For flexpay integration 

import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import axios from "axios"; // Import axios

const SidePanel = ({ tutorId, ticketPrice, timeSlots }) => {
  // Initialize phone with country code '243'
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [phone, setPhone] = useState("243"); // Start phone with '243'
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationTimeout, setConfirmationTimeout] = useState(null);

  const bookingHandler = async () => {
    setLoading(true);

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/bookings/api/initiate-payment/${tutorId}`, {
        method: paymentMethod, // Pass method ('card' or 'mobile_money')
        phone: paymentMethod === "mobile_money" ? phone : undefined, // Include phone for mobile money
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      if (paymentMethod === "card") {
        window.location.href = response.data.redirectUrl;
      } else if (paymentMethod === "mobile_money") {
        setWaitingForConfirmation(true); // Show waiting confirmation message
      }
    } catch (error) {
      toast.error("Payment initiation failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      {/* Existing UI Code */}
      <h2 className="text-lg font-bold mb-4">Réservez votre session</h2>
      <p className="mb-4">Frais d&apos;inscription: 10 USD</p>
      <p className="mb-4">Frais de cours: {ticketPrice} USD/Mois</p>
      <div className="flex flex-col mb-4">
        <label htmlFor="payment-method" className="font-semibold">Méthode de paiement :</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="card">Carte de crédit</option>
          <option value="mobile_money">Mobile Money</option>
        </select>
      </div>
      {paymentMethod === "mobile_money" && (
        <div className="mb-4">
          <label htmlFor="phone" className="font-semibold">Numéro de téléphone :</label>
          <div className="flex">
            <input
              type="text"
              value="+243"
              disabled
              className="border rounded-md p-2 w-16 mr-2 bg-gray-100 text-center"
            />
            <input
              type="tel"
              id="phone"
              value={phone.slice(3)} // Display the part after '243'
              onChange={(e) => setPhone("243" + e.target.value)} // Always prefix with '243'
              className="border rounded-md p-2 w-full"
              placeholder="Entrer votre numéro sans 243"
            />
          </div>
        </div>
      )}
      <button onClick={bookingHandler} disabled={loading} className="btn px-2 w-full rounded-md mt-4">
        {loading ? 'Processing...' : 'Faire ma réservation'}
      </button>

      {/* Display waiting message for Mobile Money */}
      {waitingForConfirmation && (
        <div>
          <p className="text-green-600 mt-4">Waiting for confirmation on your mobile...</p>
          <p className="text-sm">Please enter your PIN and validate the payment.</p>
          <p className="text-sm">Click <button onClick={() => window.location.reload()} className="text-blue-600" type="button">here</button> after confirmation.</p>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
