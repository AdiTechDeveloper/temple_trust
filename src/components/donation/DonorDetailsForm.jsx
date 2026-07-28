import { FiUser, FiMail, FiPhone, FiCreditCard } from "react-icons/fi";

export default function DonorDetailsForm({ form, onChange, anonymous, onAnonymousChange, recurring, onRecurringChange, wants80G, onWants80GChange }) {
  return (
    <div className="donor-details-form">
      <div className="form-field">
        <label htmlFor="donorName"><FiUser size={14} /> Full Name</label>
        <input
          id="donorName" name="name" value={form.name} onChange={onChange}
          placeholder={anonymous ? "Anonymous Donor" : "Your name"}
          disabled={anonymous}
          required={!anonymous}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="donorEmail"><FiMail size={14} /> Email</label>
          <input id="donorEmail" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
        </div>
        <div className="form-field">
          <label htmlFor="donorPhone"><FiPhone size={14} /> Phone</label>
          <input id="donorPhone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" required />
        </div>
      </div>

      <label className="form-checkbox">
        <input type="checkbox" checked={anonymous} onChange={(e) => onAnonymousChange(e.target.checked)} />
        Make this an anonymous donation (your name won't appear in public donor lists)
      </label>

      <label className="form-checkbox">
        <input type="checkbox" checked={recurring} onChange={(e) => onRecurringChange(e.target.checked)} />
        Make this a recurring monthly donation
      </label>

      <label className="form-checkbox">
        <input type="checkbox" checked={wants80G} onChange={(e) => onWants80GChange(e.target.checked)} />
        I would like an 80G tax exemption receipt
      </label>

      {wants80G && (
        <div className="form-field">
          <label htmlFor="pan"><FiCreditCard size={14} /> PAN Number (for 80G receipt)</label>
          <input id="pan" name="pan" value={form.pan} onChange={onChange} placeholder="ABCDE1234F" required={wants80G} />
        </div>
      )}
    </div>
  );
}
