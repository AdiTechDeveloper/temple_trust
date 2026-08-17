import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiPlay } from "react-icons/fi";

import { getVideos } from "../services/templeService";
import { videoDetailsPath } from "../routes/routePaths";

import "./HomeVideos.css";

const STORAGE_URL = "http://127.0.0.1:8000/storage";

export default function HomeVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getVideos();

                // console.log("HOME VIDEOS DATA:", data);

                setVideos(data.slice(0, 4));
            } catch (error) {
                // console.error("Home video error:", error);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return null;
    }

    if (!videos.length) {
        return (
            <section className="home-videos-section section">
                <div className="container-xl">
                    <p>No videos available.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="home-videos-section section">
            <div className="container-xl">

                <div className="home-videos-header">

                    <div>
                        <span className="eyebrow">
                            TEMPLE VIDEOS
                        </span>

                        <h2 className="section-heading">
                            Watch & Experience the Divine
                        </h2>
                    </div>

                    <Link
                        to="/videos"
                        className="home-videos-view-all"
                    >
                        View All Videos
                        <FiArrowRight size={15} />
                    </Link>

                </div>

                <div className="home-videos-grid">

                    {videos.map((video, index) => {

                        const thumbnailUrl = video.thumbnail
                            ? `${STORAGE_URL}/${video.thumbnail}`
                            : "/images/video-placeholder.jpg";

                        return (
                            <motion.div
                                key={video.id}
                                className="home-video-card"
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                }}
                            >
                                <Link
                                    to={videoDetailsPath(video.slug)}
                                    className="home-video-link"
                                >
                                    <div className="home-video-thumbnail">

                                        <img
                                            src={thumbnailUrl}
                                            alt={video.title}
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "/images/video-placeholder.jpg";
                                            }}
                                        />

                                        <span className="home-video-play">
                                            <FiPlay
                                                size={20}
                                                fill="currentColor"
                                            />
                                        </span>

                                        {video.duration && (
                                            <span className="home-video-duration">
                                                <FiClock size={11} />
                                                {video.duration}
                                            </span>
                                        )}

                                    </div>

                                    <div className="home-video-content">

                                        {video.category && (
                                            <span className="home-video-category">
                                                {video.category}
                                            </span>
                                        )}

                                        <h3>
                                            {video.title}
                                        </h3>

                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}