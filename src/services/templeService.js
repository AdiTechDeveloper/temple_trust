// Data-access layer. Every function currently resolves from local dummy data
// wrapped in a Promise so components already call it exactly as they will
// once wired to the Laravel API (just swap the function body for apiClient calls).

import { templeInfo, todaysThought } from "../data/templeInfo";
import { statsData } from "../data/statsData";
import { donationCategories, suggestedAmounts } from "../data/donationData";
import { pujaData } from "../data/pujaData";
import { eventsData } from "../data/eventsData";
import { testimonialData } from "../data/testimonialData";
import { homeGalleryPreview } from "../data/galleryData";
import { newsData } from "../data/newsData";

const resolve = (data, delay = 150) =>
  new Promise((res) => setTimeout(() => res(data), delay));

export const getTempleInfo = () => resolve(templeInfo);
export const getTodaysThought = () => resolve(todaysThought);
export const getStats = () => resolve(statsData);
export const getDonationCategories = () => resolve(donationCategories);
export const getSuggestedAmounts = () => resolve(suggestedAmounts);
export const getPujas = () => resolve(pujaData);
export const getPujaBySlug = (slug) => resolve(pujaData.find((p) => p.id === slug) || null);
export const getUpcomingEvents = () => resolve(eventsData);
export const getTestimonials = () => resolve(testimonialData);
export const getHomeGalleryPreview = () => resolve(homeGalleryPreview);
export const getLatestNews = () => resolve(newsData);
