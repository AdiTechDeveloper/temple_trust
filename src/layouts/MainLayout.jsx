import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";
import StickyDonateButton from "../components/common/StickyDonateButton";
import JoinUpdatesPopup from "../components/common/joinUpdates/JoinUpdatesPopup";
import { JoinUpdatesProvider } from "../context/JoinUpdatesContext";
import BackToTop from "../components/common/BackToTop";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function MainLayout() {
  useScrollToTop();
  return (
    <JoinUpdatesProvider>
    <div className="app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyDonateButton />
      <BackToTop />
      <JoinUpdatesPopup />
    </div>
    </JoinUpdatesProvider>
  );
}
