import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone, FiCalendar, FiUserPlus } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { ROUTE_PATHS } from "../../routes/routePaths";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const { register, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [agree, setAgree] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setLocalError("Please accept the terms to continue.");
      return;
    }

    try {
      await register(form);
      navigate(ROUTE_PATHS.MEMBERSHIP_DASHBOARD);
    } catch {
      // error captured in context
    }
  };

  const displayError = localError || authError;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {displayError && <div className="form-error">{displayError}</div>}

      <div className="form-field">
        <label htmlFor="fullName"><FiUser size={14} /> Full Name</label>
        <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email"><FiMail size={14} /> Email Address</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        </div>
        <div className="form-field">
          <label htmlFor="phone"><FiPhone size={14} /> Phone Number</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
        </div>
      </div>

        <div className="form-field">
        <label htmlFor="gender"><FiUser size={14} /> Gender</label>
        <select id="gender" name="gender"  value={form.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="password"><FiLock size={14} /> Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword"><FiLock size={14} /> Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
        </div>
      </div>

      <label className="form-checkbox">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        I agree to receive temple updates, festival greetings and donation receipts by email/WhatsApp.
      </label>

      <button type="submit" className="btn-temple btn-primary-gold form-submit-btn" disabled={loading}>
        <FiUserPlus /> {loading ? "Creating Account..." : "Create Membership Account"}
      </button>

      <p className="auth-footer-note">
        Already a member? <Link to={ROUTE_PATHS.MEMBERSHIP_LOGIN}>Sign In</Link>
      </p>
    </form>
  );
}
