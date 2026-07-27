import HeroSlider from "../components/home/HeroSlider";
import QuickInfoBar from "../components/home/QuickInfoBar";
import WelcomeSection from "../components/home/WelcomeSection";
import TodaysThought from "../components/home/TodaysThought";
import StatsCounter from "../components/home/StatsCounter";
import DonationCategoriesPreview from "../components/home/DonationCategoriesPreview";
import PujaPreview from "../components/home/PujaPreview";
import SevaHighlight from "../components/home/SevaHighlight";
import FestivalBanner from "../components/home/FestivalBanner";
import LatestEvents from "../components/home/LatestEvents";
import CulturalActivities from "../components/home/CulturalActivities";
import Testimonials from "../components/home/Testimonials";
import LatestNews from "../components/home/LatestNews";
import GalleryPreview from "../components/home/GalleryPreview";
// import VideoGallery from "../components/home/VideoGallery";
// import GoogleReviews from "../components/home/GoogleReviews";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <QuickInfoBar />
      <WelcomeSection />
      <TodaysThought />
      <StatsCounter />
      <DonationCategoriesPreview />
      <PujaPreview />
      <SevaHighlight />
      <FestivalBanner />
      <LatestEvents />
      {/* <CulturalActivities /> */}
      <Testimonials />
      {/* <LatestNews /> */}
      {/* <GalleryPreview /> */}
      {/* <VideoGallery /> */}
      {/* <GoogleReviews /> */}
      <CTASection />
    </>
  );
}
