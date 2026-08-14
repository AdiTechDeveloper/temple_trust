import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiCheck, FiChevronRight, FiPackage } from "react-icons/fi";

import { getPujaBySlug } from "../services/templeService";
import { ROUTE_PATHS } from "../routes/routePaths";
import PujaBookingForm from "../components/puja/PujaBookingForm";
import PageLoader from "../components/common/PageLoader";
import { STORAGE_URL } from "../config/api";
import "./PujaDetails.css";

export default function PujaDetails() {
  const { slug } = useParams();

  const [puja, setPuja] = useState(undefined);

  useEffect(() => {
    setPuja(undefined);

    getPujaBySlug(slug)
      .then(setPuja)
      .catch(() => setPuja(null));
  }, [slug]);

  // Loading
  if (puja === undefined) {
    return <PageLoader />;
  }

  // Not found
  if (puja === null) {
    return <Navigate to={ROUTE_PATHS.PUJA_BOOKING} replace />;
  }

  const originalPrice = Number(puja.price || 0);

  const offerPrice =
    puja.offer_price !== null &&
    puja.offer_price !== undefined &&
    puja.offer_price !== ""
      ? Number(puja.offer_price)
      : null;

  const mainImage = puja.photo
    ? `${STORAGE_URL}/${puja.photo}`
    : "/images/default-puja.jpg";

  const gallery = Array.isArray(puja.gallery) ? puja.gallery : [];

  const benefits = Array.isArray(puja.benefits) ? puja.benefits : [];

  const samagri = Array.isArray(puja.samagri) ? puja.samagri : [];

  return (
    <>
      {/* Breadcrumb */}
      <div className="puja-breadcrumb">
        <div className="container-xl">
          <Link to={ROUTE_PATHS.HOME}>Home</Link>

          <FiChevronRight size={13} />

          <Link to={ROUTE_PATHS.PUJA_BOOKING}>Puja Booking</Link>

          <FiChevronRight size={13} />

          <span>{puja.name}</span>
        </div>
      </div>

      {/* Main Section */}
      <section className="section puja-details-section">
        <div className="container-xl puja-details-grid">
          <motion.div
            className="puja-details-content"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {/* Main Image */}
            <div className="puja-main-image-wrapper">
              <img
                src={mainImage}
                alt={puja.name}
                className="puja-details-image"
              />
            </div>
            {/* Title */}
            <span
              className="eyebrow"
              style={{
                marginTop: 28,
              }}
            >
              Puja Details
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: "2.1rem",
              }}
            >
              {puja.name}
            </h1>
            {/* Price + Duration */}
            <div className="puja-meta-row">
              {/* Duration */}
              <span className="puja-duration">
                <FiClock size={14} />
                Duration:
                <strong>{puja.duration || "N/A"} Hours</strong>
              </span>

              {/* Price */}
              <div className="puja-price-box">
                {offerPrice !== null ? (
                  <>
                    <span className="puja-original-price">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>

                    <span className="puja-offer-price">
                      ₹{offerPrice.toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span className="puja-offer-price">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>
            {/* Description */}
            <div className="puja-description">
              <p>
                {puja.description ||
                  puja.short_description ||
                  "No description available."}
              </p>
            </div>
            {benefits.length > 0 && (
              <div className="puja-info-section">
                <h3 className="puja-subheading">Benefits</h3>

                <ul className="puja-benefit-list">
                  {benefits.map((benefit, index) => (
                    <li key={index}>
                      <FiCheck color="var(--gold)" />

                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {samagri.length > 0 && (
              <div className="puja-info-section">
                <h3 className="puja-subheading">
                  <FiPackage size={17} />
                  Samagri Included
                </h3>

                <div className="puja-samagri-chips">
                  {samagri.map((item, index) => (
                    <span key={index} className="samagri-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <div className="puja-info-section puja-gallery-section">
                <h3 className="puja-subheading">Puja Gallery</h3>

                <div className="puja-gallery-grid">
                  {gallery.map((image, index) => (
                    <div className="puja-gallery-item" key={index}>
                      <img
                        src={`${STORAGE_URL}/${image}`}
                        alt={`${puja.name} ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="puja-booking-panel"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",

                fontSize: "1.3rem",

                marginBottom: 20,
              }}
            >
              Reserve This Puja
            </h3>

            <PujaBookingForm puja={puja} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
