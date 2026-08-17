import api from "./api";
import { templeInfo, todaysThought } from "../data/templeInfo";
import { statsData } from "../data/statsData";
import { donationCategories, suggestedAmounts } from "../data/donationData";
// import { pujaData } from "../data/pujaData";
import { eventsData } from "../data/eventsData";
import { testimonialData } from "../data/testimonialData";
import { homeGalleryPreview } from "../data/galleryData";
import { newsData } from "../data/newsData";
import { gaushalaStats, cowSponsorshipPlans } from "../data/gaushalaData";
import {
  bhojanshalaStats,
  mealSponsorshipPlans,
} from "../data/bhojanshalaData";

const resolve = (data, delay = 150) =>
  new Promise((res) => setTimeout(() => res(data), delay));

export const getTempleInfo = () => resolve(templeInfo);
export const getTodaysThought = () => resolve(todaysThought);
export const getStats = () => resolve(statsData);
export const getDonationCategories = () => resolve(donationCategories);
export const getSuggestedAmounts = () => resolve(suggestedAmounts);

// export const getPujas = () => resolve(pujaData);
// export const getPujaBySlug = (slug) => resolve(pujaData.find((p) => p.id === slug) || null);

export const getPujas = async () => {
    try {
        const response = await api.get("/poojas");

        return response.data.poojas || [];
    } catch (error) {
        // console.error("Failed to fetch Poojas:", error);
        throw error;
    }
};

export const getPujaBySlug = async (slug) => {
    try {
        const response = await api.get("/poojas");

        const pujas = response.data.poojas || [];

        const puja = pujas.find(
            (item) =>
                String(item.id) === String(slug) ||
                String(item.slug) === String(slug)
        );

        return puja || null;
    } catch (error) {
        // console.error("Failed to fetch Puja details:", error);
        throw error;
    }
};

export const getUpcomingEvents = () => resolve(eventsData.filter((e) => !e.isPast));
export const getAllEvents = () => resolve(eventsData);
export const getTestimonials = () => resolve(testimonialData);
export const getHomeGalleryPreview = () => resolve(homeGalleryPreview);
export const getLatestNews = () => resolve(newsData);
export const getGaushalaStats = () => resolve(gaushalaStats);
export const getCowSponsorshipPlans = () => resolve(cowSponsorshipPlans);
export const getBhojanshalaStats = () => resolve(bhojanshalaStats);
export const getMealSponsorshipPlans = () => resolve(mealSponsorshipPlans);

export const submitMemberUpdate = (payload) => {
  return new Promise((res) => {
    setTimeout(() => {
      try {
        const existing = JSON.parse(
          localStorage.getItem("temple_trust_member_updates") || "[]",
        );
        existing.push({ ...payload, submittedAt: new Date().toISOString() });
        localStorage.setItem(
          "temple_trust_member_updates",
          JSON.stringify(existing),
        );
      } catch {
        // localStorage may be unavailable (e.g. private browsing) — safe to ignore for this dummy layer.
      }
      res({ success: true });
    }, 900);
  });
};

// ===============================
// VIDEOS
// ===============================
export const getVideos = async () => {
    try {
        const response = await api.get("/videos");

        // console.log("VIDEO API RESPONSE:", response.data);

        const videos =
            response.data.videos ||
            response.data.video ||
            [];

        // console.log("VIDEOS SENT TO COMPONENT:", videos);

        return Array.isArray(videos) ? videos : [];

    } catch (error) {
        // console.error("Failed to fetch videos:", error);
        // console.error("Status:", error.response?.status);
        // console.error("Data:", error.response?.data);

        throw error;
    }
};


export const getVideoBySlug = async (slug) => {
    try {
        const response = await api.get(`/videos/${slug}`);

        return response.data.video || null;
    } catch (error) {
        // console.error("Failed to fetch video:", error);
        throw error;
    }
};

export const getGallery = async () => {
    try {
        const response = await api.get("/gallery");

        // console.log("Gallery API Response:", response.data);

        return response.data.gallery || [];
    } catch (error) {
        // console.error("Error fetching gallery:", error);
        // console.error("Status:", error.response?.status);
        // console.error("Response:", error.response?.data);

        throw error;
    }
};