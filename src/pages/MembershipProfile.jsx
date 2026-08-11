import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import SectionHeading from "../components/common/SectionHeading";
import { updateProfile } from "../services/authService";
import "./MembershipProfile.css";

const emptyForm = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  marital_status: "",
  dob: "",
  anniversary_date: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  profile_photo: null,
};

const getProfilePhotoUrl = (photo) => {
  if (!photo) return null;

  // Already a complete URL
  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }

  // Laravel already returned /storage/...
  if (photo.startsWith("/storage/")) {
    return `http://127.0.0.1:8000${photo}`;
  }

  // Normal Laravel stored path:
  // profile_photos/filename.jpg
  return `http://127.0.0.1:8000/storage/${photo}`;
};


export default function MembershipProfile() {
  const { user, updateProfile } = useAuth();


  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  /*
  |--------------------------------------------------------------------------
  | Load existing user data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      gender: user.gender || "",
      marital_status: user.marital_status || "",
      dob: user.dob || "",
      anniversary_date: user.anniversary_date || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
    });

    if (user.profile_photo) {
      setPreviewPhoto(getProfilePhotoUrl(user.profile_photo));
    } else {
      setPreviewPhoto(null);
    }
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Handle input
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "mobile" || name === "pincode") {
      newValue = value.replace(/\D/g, "");

      if (name === "mobile") {
        newValue = newValue.slice(0, 10);
      }

      if (name === "pincode") {
        newValue = newValue.slice(0, 6);
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // If user changes marital status away from married,
    // remove anniversary date.
    if (name === "marital_status" && newValue !== "Married") {
      setForm((prev) => ({
        ...prev,
        marital_status: newValue,
        anniversary_date: "",
      }));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Profile Photo
  |--------------------------------------------------------------------------
  */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      alert("Profile photo must be less than 2 MB.");
      return;
    }

    setProfilePhoto(file);

    const previewUrl = URL.createObjectURL(file);
    setPreviewPhoto(previewUrl);
  };

  /*
  |--------------------------------------------------------------------------
  | Save Profile
  |--------------------------------------------------------------------------
  */

  const handleSave = async (e) => {

    e.preventDefault();

    setSaving(true);
    setErrors({});

    try {

      const formData = new FormData();

      Object.keys(form).forEach((key) => {

        if (key !== "profile_photo") {
          formData.append(
            key,
            form[key] || ""
          );
        }

      });

      if (profilePhoto) {
        formData.append(
          "profile_photo",
          profilePhoto
        );
      }


      console.log("Sending profile update...");


      const response = await updateProfile(formData);


      console.log(
        "Profile update response:",
        response
      );


      setIsEditing(false);

      setProfilePhoto(null);


      alert(
        response?.message ||
        response?.data?.message ||
        "Profile updated successfully."
      );


    } catch (error) {

      console.error(
        "Profile update error:",
        error
      );


      if (error.response?.status === 422) {

        setErrors(
          error.response.data.errors || {}
        );

      } else {

        alert(
          error.response?.data?.message ||
          "Unable to update profile. Please try again."
        );

      }

    } finally {

      setSaving(false);

    }
  };

  /*
  |--------------------------------------------------------------------------
  | Date formatting
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Profile completion
  |--------------------------------------------------------------------------
  */

  const completionFields = [
    user?.name,
    user?.email,
    user?.mobile,
    user?.gender,
    user?.marital_status,
    user?.dob,
    user?.address,
    user?.city,
    user?.state,
    user?.pincode,
    user?.profile_photo,
  ];

  // Anniversary is required only for married users
  if (user?.marital_status === "Married") {
    completionFields.push(user?.anniversary_date);
  }

  const completedFields = completionFields.filter(
    (field) => field !== null && field !== undefined && field !== ""
  ).length;

  const completionPercentage = Math.round(
    (completedFields / completionFields.length) * 100
  );

  return (
    <section className="section profile-section">
      <div className="container-xl">

        {/* ================= HEADER ================= */}

        <div className="profile-header">

          <div className="profile-header-left">

            <div className="profile-avatar-wrapper">

              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt={user?.name || "Profile"}
                  width={200}
                  height={200}
                  borderRadius={50}
                  className="profile-avatar-image"
                />
              ) : (
                <span className="profile-avatar">
                  {(user?.name || "D").charAt(0).toUpperCase()}
                </span>
              )}

              {isEditing && (
                <label
                  htmlFor="profile_photo"
                  className="profile-camera-btn"
                >
                  <FiCamera size={15} />

                  <input
                    id="profile_photo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    hidden
                  />
                </label>
              )}

            </div>

            <div>
              <h2 style={{ fontSize: "1.6rem" }}>
                {user?.name || "Devotee"}
              </h2>

              <p>
                {user?.email || "No email"} · Member since{" "}
                {user?.created_at
                  ? formatDate(user.created_at)
                  : user?.memberSince || "—"}
              </p>
            </div>

          </div>

          {!isEditing ? (
            <button
              className="btn-temple btn-navy-outline"
              onClick={() => setIsEditing(true)}
            >
              <FiEdit2 />
              Edit Profile
            </button>
          ) : (
            <button
              className="btn-temple btn-navy-outline"
              onClick={() => {
                setIsEditing(false);
                setProfilePhoto(null);

                // Reset form to latest user data
                if (user) {
                  setForm({
                    name: user.name || "",
                    email: user.email || "",
                    mobile: user.mobile || "",
                    gender: user.gender || "",
                    marital_status: user.marital_status || "",
                    dob: user.dob || "",
                    anniversary_date: user.anniversary_date || "",
                    address: user.address || "",
                    city: user.city || "",
                    state: user.state || "",
                    pincode: user.pincode || "",
                  });

                  // setPreviewPhoto(user.profile_photo || null);
                  if (user.profile_photo) {
                    setPreviewPhoto(getProfilePhotoUrl(user.profile_photo));
                  } else {
                    setPreviewPhoto(null);
                  }
                }

                setErrors({});
              }}
            >
              <FiX />
              Cancel
            </button>
          )}

        </div>

        {/* ================= PROFILE COMPLETION ================= */}

        {!isEditing && completionPercentage < 100 && (
          <motion.div
            className="profile-completion-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="profile-completion-header">
              <div>
                <strong>Complete Your Profile</strong>
                <p>
                  Add your remaining details to keep your membership profile
                  complete.
                </p>
              </div>

              <strong>{completionPercentage}%</strong>
            </div>

            <div className="profile-progress">
              <div
                className="profile-progress-bar"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <button
              className="btn-temple btn-primary-gold"
              onClick={() => setIsEditing(true)}
            >
              <FiEdit2 />
              Complete Profile
            </button>
          </motion.div>
        )}

        {/* ================= VIEW MODE ================= */}

        {!isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >

            <SectionHeading
              align="left"
              eyebrow="Personal Information"
              title="Profile Details"
            />

            <div className="profile-details-grid">

              <ProfileDetail
                icon={<FiUser />}
                label="Full Name"
                value={user?.name}
              />

              <ProfileDetail
                icon={<FiMail />}
                label="Email Address"
                value={user?.email}
              />

              <ProfileDetail
                icon={<FiPhone />}
                label="Mobile Number"
                value={user?.mobile}
              />

              <ProfileDetail
                icon={<FiUser />}
                label="Gender"
                value={user?.gender}
              />

              <ProfileDetail
                icon={<FiUser />}
                label="Marital Status"
                value={user?.marital_status}
              />

              <ProfileDetail
                icon={<FiCalendar />}
                label="Date of Birth"
                value={formatDate(user?.dob)}
              />

              {user?.marital_status === "Married" && (
                <ProfileDetail
                  icon={<FiCalendar />}
                  label="Anniversary Date"
                  value={formatDate(user?.anniversary_date)}
                />
              )}

              <ProfileDetail
                icon={<FiMapPin />}
                label="Address"
                value={user?.address}
                wide
              />

              <ProfileDetail
                icon={<FiMapPin />}
                label="City"
                value={user?.city}
              />

              <ProfileDetail
                icon={<FiMapPin />}
                label="State"
                value={user?.state}
              />

              <ProfileDetail
                icon={<FiMapPin />}
                label="Pincode"
                value={user?.pincode}
              />

            </div>

          </motion.div>
        )}

        {/* ================= EDIT MODE ================= */}

        {isEditing && (
          <motion.form
            onSubmit={handleSave}
            className="profile-edit-form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >

            <SectionHeading
              align="left"
              eyebrow="Personal Information"
              title="Complete Your Profile"
            />

            {/* Name + Email */}

            <div className="form-row">

              <ProfileInput
                label="Full Name"
                icon={<FiUser size={14} />}
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              
              />

              <ProfileInput
                label="Email Address"
                icon={<FiMail size={14} />}
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                readOnly
              />

            </div>

            {/* Mobile + Gender */}

            <div className="form-row">

              <ProfileInput
                label="Mobile Number"
                icon={<FiPhone size={14} />}
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                maxLength={10}
                error={errors.mobile}
              />

              <div className="form-field">
                <label htmlFor="gender">
                  <FiUser size={14} />
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  disabled
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <FieldError error={errors.gender} />
              </div>

            </div>

            {/* DOB + Marital Status */}

            <div className="form-row">

              <div className="form-field">
                <label htmlFor="dob">
                  <FiCalendar size={14} />
                  Date of Birth
                </label>

                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                />

                <FieldError error={errors.dob} />
              </div>

              <div className="form-field">
                <label htmlFor="marital_status">
                  <FiUser size={14} />
                  Marital Status
                </label>

                <select
                  id="marital_status"
                  name="marital_status"
                  value={form.marital_status}
                  onChange={handleChange}
                >
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>

                <FieldError error={errors.marital_status} />
              </div>

            </div>

            {/* Anniversary */}

            {form.marital_status === "Married" && (
              <div className="form-field">
                <label htmlFor="anniversary_date">
                  <FiCalendar size={14} />
                  Anniversary Date
                </label>

                <input
                  id="anniversary_date"
                  name="anniversary_date"
                  type="date"
                  value={form.anniversary_date}
                  onChange={handleChange}
                />

                <FieldError error={errors.anniversary_date} />
              </div>
            )}

            {/* Address */}

            <div className="form-field">
              <label htmlFor="address">
                <FiMapPin size={14} />
                Address
              </label>

              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House no, street, area"
                rows={3}
              />

              <FieldError error={errors.address} />
            </div>

            {/* City + State */}

            <div className="form-row">

              <ProfileInput
                label="City"
                icon={<FiMapPin size={14} />}
                name="city"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
              />

              <ProfileInput
                label="State"
                icon={<FiMapPin size={14} />}
                name="state"
                value={form.state}
                onChange={handleChange}
                error={errors.state}
              />

            </div>

            {/* Pincode */}

            <div className="form-field">
              <label htmlFor="pincode">
                <FiMapPin size={14} />
                Pincode
              </label>

              <input
                id="pincode"
                name="pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={form.pincode}
                onChange={handleChange}
                placeholder="380001"
              />

              <FieldError error={errors.pincode} />
            </div>

            {/* Profile Photo */}

            <div className="form-field">
              <label htmlFor="profile_photo">
                <FiCamera size={14} />
                Profile Photo
              </label>

              <input
                id="profile_photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
              />

              <small>
                JPG, PNG or WEBP. Maximum size 2 MB.
              </small>

              <FieldError error={errors.profile_photo} />
            </div>

            {/* Save */}

            <button
              type="submit"
              className="btn-temple btn-primary-gold form-submit-btn"
              disabled={saving}
            >
              <FiSave />

              {saving ? "Saving..." : "Save Profile"}
            </button>

          </motion.form>
        )}

      </div>
    </section>
  );
}


/*
|--------------------------------------------------------------------------
| Profile Detail
|--------------------------------------------------------------------------
*/

function ProfileDetail({ icon, label, value, wide = false }) {
  return (
    <div
      className={`profile-detail-card ${wide ? "profile-detail-card-wide" : ""
        }`}
    >
      <span className="profile-detail-icon">
        {icon}
      </span>

      <span className="profile-detail-label">
        {label}
      </span>

      <strong>
        {value || "—"}
      </strong>
    </div>
  );
}


/*
|--------------------------------------------------------------------------
| Input
|--------------------------------------------------------------------------
*/

function ProfileInput({
  label,
  icon,
  name,
  type = "text",
  value,
  onChange,
  error,
  maxLength,
  readOnly = false,
}) {
  return (
    <div className="form-field">

      <label htmlFor={name}>
        {icon}
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        readOnly = {readOnly}
      />

      <FieldError error={error} />

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| Error
|--------------------------------------------------------------------------
*/

function FieldError({ error }) {
  if (!error) return null;

  return (
    <small className="text-danger">
      {Array.isArray(error) ? error[0] : error}
    </small>
  );
}