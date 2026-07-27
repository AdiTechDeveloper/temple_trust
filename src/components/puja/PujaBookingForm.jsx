import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiCalendar, FiCheckCircle } from "react-icons/fi";

export default function PujaBookingForm({ puja }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Will POST to /api/puja-bookings once the Laravel backend is connected.
    await new Promise((res) => setTimeout(res, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="booking-success">
        <FiCheckCircle size={40} color="var(--gold)" />
        <h3>Booking Request Received</h3>
        <p>
          Thank you, {form.name}. Your {puja.title} has been requested for{" "}
          {form.date ? new Date(form.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "your chosen date"}.
          A confirmation with payment link will be sent to {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="puja-booking-form">
      <div className="form-field">
        <label htmlFor="name"><FiUser size={14} /> Full Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email"><FiMail size={14} /> Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        </div>
        <div className="form-field">
          <label htmlFor="phone"><FiPhone size={14} /> Phone</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="date"><FiCalendar size={14} /> Preferred Date</label>
        <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
      </div>
      <div className="form-field">
        <label htmlFor="notes">Special Requests (Optional)</label>
        <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Gotra, sankalp names, or any special request" />
      </div>
      <button type="submit" className="btn-temple btn-primary-gold form-submit-btn" disabled={submitting}>
        {submitting ? "Submitting..." : `Book Now — ₹${puja.price.toLocaleString("en-IN")}`}
      </button>
    </form>
  );
}
