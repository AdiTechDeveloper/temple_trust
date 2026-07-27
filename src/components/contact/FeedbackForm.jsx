import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend, FiCheckCircle } from "react-icons/fi";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function FeedbackForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Will POST to /api/contact-messages once the Laravel backend is connected.
    await new Promise((res) => setTimeout(res, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm(initialState);
  };

  if (submitted) {
    return (
      <div className="contact-success">
        <FiCheckCircle size={40} color="var(--gold)" />
        <h3>Message Sent</h3>
        <p>Thank you for reaching out. The trust office will respond within 1–2 business days.</p>
        <button className="btn-temple btn-navy-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name"><FiUser size={14} /> Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
        </div>
        <div className="form-field">
          <label htmlFor="phone"><FiPhone size={14} /> Phone Number</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="email"><FiMail size={14} /> Email Address</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
      </div>

      <div className="form-field">
        <label htmlFor="subject">Subject</label>
        <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
          <option value="">Select a topic</option>
          <option value="general">General Inquiry</option>
          <option value="donation">Donation Query</option>
          <option value="puja">Puja Booking Query</option>
          <option value="volunteer">Volunteering</option>
          <option value="feedback">Feedback / Suggestion</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message"><FiMessageSquare size={14} /> Message</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." required />
      </div>

      <button type="submit" className="btn-temple btn-primary-gold form-submit-btn" disabled={submitting}>
        <FiSend /> {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
