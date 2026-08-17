import { useState, useEffect, useCallback } from "react";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import {
  getAvailableSlots,
  createPujaOrder,
  verifyPujaPayment,
} from "../../services/api"; // Ensure exports in api.js
import { color } from "framer-motion";

export default function PujaBookingForm({ puja }) {
  const getMinBookingDate = () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 5);
    return minDate.toISOString().split("T")[0];
  };

  const minDate = getMinBookingDate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    dob: "",
    bookingDate: minDate,
    timeSlot: "",
  });

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(null);

  // 1. Dynamically Load Razorpay Checkout Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Wrap fetchSlots in useCallback
  const fetchSlots = useCallback(
    async (selectedDate) => {
      if (!puja?.id || !selectedDate) return;

      setLoadingSlots(true);

      try {
        const data = await getAvailableSlots(puja.id, selectedDate);
        if (data?.status) {
          setSlots(data.slots || []);
        }
      } catch (err) {
        console.error("Failed to load slots:", err);
      } finally {
        setLoadingSlots(false);
      }
    },
    [puja?.id],
  );

  // Fetch Time Slots on component load and whenever date or puja ID changes
  useEffect(() => {
    fetchSlots(form.bookingDate);
  }, [form.bookingDate, fetchSlots]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "bookingDate") {
      setForm((f) => ({ ...f, bookingDate: value, timeSlot: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const bookingPayload = {
      puja_id: puja.id,
      name: form.name,
      mobile: form.mobile,
      dob: form.dob,
      booking_date: form.bookingDate,
      time_slot: form.timeSlot,
    };

    try {
      // Create Razorpay Order
      const orderRes = await createPujaOrder(bookingPayload);

      if (!orderRes.status) {
        throw new Error(orderRes.message || "Failed to initialize payment.");
      }

      // Configure & Open Razorpay Modal
      const options = {
        key: orderRes.key,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: "Shree Sidhh Rudreshwar Seva Sanstha & Charitable Trust",
        description: `Booking for ${puja.name || puja.title}`,
        order_id: orderRes.razorpay_order_id,
        prefill: {
          name: form.name,
          contact: form.mobile,
        },
        theme: {
          color: "#d97706",
        },
        handler: async function (response) {
          try {
            const verifyPayload = {
              ...bookingPayload,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyRes = await verifyPujaPayment(verifyPayload);

            if (verifyRes?.status) {
              // Optimistically mark slot as booked
              setSlots((prevSlots) =>
                prevSlots.map((s) =>
                  s.time === form.timeSlot ? { ...s, available: false } : s,
                ),
              );

              // Refetch slots to guarantee synced state
              await fetchSlots(form.bookingDate);

              // Show success screen
              setBookingSuccess(verifyRes.data);
            } else {
              // Handle API returning status: false
              setErrors({
                submit:
                  verifyRes?.message ||
                  "Payment verification failed. Please contact support.",
              });
            }
          } catch (err) {
            setErrors({
              submit:
                err.response?.data?.message ||
                "Payment verification failed. Please contact support.",
            });
          } finally {
            // Unlocks submit button whether verification succeeds or fails
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            // Unsets submitting state if user closes Razorpay popup
            setSubmitting(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        setSubmitting(false);
        setErrors({
          submit:
            response.error.description || "Payment failed. Please try again.",
        });
      });

      razorpayInstance.open();
    } catch (err) {
      setSubmitting(false);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({
          submit:
            err.response?.data?.message ||
            err.message ||
            "Failed to initiate payment. Please try again.",
        });
      }
    }
  };

  const handleBookAnother = async () => {
    // Reset inputs
    setForm({
      name: "",
      mobile: "",
      dob: "",
      bookingDate: minDate,
      timeSlot: "",
    });
    setBookingSuccess(null);

    // Re-fetch slots for minDate
    await fetchSlots(minDate);
  };

  const activePrice = Number(puja?.offer_price || puja?.price || 0);

  if (bookingSuccess) {
    return (
      <div
        className="booking-success"
        style={{ textAlign: "center", padding: "1rem 0" }}
      >
        <FiCheckCircle size={50} color="var(--gold, #d97706)" />
        <h3 style={{ marginTop: "0.75rem", fontSize: "1.3rem" }}>
          Puja Booking Confirmed!
        </h3>
        <p
          style={{ fontSize: "0.9rem", color: "#4b5563", margin: "0.75rem 0" }}
        >
          Thank you, <strong>{form.name}</strong>. Your payment was successful
          and <strong>{puja.name || puja.title}</strong> has been confirmed for{" "}
          <strong>
            {new Date(form.bookingDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </strong>{" "}
          at <strong>{form.timeSlot}</strong>.
        </p>

        {bookingSuccess.is_new_user && (
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1e40af",
              padding: "0.6rem",
              borderRadius: "6px",
              fontSize: "0.825rem",
              marginBottom: "1rem",
            }}
          >
            A new membership account has been automatically created for mobile
            number <strong>{form.mobile}</strong>.
          </div>
        )}

        <button
          type="button"
          className="btn-temple btn-primary-gold"
          onClick={handleBookAnother}
        >
          Book Another Puja
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="puja-booking-form">
      <div className="form-field">
        <label htmlFor="name">
          <FiUser size={14} /> Full Name<span className="field-error">*</span>
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={errors.name ? "input-invalid" : ""}
          required
        />
        {errors.name && <span className="field-error">{errors.name[0]}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="mobile">
            <FiPhone size={14} /> Mobile Number
            <span className="field-error">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={form.mobile}
            onChange={handleChange}
            placeholder="Enter mobile no."
            className={errors.mobile ? "input-invalid" : ""}
            required
          />
          {errors.mobile && (
            <span className="field-error">{errors.mobile[0]}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="dob">
            <FiCalendar size={14} /> Date of Birth
            <span className="field-error">*</span>
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className={errors.dob ? "input-invalid" : ""}
            required
          />
          {errors.dob && <span className="field-error">{errors.dob[0]}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="bookingDate">
          <FiCalendar size={14} /> Preferred Puja Date
          <span className="field-error">*</span>
        </label>
        <input
          id="bookingDate"
          name="bookingDate"
          type="date"
          min={minDate}
          value={form.bookingDate}
          onChange={handleChange}
          className={errors.booking_date ? "input-invalid" : ""}
          required
        />
        <small
          style={{ fontSize: "0.85rem", color: "#d97706", marginTop: "0.2rem" }}
        >
          Min. 5 days advance booking required
        </small>
        {errors.booking_date && (
          <span className="field-error">{errors.booking_date[0]}</span>
        )}
      </div>

      <div className="form-field">
        <label>
          <FiClock size={14} /> Select Time Slot
          <span className="field-error">*</span>
        </label>

        {loadingSlots ? (
          <p
            style={{
              fontSize: "0.85rem",
              color: "#6b7280",
              margin: "0.2rem 0",
            }}
          >
            Checking slot availability...
          </p>
        ) : slots.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}
          >
            {slots.map((slot) => {
              const isSelected = form.timeSlot === slot.time;
              const isBooked = !slot.available;

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={isBooked}
                  onClick={() =>
                    setForm((f) => ({ ...f, timeSlot: slot.time }))
                  }
                  style={{
                    padding: "0.5rem 0.4rem",
                    border: isSelected
                      ? "2px solid #d97706"
                      : "1px solid #d1d5db",
                    borderRadius: "6px",
                    background: isSelected
                      ? "#fef3c7"
                      : isBooked
                        ? "#f3f4f6"
                        : "#ffffff",
                    color: isSelected
                      ? "#92400e"
                      : isBooked
                        ? "#9ca3af"
                        : "#374151",
                    fontWeight: isSelected ? "700" : "500",
                    fontSize: "0.8rem",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span>{slot.time}</span>
                  {isBooked && (
                    <span style={{ fontSize: "0.68rem", color: "#ef4444" }}>
                      Booked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: "0.85rem", color: "#ef4444" }}>
            No slots available for this date.
          </p>
        )}

        {errors.time_slot && (
          <span className="field-error">{errors.time_slot[0]}</span>
        )}
      </div>

      {errors.submit && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            fontSize: "0.85rem",
            marginBottom: "0.5rem",
          }}
        >
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        className="btn-temple btn-primary-gold form-submit-btn"
        disabled={submitting || !form.timeSlot}
      >
        {submitting
          ? "Processing Payment..."
          : `Pay & Book — ₹${activePrice.toLocaleString("en-IN")}`}
      </button>
    </form>
  );
}
