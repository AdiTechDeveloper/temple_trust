// Centralized route paths — import this instead of hardcoding strings anywhere in the app.
export const ROUTE_PATHS = {
  HOME: "/",
  ABOUT_TRUST: "/about-trust",
  ABOUT_TEMPLE: "/about-temple",
  ONLINE_DARSHAN: "/online-darshan",
  PUJA_BOOKING: "/puja-booking",
  PUJA_DETAILS: "/puja-booking/:slug",
  VIDEO: "/video",
  VIDEO_DETAILS: "/video/:slug",
  DONATION: "/donation",
  GAUSHALA: "/gaushala",
  BHOJANSHALA: "/bhojanshala",
  EVENTS: "/events",
  CULTURAL_ACTIVITIES: "/cultural-activities",
  GALLERY: "/gallery",
  NEWS: "/news",
  VOLUNTEER: "/volunteer",
  MEMBERSHIP_LOGIN: "/membership/login",
  MEMBERSHIP_REGISTER: "/membership/register",
  MEMBERSHIP_DASHBOARD: "/membership/dashboard",
  MEMBERSHIP_PROFILE: "/membership/profile",
  CONTACT: "/contact",
};

export const pujaDetailsPath = (slug) => `/puja-booking/${slug}`;

export const videoDetailsPath = (slug) => `/videos/${slug}`;
