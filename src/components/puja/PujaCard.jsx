// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FiClock, FiArrowRight } from "react-icons/fi";
// import { pujaImageMap } from "../../utils/pujaImageMap";
// import { pujaDetailsPath } from "../../routes/routePaths";
// import "./PujaCard.css";

// export default function PujaCard({ puja, index = 0 }) {
//   return (
//     <motion.div
//       className="puja-list-card"
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
//     >
//       <div className="puja-list-image">
//         <img src={pujaImageMap[puja.id]} alt={puja.title} />
//         <span className="puja-list-price">₹{puja.price.toLocaleString("en-IN")}</span>
//       </div>
//       <div className="puja-list-body">
//         <h4>{puja.title}</h4>
//         <p>{puja.description}</p>
//         <div className="puja-list-footer">
//           <span className="puja-list-duration"><FiClock size={13} /> {puja.duration}</span>
//           <Link to={pujaDetailsPath(puja.id)} className="puja-list-link">
//             View Details <FiArrowRight size={13} />
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { pujaDetailsPath } from "../../routes/routePaths";
import "./PujaCard.css";

const STORAGE_URL = "http://127.0.0.1:8000/storage";

export default function PujaCard({ puja, index = 0 }) {

    const imageUrl = puja.photo
        ? `${STORAGE_URL}/${puja.photo}`
        : "/images/default-puja.jpg";

    const originalPrice = Number(puja.price || 0);

    const offerPrice =
        puja.offer_price !== null &&
        puja.offer_price !== undefined &&
        Number(puja.offer_price) > 0
            ? Number(puja.offer_price)
            : null;

    const detailId = puja.slug || puja.id;

    return (
        <motion.div
            className="puja-list-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration: 0.5,
                delay: (index % 4) * 0.08,
            }}
        >

            {/* Image */}
            <div className="puja-list-image">

                <img
                    src={imageUrl}
                    alt={puja.name}
                />

                {/* Price */}
                <span className="puja-list-price">

                    {offerPrice ? (
                        <>
                            <span className="puja-old-price">
                                ₹{originalPrice.toLocaleString("en-IN")}
                            </span>

                            <span>
                                ₹{offerPrice.toLocaleString("en-IN")}
                            </span>
                        </>
                    ) : (
                        <>₹{originalPrice.toLocaleString("en-IN")}</>
                    )}

                </span>
            </div>

            {/* Body */}
            <div className="puja-list-body">

                <h4>{puja.name}</h4>

                <p>
                    {puja.short_description || puja.description}
                </p>

                {/* Footer */}
                <div className="puja-list-footer">

                    <span className="puja-list-duration">
                        <FiClock size={13} />
                        {puja.duration || "N/A"}
                    </span>

                    <Link
                        to={pujaDetailsPath(detailId)}
                        className="puja-list-link"
                    >
                        View Details
                        <FiArrowRight size={13} />
                    </Link>

                </div>

            </div>

        </motion.div>
    );
}