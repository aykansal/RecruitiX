import React, { useEffect, useState } from "react";
import { getJobs } from "@/api/getJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/job-card";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { company_id, location, searchQuery });

  useEffect(() => {
    isLoaded && fnJobs();
  }, [isLoaded, location, searchQuery, company_id]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7d7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      {/* filters here */}
      {loadingJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7d7" />
      )}
      {loadingJobs === false && (
        <div>
          {dataJobs?.length > 0 ? (
            dataJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center text-2xl">No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
