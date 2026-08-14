import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { getAvailableSlots, bookPuja } from "../../services/api";

export default function PujaBookingForm({ puja }) {
  // Calculate Minimum Selectable Date (Today + 5 Days)
  const getMinBookingDate = () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 5);
    return minDate.toISOString().split("T")[0];
  };

  const minDate = getMinBookingDate();

  // State Management
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

  // Fetch Time Slots dynamically on date change
  useEffect(() => {
    if (puja?.id && form.bookingDate) {
      fetchSlots(form.bookingDate);
    }
  }, [puja?.id, form.bookingDate]);

  const fetchSlots = async (selectedDate) => {
    setLoadingSlots(true);
    setForm((f) => ({ ...f, timeSlot: "" })); // Reset selected slot

    try {
      const data = await getAvailableSlots(puja.id, selectedDate);
      if (data.status) {
        setSlots(data.slots || []);
      }
    } catch (err) {
      console.error("Failed to load slots:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Sanitize mobile number (10 digits standard)
    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm((f) => ({ ...f, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const payload = {
      puja_id: puja.id,
      name: form.name,
      mobile: form.mobile,
      dob: form.dob, // Compulsory
      booking_date: form.bookingDate,
      time_slot: form.timeSlot,
    };

    try {
      const data = await bookPuja(payload);

      if (data.status) {
        setBookingSuccess(data.data);
      }
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({
          submit:
            err.response?.data?.message ||
            "Failed to process booking. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Get active price (offers price or original price)
  const activePrice = Number(puja?.offer_price || puja?.price || 0);

  // 3. Render Confirmation View on Success
  if (bookingSuccess) {
    return (
      <div
        className="booking-success"
        style={{ textAlign: "center", padding: "1rem 0" }}
      >
        <FiCheckCircle size={50} color="var(--gold, #d97706)" />
        <h3 style={{ marginTop: "0.75rem", fontSize: "1.3rem" }}>
          Booking Request Received
        </h3>
        <p
          style={{ fontSize: "0.9rem", color: "#4b5563", margin: "0.75rem 0" }}
        >
          Thank you, <strong>{form.name}</strong>. Your request for{" "}
          <strong>{puja.name || puja.title}</strong> has been booked for{" "}
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
          onClick={() => {
            setBookingSuccess(null);
            setForm({
              name: "",
              mobile: "",
              dob: "",
              bookingDate: minDate,
              timeSlot: "",
            });
          }}
        >
          Book Another Puja
        </button>
      </div>
    );
  }

  // 4. Render Booking Form
  return (
    <form onSubmit={handleSubmit} noValidate className="puja-booking-form">
      {/* Full Name */}
      <div className="form-field">
        <label htmlFor="name">
          <FiUser size={14} /> Full Name*
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
            <FiPhone size={14} /> Mobile Number*
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
            <FiCalendar size={14} /> Date of Birth*
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

      {/* Booking Date (5-day Advance Rule) */}
      <div className="form-field">
        <label htmlFor="bookingDate">
          <FiCalendar size={14} /> Preferred Puja Date*
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
          style={{ fontSize: "1rem", color: "#d97706", marginTop: "0.2rem" }}
        >
          Min. 5 days advance booking required
        </small>
        {errors.booking_date && (
          <span className="field-error">{errors.booking_date[0]}</span>
        )}
      </div>

      {/* Time Slot Picker */}
      <div className="form-field">
        <label>
          <FiClock size={14} /> Select Time Slot*
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
                    alignitems: "center",
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
          }}
        >
          {errors.submit}
        </div>
      )}

      {/* Submit CTA */}
      <button
        type="submit"
        className="btn-temple btn-primary-gold form-submit-btn"
        disabled={submitting || !form.timeSlot}
      >
        {submitting
          ? "Submitting..."
          : `Book Now — ₹${activePrice.toLocaleString("en-IN")}`}
      </button>
    </form>
  );
}
