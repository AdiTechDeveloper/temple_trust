import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX, FiBell, FiUser, FiPhone, FiCalendar, FiBriefcase, FiMapPin, FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useJoinUpdates } from "../../../context/JoinUpdatesContext";
import { joinCommunity } from "../../../services/communityService";
import FamilyMemberFields from "./FamilyMemberFields";
import "./JoinUpdatesPopup.css";

const initialForm = {
  name: "",
  mobile: "",
  dob: "",
  gender: "",
  maritalStatus: "",
  anniversaryDate: "",
  designation: "",
  companyName: "",
  address: "",
  city: "",
  state: "",
};

export default function JoinUpdatesPopup() {


    const { isOpen, closePopup } = useJoinUpdates();

  // console.log("Popup isOpen:", isOpen);
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

    console.log("===== HANDLE SUBMIT CALLED =====");
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = ["Please enter your name."];
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = ["Please enter your mobile number."];
    } else if (form.mobile.length !== 10) {
      newErrors.mobile = ["Please enter a valid 10-digit mobile number."];
    }

    if (
      form.maritalStatus === "Married" &&
      !form.anniversaryDate
    ) {
      newErrors.anniversaryDate = ["Please enter your anniversary date."];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // alert("Form Submitted");

    const payload = {
      name: form.name,
      mobile: form.mobile,
      gender: form.gender || null,
      dob: form.dob || null,

      marital_status:
        form.maritalStatus === "Married"
          ? "Married"
          : form.maritalStatus === "Unmarried"
            ? "Single"
            : form.maritalStatus === "Divorced"
              ? "Divorced"
              : null,

      anniversary_date: form.anniversaryDate || null,

      designation: form.designation || null,

      company_name: form.companyName || null,

      city: form.city || null,

      state: form.state || null,

      address: form.address || null,

      family_members: familyMembers,
    };

    console.log(payload);

    try {

      // console.log("Calling API...");

      const response = await joinCommunity(payload);

      console.log("Success", response);
      setStep("success");

      // alert("API Success");

    } catch (error) {

      if (error.response?.status === 422) {

        setErrors(error.response.data.errors);

      } else {

        setErrors({
          submit: error.response?.data?.message || "Something went wrong."
        });

      }

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
            className={`join-popup-panel ${step === "form" ? "is-form-step" : ""}`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="join-popup-close" onClick={resetAndClose} aria-label="Close">
              <FiX size={20} />
            </button>

            {/* ---------- TEASER STEP ---------- */}
            {step === "teaser" && (
              <div className="join-popup-teaser">
                <span className="join-popup-icon-badge"><FiBell size={26} /></span>
                <span className="eyebrow" style={{ justifyContent: "center" }}>Stay Connected</span>
                <h2>🔱 Join Our Temple Community 🔱</h2>
                <p>
                  Receive temple festival reminders, daily darshan updates, special puja invitations, and Mahadev's blessings directly on WhatsApp.
                </p>
                <button className="btn-temple btn-primary-gold join-popup-cta" onClick={() => setStep("form")}>
                  <FaWhatsapp /> Join Our Community
                </button>
                <button className="join-popup-skip" onClick={resetAndClose}>Maybe Later</button>
              </div>
            )}

            {/* ---------- FORM STEP ---------- */}
            {step === "form" && (
              <form onSubmit={handleSubmit} className="join-popup-form" noValidate>
                <div className="join-popup-form-header">
                  <span className="eyebrow">Member Details</span>
                  <h3>Tell Us About Yourself</h3>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="jp-name"><FiUser size={14} /> Full Name*</label>
                    <input
                      id="jp-name" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name" required
                      className={errors.name ? "input-invalid" : ""}
                    />
                    {errors.name && <span className="field-error">{errors.name[0]}</span>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="jp-mobile"><FiPhone size={14} /> Mobile Number*</label>
                    <input
                      id="jp-mobile" name="mobile" type="tel" inputMode="numeric" maxLength={10} value={form.mobile} onChange={handleChange}
                      placeholder="+91 98765 43210" required
                      className={errors.mobile ? "input-invalid" : ""}
                    />
                    {errors.mobile && <span className="field-error">{errors.mobile[0]}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="jp-dob"><FiCalendar size={14} /> Date of Birth <span className="date-format-hint">(self)</span></label>
                  <input id="jp-dob" name="dob" type="date" value={form.dob} onChange={handleChange} placeholder="dd-mm-yyyy" />
                </div>

                <div className="join-popup-family-section">
                  <label className="join-popup-family-label">
                    Add Family / Friend Members' Birthdays & Anniversaries
                  </label>
                  <p className="join-popup-family-hint">
                    We'll send them a WhatsApp blessing message from the temple on their special day.
                  </p>
                  <FamilyMemberFields members={familyMembers} onChange={setFamilyMembers} />
                </div>

                <div className="form-field">
                  <label htmlFor="jp-gender">Gender</label>
                  <select id="jp-gender" name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    {/* <option value="other">Other</option> */}
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="jp-marital">Marital Status</label>
                  <select id="jp-marital" name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                {form.maritalStatus === "Married" && (
                  <div className="form-field">
                    <label htmlFor="jp-anniversary"><FiCalendar size={14} /> Anniversary Date <span className="date-format-hint">(dd-mm-yyyy)</span></label>
                    <input
                      id="jp-anniversary" name="anniversaryDate" type="date" value={form.anniversaryDate} onChange={handleChange}
                      placeholder="dd-mm-yyyy"
                      className={errors.anniversaryDate ? "input-invalid" : ""}
                    />
                    {errors.anniversaryDate && <span className="field-error">{errors.anniversaryDate[0]}</span>}
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="jp-designation"><FiBriefcase size={14} /> Designation</label>
                  <input id="jp-designation" name="designation" value={form.designation} onChange={handleChange} placeholder="e.g. Manager, Business Owner" />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="jp-company">Company Name</label>
                    <input id="jp-company" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Your company / business" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="jp-city">City</label>
                    <input id="jp-city" name="city" value={form.city} onChange={handleChange} placeholder="City" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="jp-state">State</label>
                    <input id="jp-state" name="state" value={form.state} onChange={handleChange} placeholder="State" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="jp-address"><FiMapPin size={14} /> Address</label>
                    <input id="jp-address" name="address" value={form.address} onChange={handleChange} placeholder="House no, street, area" />
                  </div>
                </div>

                {errors.submit && <div className="form-error">{errors.submit}</div>}

                <button type="submit" className="btn-temple btn-primary-gold form-submit-btn" disabled={submitting}>
                  <FaWhatsapp /> {submitting ? "Submitting..." : "Join & Get Updates"}
                </button>
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

                <p>
                  Your registration has been completed successfully.
                </p>

                <p>
                  You will now receive:
                </p>

                <ul className="success-list">
                  <li>✅ Temple & Trust Updates</li>
                  <li>✅ Festival Notifications</li>
                  <li>✅ Aarti & Darshan Timings</li>
                  <li>✅ Birthday & Anniversary Blessings</li>
                </ul>

                <p className="mahadev-text">
                  Har Har Mahadev 🙏
                </p>

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



