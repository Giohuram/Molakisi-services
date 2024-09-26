import Tutor from "../models/TutorSchema.js";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import axios from "axios";
import axiosRetry from "axios-retry";

// Configure axios to retry failed requests up to 3 times
axiosRetry(axios, { retries: 3 });

// Get checkout session and initiate payment
export const getCheckoutSession = async (req, res) => {
  console.log("Request received for tutorId:", req.params.tutorId);

  try {
    // Log the incoming request body to verify the method and phone are passed correctly
    console.log("Request body:", req.body);

    const tutor = await Tutor.findById(req.params.tutorId);
    if (!tutor) {
      console.error("Tutor not found for id:", req.params.tutorId);
      return res.status(404).json({ message: "Tutor not found" });
    }
    console.log("Tutor found:", tutor);

    const user = await User.findById(req.userId);
    if (!user) {
      console.error("User not found for id:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user);

    const token = process.env.FLEXPAY_TOKEN;
    const merchant = process.env.FPAY_MERCHANT;

    console.log("Initiating payment with Flexpay...");

    const { method, phone } = req.body;
    let paymentResponse;

    // Mobile money specific logic
    if (method === "mobile_money") {
      const mobileMoneyPayload = {
        merchant,
        phone: req.body.phone,
        amount: tutor.ticketPrice,
        currency: "USD",
        reference: `booking-${Date.now()}`,
        callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/api/flexpay-callback`,  // Corrected callback URL
        approve_url: `${process.env.CLIENT_SITE_URL}/subscribe?status=approve`,
        decline_url: `${process.env.CLIENT_SITE_URL}/subscribe?status=decline`,
        cancel_url: `${process.env.CLIENT_SITE_URL}/subscribe?status=cancel`,
        description: "Paiement d'abonnement",
        type: "1",
      };

      console.log("Mobile money request payload:", mobileMoneyPayload);

      paymentResponse = await axios.post(
        'https://backend.flexpay.cd/api/rest/v1/paymentService',
        mobileMoneyPayload,
        {
          headers: {
            Authorization: token,
          }
        }
      );

      if (paymentResponse.data.code !== '0') {
        console.error("Flexpay returned an error:", paymentResponse.data);
        return res.status(500).json({
          success: false,
          message: paymentResponse.data.message || "Failed to initiate payment with Flexpay",
        });
      }

    } else if (method === "card") {
        // Correct logic for card payment
        console.log("Sending card payment request...");
      
        const cardPaymentPayload = {
          authorization: token,   
          merchant,
          amount: tutor.ticketPrice,
          currency: "USD",
          reference: `booking-${Date.now()}`,
          callback_url: `${process.env.CLIENT_SITE_URL}/api/flexpay-callback`, 
          approve_url: `${process.env.CLIENT_SITE_URL}/subscribe?status=approve`,
          decline_url: `${process.env.CLIENT_SITE_URL}/subscribe?status=decline`,
          cancel_url: `${process.env.CLIENT_SITE_URL}/subscribe?status=cancel`,
          home_url: `${process.env.CLIENT_SITE_URL}`, 
          recurring: true,
          interval: "yearly",
          description: "Paiement d'abonnement",
        };
      
        console.log("Card payment request payload:", cardPaymentPayload);
      
        try {
          paymentResponse = await axios.post(
            "https://cardpayment.flexpay.cd/v1.1/pay",
            cardPaymentPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              }
            }
          );
      
          // Check Flexpay response and ensure there's no error
          if (paymentResponse.data.code !== '0') {
            console.error("Flexpay returned an error for card payment:", paymentResponse.data);
            return res.status(500).json({
              success: false,
              message: paymentResponse.data.message || "Failed to initiate card payment",
            });
          }
        } catch (error) {
          console.error("Error with card payment request:", error.response?.data || error.message);
          return res.status(500).json({
            success: false,
            message: "Error initiating card payment",
            error: error.message,
          });
        }
      }

    // Extract the payment response details (for both mobile money and card)
    const { url, orderNumber } = paymentResponse.data;

    if (!url && method !== 'mobile_money') {
      console.error("No URL returned in the payment response", paymentResponse.data);
      return res.status(500).json({
        success: false,
        message: "No redirect URL received from Flexpay",
        details: paymentResponse.data,
      });
    }

    console.log("Creating booking with orderNumber:", orderNumber);
    const booking = new Booking({
      tutor: tutor._id,
      user: user._id,
      ticketPrice: tutor.ticketPrice,
      transactionId: orderNumber, // Store orderNumber in transactionId field
      paymentMethod: req.body.method,
      paymentStatus: req.body.method === "mobile_money" ? "pending" : "initiated",
    });

    await booking.save();
    console.log("Booking created successfully:", booking);

    if (method === "mobile_money") {
      console.log("Mobile money payment initiated for phone:", phone);
      res.status(200).json({
        success: true,
        message: "Mobile money payment initiated, waiting for confirmation.",
        orderNumber,
      });
    } else if (method === "card") {
      console.log("Card payment initiated, redirecting to:", url);
      res.status(200).json({
        success: true,
        message: "Card payment initiated successfully",
        redirectUrl: url, // For card payments, send the redirect URL
        orderNumber,
      });
    }

  } catch (error) {
    // Log the error with detailed information for debugging
    console.error("Error in getCheckoutSession:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data || "No response data",
      config: error.config, 
    });

    res.status(500).json({
      success: false,
      message: "Error initiating payment",
      error: error.message,
    });
  }
};



// Create a checkout session for a specific booking
export const createCheckoutSession = async (req, res) => {
  try {
    const bookingId = req.params.id; // This should match the route parameter
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Proceed with creating a session (e.g., Flexpay logic)
    res.status(200).json({ success: true, sessionId: booking.session });
  } catch (error) {
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

// Update payment status after receiving a callback
export const updateBookingPaymentStatus = async (req, res) => {
  try {
    const { orderNumber, status } = req.body; // Assuming the callback data includes orderNumber and status

    const booking = await Booking.findOne({ session: orderNumber });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update payment status based on the callback
    booking.paymentStatus = status === 'SUCCESS' ? 'completed' : 'failed';
    await booking.save();

    res.status(200).json({ success: true, message: "Payment status updated successfully." });
  } catch (error) {
    console.error("Error updating booking payment status:", error);
    res.status(500).json({ error: "Failed to update payment status" });
  }
};
