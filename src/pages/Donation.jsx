import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiCheckCircle, FiShield } from "react-icons/fi";
import donationBanner from "../assets/images/donations/donation-banner.jpg";
import { getDonationCategories, getSuggestedAmounts } from "../services/templeService";
import SectionHeading from "../components/common/SectionHeading";
import DonationCategorySelect from "../components/donation/DonationCategorySelect";
import AmountSelector from "../components/donation/AmountSelector";
import DonorDetailsForm from "../components/donation/DonorDetailsForm";
import "./Donation.css";

const initialForm = { name: "", email: "", phone: "", pan: "" };

export default function Donation() {
  const [categories, setCategories] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("general-donation");
  const [selectedAmount, setSelectedAmount] = useState(1101);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState(initialForm);
  const [anonymous, setAnonymous] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [wants80G, setWants80G] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getDonationCategories().then(setCategories);
    getSuggestedAmounts().then(setAmounts);
  }, []);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const handleFormChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSelectAmount = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return;
    setSubmitting(true);
    // Will POST to /api/donations (creating a Razorpay order) once the Laravel backend is connected.
    await new Promise((res) => setTimeout(res, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section donation-success-section">
        <div className="container-xl">
          <motion.div className="donation-success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <FiCheckCircle size={52} color="var(--gold)" />
            <h2 className="section-heading" style={{ marginTop: 16 }}>Thank You for Your Generosity</h2>
            <p style={{ maxWidth: 520, margin: "12px auto 8px" }}>
              Your donation of <strong>₹{finalAmount.toLocaleString("en-IN")}</strong> towards{" "}
              <strong>{selectedCategory?.title || "General Donation"}</strong> has been recorded.
              {wants80G && " An 80G tax receipt will be emailed to you shortly."}
              {recurring && " Your monthly recurring donation has been set up."}
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              A confirmation has been sent to {form.email || "your email"}.
            </p>
            <button className="btn-temple btn-navy-outline" style={{ marginTop: 20 }} onClick={() => setSubmitted(false)}>
              Make Another Donation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-banner" style={{ backgroundImage: `url(${donationBanner})` }}>
        <div className="page-banner-overlay" />
        <div className="container-xl page-banner-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>Give With Purpose</span>
            <h1 className="section-heading" style={{ color: "var(--text-on-navy)" }}>Make a Donation</h1>
            <p style={{ color: "rgba(244,239,225,0.82)", maxWidth: 560 }}>
              Every contribution — big or small — sustains the temple's rituals and the trust's charitable work.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <form onSubmit={handleSubmit} className="container-xl donation-layout">
          <div className="donation-main-col">
            <SectionHeading align="left" eyebrow="Step 1" title="Choose a Category" />
            <DonationCategorySelect categories={categories} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />

            <div style={{ height: 48 }} />

            <SectionHeading align="left" eyebrow="Step 2" title="Choose an Amount" />
            <AmountSelector
              amounts={amounts}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              onSelectAmount={handleSelectAmount}
              onCustomChange={setCustomAmount}
            />

            <div style={{ height: 48 }} />

            <SectionHeading align="left" eyebrow="Step 3" title="Your Details" />
            <DonorDetailsForm
              form={form}
              onChange={handleFormChange}
              anonymous={anonymous}
              onAnonymousChange={setAnonymous}
              recurring={recurring}
              onRecurringChange={setRecurring}
              wants80G={wants80G}
              onWants80GChange={setWants80G}
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
              <strong className="summary-amount">₹{finalAmount ? finalAmount.toLocaleString("en-IN") : "0"}</strong>
            </div>
            <div className="summary-row">
              <span>Frequency</span>
              <strong>{recurring ? "Monthly" : "One-time"}</strong>
            </div>
            <div className="summary-row">
              <span>Receipt</span>
              <strong>{wants80G ? "80G Tax Receipt" : "Standard Receipt"}</strong>
            </div>

            <button type="submit" className="btn-temple btn-primary-gold form-submit-btn" disabled={submitting || !finalAmount}>
              <FiHeart /> {submitting ? "Processing..." : `Donate ₹${finalAmount ? finalAmount.toLocaleString("en-IN") : "0"}`}
            </button>

            <p className="donation-secure-note"><FiShield size={13} /> Secure payment processing via Razorpay</p>
          </motion.div>
        </form>
      </section>
    </>
  );
}
