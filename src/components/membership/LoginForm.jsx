import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiPhone } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { ROUTE_PATHS } from "../../routes/routePaths";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [remember, setRemember] = useState(true);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate(ROUTE_PATHS.MEMBERSHIP_DASHBOARD);
    } catch {
      // error already captured in context
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="form-error">{error}</div>}

      <div className="form-field">
        <label htmlFor="mobile"><FiPhone size={14} /> Mobile Number</label>
        <input id="mobile" name="mobile" type="number" value={form.mobile} onChange={handleChange} placeholder="you@example.com" required />
      </div>

      <div className="form-field">
        <label htmlFor="password"><FiLock size={14} /> Password</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
      </div>

      <label className="form-checkbox">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        Keep me signed in on this device
      </label>

      <button type="submit" className="btn-temple btn-primary-gold form-submit-btn" disabled={loading}>
        <FiLogIn /> {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="auth-footer-note">
        New here? <Link to={ROUTE_PATHS.MEMBERSHIP_REGISTER}>Create a Membership Account</Link>
      </p>
    </form>
  );
}
