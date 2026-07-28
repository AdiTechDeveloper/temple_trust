import { ROUTE_PATHS } from "../routes/routePaths";

export const navData = [
  { label: "Home", path: ROUTE_PATHS.HOME },
  {
    label: "About", path:ROUTE_PATHS.ABOUT_TEMPLE
    // children: [
    //   { label: "About Trust", path: ROUTE_PATHS.ABOUT_TRUST },
    //   { label: "About Temple", path: ROUTE_PATHS.ABOUT_TEMPLE },
    // ],
  },
  // { label: "Online Darshan", path: ROUTE_PATHS.ONLINE_DARSHAN },
  { label: "Puja Booking", path: ROUTE_PATHS.PUJA_BOOKING },
  { label: "Donation", path: ROUTE_PATHS.DONATION },
  {
    label: "Seva",
    children: [
      { label: "Gaushala", path: ROUTE_PATHS.GAUSHALA },
      { label: "Bhojanshala", path: ROUTE_PATHS.BHOJANSHALA },
      // { label: "Cultural Activities", path: ROUTE_PATHS.CULTURAL_ACTIVITIES },
      // { label: "Volunteer", path: ROUTE_PATHS.VOLUNTEER },
    ],
  },
  { label: "Events", path: ROUTE_PATHS.EVENTS },
  { label: "Gallery", path: ROUTE_PATHS.GALLERY },
  // { label: "News", path: ROUTE_PATHS.NEWS },
  { label: "Contact", path: ROUTE_PATHS.CONTACT },
];
