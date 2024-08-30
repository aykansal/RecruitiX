import React, { useEffect } from "react";
import { getJobs } from "@/api/getJobs";
import useFetch from "@/hooks/use-fetch";

const JobListing = () => {
  const { fn: fnJobs, data: dataJobs, loading, error } = useFetch(getJobs, {});
  useEffect(() => {
    fnJobs();
    console.log(dataJobs);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.log(error);
    return <div>Error: </div>;
  }
  return (
    <div>
      <h1>Job Listings</h1>
    </div>
  );
};

export default JobListing;
