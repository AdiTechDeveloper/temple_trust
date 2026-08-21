import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiCheckCircle, FiShield } from "react-icons/fi";
import donationBanner from "../assets/images/donations/donation-banner.jpg";
import {
  getDonationCategories,
  getSuggestedAmounts,
} from "../services/templeService";
import { createDonationOrder, verifyDonationPayment } from "../services/api";
import SectionHeading from "../components/common/SectionHeading";
import DonationCategorySelect from "../components/donation/DonationCategorySelect";
import AmountSelector from "../components/donation/AmountSelector";
import DonorDetailsForm from "../components/donation/DonorDetailsForm";
import "./Donation.css";

const initialForm = { name: "", dob: "", phone: "", pan: "" };

export default function Donation() {
  const [categories, setCategories] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] =
    useState("general-donation");
  const [selectedAmount, setSelectedAmount] = useState(1101);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState(initialForm);
  const [anonymous, setAnonymous] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [wants80G, setWants80G] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Dynamically load Razorpay checkout script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    getDonationCategories().then(setCategories);
    getSuggestedAmounts().then(setAmounts);
  }, []);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const isformValid =
    form.name.trim() !== "" &&
    form.dob.trim() !== "" &&
    form.phone.trim() !== "";

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      let cleaned = value.replace(/\D/g, "");

      if (cleaned.length > 8) {
        cleaned = cleaned.slice(0, 8);
      }

      let formatted = cleaned;
      if (cleaned.length > 4) {
        formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 8)}`;
      } else if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
      }

      setForm((f) => ({ ...f, dob: formatted }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectAmount = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return;

    //validation fileds
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.dob.trim()) newErrors.dob = "DOB is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const donationPayload = {
      amount: finalAmount,
      category_id: selectedCategoryId,
    };

    try {
      const orderRes = await createDonationOrder(donationPayload);

      if (!orderRes.status) {
        throw new Error(orderRes.message || "Failed to initialize payment.");
      }

      const options = {
        key: orderRes.key,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: "Shree Sidhh Rudreshwar Mahadev Temple Trust",
        description: `Donation - ${selectedCategory?.title || "General Donation"}`,
        order_id: orderRes.razorpay_order_id,
        prefill: {
          name: form.name || "Donor",
          dob: form.dob,
          contact: form.phone,
        },
        theme: {
          color: "#d97706",
        },
        handler: async function (response) {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: finalAmount,
              category_id: selectedCategoryId,
              phone: form.phone,
              dob: form.dob,
              name: form.name,
              pan: form.pan,
              anonymous,
              recurring,
              wants80G,
            };

            const verifyRes = await verifyDonationPayment(verifyPayload);

            if (verifyRes?.status) {
              setSubmitted(true);
            } else {
              setErrors({
                submit:
                  verifyRes?.message ||
                  "Payment verification failed. Please contact support.",
              });
            }
          } catch (err) {
            setErrors({
              submit:
                err.response?.data?.message ||
                "Payment verification failed. Please contact support.",
            });
          } finally {
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        setSubmitting(false);
        setErrors({
          submit:
            response.error.description || "Payment failed. Please try again.",
        });
      });

      razorpayInstance.open();
    } catch (err) {
      setSubmitting(false);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({
          submit:
            err.response?.data?.message ||
            err.message ||
            "Failed to initiate payment. Please try again.",
        });
      }
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setSelectedCategoryId("general-donation");
    setSelectedAmount(1101);
    setCustomAmount("");
    setAnonymous(false);
    setRecurring(false);
    setWants80G(true);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className="section donation-success-section">
        <div className="container-xl">
          <motion.div
            className="donation-success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiCheckCircle size={52} color="var(--gold)" />
            <h2 className="section-heading" style={{ marginTop: 16 }}>
              Thank You for Your Generosity
            </h2>
            <p style={{ maxWidth: 520, margin: "12px auto 8px" }}>
              Your donation of{" "}
              <strong>₹{finalAmount.toLocaleString("en-IN")}</strong> towards{" "}
              <strong>{selectedCategory?.title || "General Donation"}</strong>{" "}
              has been recorded.
              {wants80G &&
                " An 80G tax receipt will be send to your WhatsApp shortly."}
              {recurring && " Your monthly recurring donation has been set up."}
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              A confirmation has been sent to {form.email || "your email"}.
            </p>
            <button
              className="btn-temple btn-navy-outline"
              style={{ marginTop: 20 }}
              onClick={handleReset}
            >
              Make Another Donation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className="page-banner"
        style={{ backgroundImage: `url(${donationBanner})` }}
      >
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Give With Purpose
            </span>
            <h1
              className="section-heading"
              style={{ color: "var(--text-on-navy)" }}
            >
              Make a Donation
            </h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Every contribution — big or small — sustains the temple's rituals
              and the trust's charitable work.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <form
          onSubmit={handleSubmit}
          className="container-xl donation-layout"
          noValidate
        >
          <div className="donation-main-col">
            <SectionHeading
              align="left"
              eyebrow="Step 1"
              title="Choose a Category"
            />
            <DonationCategorySelect
              categories={categories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />

            <div style={{ height: 48 }} />

            <SectionHeading
              align="left"
              eyebrow="Step 2"
              title="Choose an Amount"
            />
            <AmountSelector
              amounts={amounts}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              onSelectAmount={handleSelectAmount}
              onCustomChange={setCustomAmount}
            />

            <div style={{ height: 48 }} />

            <SectionHeading
              align="left"
              eyebrow="Step 3"
              title="Your Details"
            />
            <DonorDetailsForm
              form={form}
              onChange={handleFormChange}
              anonymous={anonymous}
              onAnonymousChange={setAnonymous}
              recurring={recurring}
              onRecurringChange={setRecurring}
              wants80G={wants80G}
              onWants80GChange={setWants80G}
              errors={errors}
            />
          </div>

          <motion.div
            className="donation-summary-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Donation Summary</h3>
            <div className="summary-row">
              <span>Category</span>
              <strong>{selectedCategory?.title || "General Donation"}</strong>
            </div>
            <div className="summary-row">
              <span>Amount</span>
              <strong className="summary-amount">
                ₹{finalAmount ? finalAmount.toLocaleString("en-IN") : "0"}
              </strong>
            </div>
            <div className="summary-row">
              <span>Frequency</span>
              <strong>{recurring ? "Monthly" : "One-time"}</strong>
            </div>
            <div className="summary-row">
              <span>Receipt</span>
              <strong>
                {wants80G ? "80G Tax Receipt" : "Standard Receipt"}
              </strong>
            </div>

            {errors.submit && (
              <div
                style={{
                  background: "#fee2e2",
                  color: "#991b1b",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  marginTop: "0.75rem",
                }}
              >
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              className="btn-temple btn-primary-gold form-submit-btn mt-2"
              disabled={submitting || !finalAmount || !isformValid}
            >
              <FiHeart />{" "}
              {submitting
                ? "Processing..."
                : `Donate ₹${finalAmount ? finalAmount.toLocaleString("en-IN") : "0"}`}
            </button>

            {!isformValid && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#b91c1c",
                  marginTop: "6px",
                  textAlign: "center",
                }}
              >
                Please fill in Name, Date of birth and Email to enable donation.
              </p>
            )}

            <p className="donation-secure-note">
              <FiShield size={13} /> Secure payment processing via Razorpay
            </p>
          </motion.div>
        </form>
      </section>
    </>
  );
}
