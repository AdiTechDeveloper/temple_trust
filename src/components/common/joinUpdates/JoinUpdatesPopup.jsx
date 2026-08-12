import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiBell,
  FiUser,
  FiPhone,
  FiCalendar,
  FiBriefcase,
  FiMapPin,
  FiCheckCircle,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useJoinUpdates } from "../../../context/JoinUpdatesContext";
import { joinCommunity } from "../../../services/communityService";
import FamilyMemberFields from "./FamilyMemberFields";
import "./JoinUpdatesPopup.css";

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  anniversaryDate: "",
  designation: "",
  companyName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function JoinUpdatesPopup() {
  const { isOpen, closePopup } = useJoinUpdates();

  const [step, setStep] = useState("teaser"); // teaser | form | success
  const [form, setForm] = useState(initialForm);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const resetAndClose = () => {
    closePopup();
    setTimeout(() => {
      setStep("teaser");
      setForm(initialForm);
      setFamilyMembers([]);
      setErrors({});
      setSubmitting(false);
    }, 300);
  };

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
    setSubmitting(true);

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = ["Please enter your name."];
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = ["Please enter your mobile number."];
    } else if (form.mobile.length !== 10) {
      newErrors.mobile = ["Please enter a valid 10-digit mobile number."];
    }

    if (!form.password) {
      newErrors.password = ["Please enter a password."];
    } else if (form.password.length < 8) {
      newErrors.password = ["Password must be at least 8 characters."];
    }

    if (form.password !== form.passwordConfirmation) {
      newErrors.passwordConfirmation = ["Passwords do not match."];
    }

    if (form.maritalStatus === "Married" && !form.anniversaryDate) {
      newErrors.anniversaryDate = ["Please enter your anniversary date."];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    const payload = {
      name: form.name,
      mobile: form.mobile,
      email: form.email || null,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
      gender: form.gender || null,
      dob: form.dob || null,

      marital_status:
        form.maritalStatus === "Married"
          ? "Married"
          : form.maritalStatus === "Unmarried"
            ? "Single"
            : form.maritalStatus === "Divorced"
              ? "Divorced"
              : "Single",

      anniversary_date:
        form.maritalStatus === "Married" ? form.anniversaryDate : null,

      designation: form.designation || null,
      company_name: form.companyName || null,
      city: form.city || null,
      state: form.state || null,
      pincode: form.pincode || null,
      address: form.address || null,

      // Source tracking parameters
      source_type: "community",
      is_donor: 0,

      // Format family members array for backend relation table
      family_members: familyMembers.map((member) => ({
        name: member.name,
        relation: member.relation,
        dob: member.dob,
        anniversary_date: member.anniversaryDate || null,
      })),
    };

    try {
      const response = await joinCommunity(payload);

      if (response.data?.status || response.status) {
        setStep("success");
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({
          submit:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="join-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
        >
          <motion.div
            className={`join-popup-panel ${
              step === "form" ? "is-form-step" : ""
            }`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="join-popup-close"
              onClick={resetAndClose}
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            {/* ---------- TEASER STEP ---------- */}
            {step === "teaser" && (
              <div className="join-popup-teaser">
                {/* Glowing Icon Badge */}
                <div className="teaser-badge-wrapper">
                  <span className="join-popup-icon-badge">
                    <FiBell size={28} />
                  </span>
                </div>

                <span className="eyebrow teaser-eyebrow">
                  ✨ Stay Connected With Mahadev
                </span>

                <h2 className="teaser-title">Join Our Temple Community</h2>

                <p className="teaser-subtitle">
                  Stay blessed with daily updates and divine reminders directly
                  delivered to your WhatsApp.
                </p>

                {/* Feature Benefits Grid */}
                <div className="teaser-benefits-grid">
                  <div className="teaser-benefit-card">
                    <span className="benefit-icon">🌸</span>
                    <span>Daily Darshan</span>
                  </div>
                  <div className="teaser-benefit-card">
                    <span className="benefit-icon">🪔</span>
                    <span>Aarti Timings</span>
                  </div>
                  <div className="teaser-benefit-card">
                    <span className="benefit-icon">🔱</span>
                    <span>Festival Puja</span>
                  </div>
                  <div className="teaser-benefit-card">
                    <span className="benefit-icon">🎂</span>
                    <span>Birthday Wishes</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="teaser-actions">
                  <button
                    type="button"
                    className="btn-temple btn-primary-gold join-popup-cta"
                    onClick={() => setStep("form")}
                  >
                    <FaWhatsapp className="whatsapp-icon" /> Join On WhatsApp
                  </button>

                  <button
                    type="button"
                    className="join-popup-skip"
                    onClick={resetAndClose}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            )}

            {/* ---------- FORM STEP ---------- */}
            {step === "form" && (
              <form
                onSubmit={handleSubmit}
                className="join-popup-form"
                noValidate
              >
                {/* Hidden source inputs */}
                <input type="hidden" name="source_type" value="community" />
                <input type="hidden" name="is_donor" value="0" />

                <div className="join-popup-form-header">
                  <span className="eyebrow">Member Details</span>
                  <h3>Tell Us About Yourself</h3>
                </div>

                {/* Internal Scrollable Content Body */}
                <div className="join-popup-form-body">
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="jp-name">
                        <FiUser size={14} /> Full Name*
                      </label>
                      <input
                        id="jp-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className={errors.name ? "input-invalid" : ""}
                      />
                      {errors.name && (
                        <span className="field-error">{errors.name[0]}</span>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="jp-mobile">
                        <FiPhone size={14} /> Mobile Number*
                      </label>
                      <input
                        id="jp-mobile"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        required
                        className={errors.mobile ? "input-invalid" : ""}
                      />
                      {errors.mobile && (
                        <span className="field-error">{errors.mobile[0]}</span>
                      )}
                    </div>
                  </div>

                  {/* Password Row */}
                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="jp-password">
                        <FiLock size={14} /> Password*
                      </label>
                      <input
                        id="jp-password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="At least 8 characters"
                        required
                        className={errors.password ? "input-invalid" : ""}
                      />
                      {errors.password && (
                        <span className="field-error">
                          {errors.password[0]}
                        </span>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="jp-passwordConfirmation">
                        <FiLock size={14} /> Confirm Password*
                      </label>
                      <input
                        id="jp-passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        value={form.passwordConfirmation}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        required
                        className={
                          errors.passwordConfirmation ? "input-invalid" : ""
                        }
                      />
                      {errors.passwordConfirmation && (
                        <span className="field-error">
                          {errors.passwordConfirmation[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="jp-email">
                        <FiMail size={14} /> Email Address
                      </label>
                      <input
                        id="jp-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                        className={errors.email ? "input-invalid" : ""}
                      />
                      {errors.email && (
                        <span className="field-error">{errors.email[0]}</span>
                      )}
                    </div>
                    <div className="form-field">
                      <label htmlFor="jp-dob">
                        <FiCalendar size={14} /> Date of Birth{" "}
                        <span className="date-format-hint">(self)</span>
                      </label>
                      <input
                        id="jp-dob"
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="join-popup-family-section">
                    <label className="join-popup-family-label">
                      Add Family / Friend Members' Birthdays & Anniversaries
                    </label>
                    <p className="join-popup-family-hint">
                      We'll send them a WhatsApp blessing message from the
                      temple on their special day.
                    </p>
                    <FamilyMemberFields
                      members={familyMembers}
                      onChange={setFamilyMembers}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="jp-gender">Gender</label>
                      <select
                        id="jp-gender"
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="PNS">Preffer Not to Say</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="jp-marital">Marital Status</label>
                      <select
                        id="jp-marital"
                        name="maritalStatus"
                        value={form.maritalStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                  </div>

                  {form.maritalStatus === "Married" && (
                    <div className="form-field">
                      <label htmlFor="jp-anniversary">
                        <FiCalendar size={14} /> Anniversary Date{" "}
                        <span className="date-format-hint">(dd-mm-yyyy)</span>
                      </label>
                      <input
                        id="jp-anniversary"
                        name="anniversaryDate"
                        type="date"
                        value={form.anniversaryDate}
                        onChange={handleChange}
                        className={
                          errors.anniversaryDate ? "input-invalid" : ""
                        }
                      />
                      {errors.anniversaryDate && (
                        <span className="field-error">
                          {errors.anniversaryDate[0]}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="jp-designation">
                        <FiBriefcase size={14} /> Designation
                      </label>
                      <input
                        id="jp-designation"
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        placeholder="e.g. Manager, Business Owner"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="jp-company">Company Name</label>
                      <input
                        id="jp-company"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Your company / business"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="jp-address">
                      <FiMapPin size={14} /> Address
                    </label>
                    <input
                      id="jp-address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no, street, area"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="jp-city">City</label>
                      <input
                        id="jp-city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="jp-state">State</label>
                      <input
                        id="jp-state"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="jp-pincode">Pincode</label>
                      <input
                        id="jp-pincode"
                        name="pincode"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="form-error">{errors.submit}</div>
                  )}
                </div>

                {/* Fixed Footer with CTA Button */}
                <div className="join-popup-form-footer">
                  <button
                    type="submit"
                    className="btn-temple btn-primary-gold form-submit-btn"
                    disabled={submitting}
                  >
                    <FaWhatsapp />{" "}
                    {submitting ? "Submitting..." : "Join & Get Updates"}
                  </button>
                </div>
              </form>
            )}

            {/* ---------- SUCCESS STEP ---------- */}
            {step === "success" && (
              <div className="join-popup-success">
                <FiCheckCircle
                  size={70}
                  color="#28a745"
                  className="success-icon"
                />

                <span className="eyebrow">Registration Successful</span>

                <h2>Welcome to Our Temple Family!</h2>

                <p>
                  Thank you, <strong>{form.name}</strong>.
                </p>

                <p>Your registration has been completed successfully.</p>

                <p>You will now receive:</p>

                <ul className="success-list">
                  <li>Temple & Trust Updates</li>
                  <li>Festival Notifications</li>
                  <li>Aarti & Darshan Timings</li>
                  <li>Birthday & Anniversary Blessings</li>
                </ul>

                <p className="mahadev-text">Har Har Mahadev</p>

                <button
                  className="btn-temple btn-primary-gold join-popup-cta"
                  onClick={resetAndClose}
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
