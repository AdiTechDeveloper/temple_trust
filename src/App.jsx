import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PageLoader from "./components/common/PageLoader";
import ComingSoon from "./pages/ComingSoon";
import ProtectedRoute from "./components/membership/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ROUTE_PATHS } from "./routes/routePaths";

const Home = lazy(() => import("./pages/Home"));
const PujaBooking = lazy(() => import("./pages/PujaBooking"));
const PujaDetails = lazy(() => import("./pages/PujaDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const MembershipDashboard = lazy(() => import("./pages/MembershipDashboard"));
const AboutTemple = lazy(() => import("./pages/AboutTemple"));
const Gallery = lazy(() => import("./pages/Gallery"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
            <Route
              path={ROUTE_PATHS.ABOUT_TRUST}
              element={<ComingSoon title="About Trust" />}
            />
            <Route path={ROUTE_PATHS.ABOUT_TEMPLE} element={<AboutTemple />} />
            <Route
              path={ROUTE_PATHS.ONLINE_DARSHAN}
              element={<ComingSoon title="Online Darshan" />}
            />
            <Route path={ROUTE_PATHS.PUJA_BOOKING} element={<PujaBooking />} />
            <Route path={ROUTE_PATHS.PUJA_DETAILS} element={<PujaDetails />} />
            <Route
              path={ROUTE_PATHS.DONATION}
              element={<ComingSoon title="Donation" />}
            />
            <Route
              path={ROUTE_PATHS.GAUSHALA}
              element={<ComingSoon title="Gaushala" />}
            />
            <Route
              path={ROUTE_PATHS.BHOJANSHALA}
              element={<ComingSoon title="Bhojanshala" />}
            />
            <Route
              path={ROUTE_PATHS.EVENTS}
              element={<ComingSoon title="Events" />}
            />
            <Route
              path={ROUTE_PATHS.CULTURAL_ACTIVITIES}
              element={<ComingSoon title="Cultural Activities" />}
            />
            <Route path={ROUTE_PATHS.GALLERY} element={<Gallery />} />
            <Route
              path={ROUTE_PATHS.NEWS}
              element={<ComingSoon title="News" />}
            />
            <Route
              path={ROUTE_PATHS.VOLUNTEER}
              element={<ComingSoon title="Volunteer" />}
            />
            <Route path={ROUTE_PATHS.MEMBERSHIP_LOGIN} element={<Login />} />
            <Route
              path={ROUTE_PATHS.MEMBERSHIP_REGISTER}
              element={<Register />}
            />
            <Route
              path={ROUTE_PATHS.MEMBERSHIP_DASHBOARD}
              element={
                <ProtectedRoute>
                  <MembershipDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_PATHS.CONTACT}
              element={<ComingSoon title="Contact Us" />}
            />
            <Route path="*" element={<ComingSoon title="Page Not Found" />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
