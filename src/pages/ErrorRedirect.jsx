import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const ErrorRedirect = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    toast({
      title: "Uh oh! Invalid URL",
      description: "Redirecting to Home Page",
      duration: 3500,
    });
    navigate("/", { replace: true });
  }, [navigate, toast]);

  return;
};

export default ErrorRedirect;
