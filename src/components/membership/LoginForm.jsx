import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiPhone } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { useJoinUpdates } from "../../context/JoinUpdatesContext";

const initialState = {
  mobile: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();

  const { openPopup } = useJoinUpdates();
  const { login, loading, error } = useAuth();

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!form.mobile.trim()) {
      validationErrors.mobile = ["Please enter mobile number."];
    } else if (form.mobile.length !== 10) {
      validationErrors.mobile = ["Please enter valid 10 digit mobile number."];
    }

    if (!form.password) {
      validationErrors.password = ["Please enter password."];
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await login(form);

      alert(response.message || "Login Successful");

      navigate(ROUTE_PATHS.MEMBERSHIP_DASHBOARD);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || "Invalid mobile or password.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="form-error">{error}</div>}

      <div className="form-field">
        <label htmlFor="mobile">
          <FiPhone size={14} /> Mobile Number
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={form.mobile}
          onChange={handleChange}
          placeholder="1254785489
        "
          required
        />
        {errors.mobile && (
          <small className="text-danger">{errors.mobile[0]}</small>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">
          <FiLock size={14} /> Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
        {errors.password && (
          <small className="text-danger">{errors.password[0]}</small>
        )}
      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        Keep me signed in on this device
      </label>

      <button
        type="submit"
        className="btn-temple btn-primary-gold form-submit-btn"
        disabled={loading}
      >
        <FiLogIn /> {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="auth-footer-note">
        New here?{" "}
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            openPopup();
          }}
        >
          Create a Membership Account
        </Link>
      </p>
    </form>
  );
}
