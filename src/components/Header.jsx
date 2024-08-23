import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BriefcaseBusiness, Heart, PenBox, ScanSearch, Search } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Header = () => {
  const [search, setSearch] = useSearchParams();
  const [showSignIn, setShowSignIn] = useState(false);

  const { user } = useUser();
  const userRole = user?.unsafeMetadata?.role;

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="logo" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              className="border border-gray-500/70"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {userRole && (
              <Link to={userRole === "candidate" ? "/jobs" : "/post-job"}>
                <Button variant="destructive" className="rounded-xl">
                  {userRole === "candidate" ? (
                    <ScanSearch size={20} className="mr-2" />
                  ) : (
                    <PenBox size={20} className="mr-2" />
                  )}
                  {userRole === "candidate" ? "View all Jobs" : "Post a Job"}
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            afterSignOutUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
