import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isSignedIn, user, isLoaded } = useUser();

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (isLoaded && isSignedIn) {
    const userRole = user?.unsafeMetadata?.role;
    if (pathname === "/post-job" && userRole !== "recruiter") {
      return <Navigate to="/onboarding" />;
    }
    if (
      pathname === "/jobs" &&
      userRole !== "candidate" &&
      userRole !== "recruiter"
    ) {
      return <Navigate to="/onboarding" />;
    }
  }
  return children;
};

export default ProtectedRoute;
