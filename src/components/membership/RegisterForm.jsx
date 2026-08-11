import { useAuth } from "../../context/AuthContext";
import { ROUTE_PATHS } from "../../routes/routePaths";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiUserPlus,
} from "react-icons/fi";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  password: "",
  password_confirmation: "",
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  
  const [agree, setAgree] = useState(false);

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

    if (!agree) {
      alert("Please accept the terms first.");
      return;
    }
     const validationErrors = {};

    if (!form.name.trim()) {
        validationErrors.name = ["Please enter your name."];
    }

    if (!form.mobile.trim()) {
        validationErrors.mobile = ["Please enter mobile number."];
    } else if (form.mobile.length !== 10) {
        validationErrors.mobile = ["Please enter valid 10 digit mobile number."];
    }

    if (!form.gender) {
        validationErrors.gender = ["Please select gender."];
    }

    if (!form.password) {
        validationErrors.password = ["Please enter password."];
    } else if (form.password.length < 8) {
        validationErrors.password = ["Password must be at least 8 characters."];
    }

    if (form.password !== form.password_confirmation) {
        validationErrors.password_confirmation = [
            "Password confirmation does not match."
        ];
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setErrors({});

    try {
    const response = await register(form);

      alert(response.message || "Registration Successful");

      setForm(initialState);

      navigate(ROUTE_PATHS.MEMBERSHIP_LOGIN);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } 
  };

  return (
    <form onSubmit={handleSubmit} noValidate>

      <div className="form-field">
        <label htmlFor="name">
          <FiUser size={14} /> Full Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
        />

        {errors.name && (
          <small className="text-danger">
            {errors.name[0]}
          </small>
        )}
      </div>

      <div className="form-row">

        <div className="form-field">
          <label htmlFor="email">
            <FiMail size={14} /> Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          {errors.email && (
            <small className="text-danger">
              {errors.email[0]}
            </small>
          )}
        </div>

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
            placeholder="9876543210"
          />

          {errors.mobile && (
            <small className="text-danger">
              {errors.mobile[0]}
            </small>
          )}
        </div>

      </div>

      <div className="form-field">
        <label htmlFor="gender">
          <FiUser size={14} /> Gender
        </label>

        <select
          id="gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {errors.gender && (
          <small className="text-danger">
            {errors.gender[0]}
          </small>
        )}
      </div>

      <div className="form-row">

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
            placeholder="********"
          />

          {errors.password && (
            <small className="text-danger">
              {errors.password[0]}
            </small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password_confirmation">
            <FiLock size={14} /> Confirm Password
          </label>

          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="********"
          />

          {errors.password_confirmation && (
            <small className="text-danger">
              {errors.password_confirmation[0]}
            </small>
          )}
        </div>

      </div>

      <label className="form-checkbox">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />

        I agree to receive temple updates, festival greetings and donation receipts by Email/WhatsApp.
      </label>

      <button
        type="submit"
        className="btn-temple btn-primary-gold form-submit-btn"
        disabled={loading}
      >
        <FiUserPlus />

        {loading ? "Registering..." : "Register"}
      </button>

      <p className="auth-footer-note">
        Already a member?{" "}
        <Link to={ROUTE_PATHS.MEMBERSHIP_LOGIN}>
          Sign In
        </Link>
      </p>

    </form>
  );
}