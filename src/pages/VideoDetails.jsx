// VideoDetails.jsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiClock } from "react-icons/fi";

import {
    getVideoBySlug,
    getVideos,
} from "../services/templeService";

import PageLoader from "../components/common/PageLoader";

import "./VideoDetails.css";


export default function VideoDetails() {

    const { slug } = useParams();

    const [video, setVideo] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadVideo = async () => {

            try {

                setLoading(true);

                const videoData = await getVideoBySlug(slug);

                const allVideos = await getVideos();

                setVideo(videoData);

                setRecommended(
                    allVideos
                        .filter((item) => item.slug !== slug)
                        .slice(0, 4)
                );

            } catch (error) {

                console.error(
                    "Failed to load video:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadVideo();

    }, [slug]);


    if (loading) {
        return <PageLoader />;
    }


    if (!video) {

        return (
            <section className="section">

                <div className="container-xl">

                    <h2>
                        Video not found.
                    </h2>

                </div>

            </section>
        );

    }


    // Convert YouTube URL to embed URL
    const getYoutubeEmbedUrl = (url) => {

        if (!url) {
            return "";
        }

        try {

            const parsed = new URL(url);

            let videoId = "";

            // https://youtu.be/VIDEO_ID
            if (parsed.hostname.includes("youtu.be")) {

                videoId = parsed.pathname.replace("/", "");

            }

            // https://www.youtube.com/watch?v=VIDEO_ID
            else if (
                parsed.hostname.includes("youtube.com")
            ) {

                videoId =
                    parsed.searchParams.get("v") || "";

                // https://www.youtube.com/embed/VIDEO_ID
                if (
                    !videoId &&
                    parsed.pathname.startsWith("/embed/")
                ) {

                    videoId =
                        parsed.pathname.split("/embed/")[1];

                }

            }

            return videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : url;

        } catch {

            return url;

        }

    };


    const embedUrl =
        getYoutubeEmbedUrl(video.video_url);


    return (
        <>
            {/* =========================
                BREADCRUMB
            ========================== */}

            <div className="video-breadcrumb">

                <div className="container-xl">

                    <Link to="/">
                        Home
                    </Link>

                    <FiChevronRight size={14} />

                    <Link to="/videos">
                        Videos
                    </Link>

                    <FiChevronRight size={14} />

                    <span>
                        {video.title}
                    </span>

                </div>

            </div>


            {/* =========================
                VIDEO DETAILS
            ========================== */}

            <section className="section video-details-section">

                <div className="container-xl video-details-layout">


                    {/* LEFT SIDE */}
                    <main className="video-details-main">


                        {/* Video Player */}
                        <div className="video-player-wrapper">

                            <iframe
                                src={embedUrl}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />

                        </div>


                        {/* Title */}
                        <h1 className="video-details-title">
                            {video.title}
                        </h1>


                        {/* Meta */}
                        <div className="video-meta">

                            {video.duration && (

                                <span>
                                    <FiClock size={14} />
                                    {video.duration}
                                </span>

                            )}

                            {video.language && (
                                <span>
                                    {video.language}
                                </span>
                            )}

                            {video.category && (
                                <span>
                                    {video.category}
                                </span>
                            )}

                        </div>


                        {/* Description */}
                        {video.description && (

                            <div className="video-description">

                                <h3>
                                    About this video
                                </h3>

                                <p>
                                    {video.description}
                                </p>

                            </div>

                        )}

                    </main>


                    {/* RIGHT SIDE */}
                    <aside className="recommended-videos">

                        <h3>
                            Recommended Videos
                        </h3>


                        {recommended.length === 0 ? (

                            <p className="text-muted">
                                No other videos available.
                            </p>

                        ) : (

                            recommended.map((item) => (

                                <Link
                                    key={item.id}
                                    to={`/videos/${item.slug}`}
                                    className="recommended-video"
                                >

                                    <div className="recommended-thumbnail">

                                        <img
                                            src={
                                                item.thumbnail
                                                    ? `http://127.0.0.1:8000/storage/${item.thumbnail}`
                                                    : "/images/video-placeholder.jpg"
                                            }
                                            alt={item.title}
                                        />

                                        <div className="recommended-play">
                                            ▶
                                        </div>

                                    </div>


                                    <div className="recommended-info">

                                        <h4>
                                            {item.title}
                                        </h4>

                                        {item.duration && (
                                            <span>
                                                {item.duration}
                                            </span>
                                        )}

                                    </div>

                                </Link>

                            ))

                        )}

                    </aside>

                </div>

            </section>

        </>
    );
}