import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleUserRole = async (role) => {
    if (!user) return;

    try {
      await user.update({
        unsafeMetadata: { role },
      });
      const redirectPath = role === "candidate" ? "/jobs" : "/post-job";
      navigate(redirectPath);
    } catch (error) {
      console.error("Failed to update user role:", error.message);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      const redirectPath =
        user.unsafeMetadata.role === "candidate" ? "/jobs" : "/post-job";
      navigate(redirectPath);
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded) {
    return <BarLoader />;
  }

  const roles = [
    { label: "Candidate", role: "candidate", variant: "blue" },
    { label: "Recruiter", role: "recruiter", variant: "destructive" },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        {roles.map(({ label, role, variant }) => (
          <Button
            key={role}
            className="h-36 text-2xl"
            variant={variant}
            onClick={() => handleUserRole(role)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OnBoarding;
