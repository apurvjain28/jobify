import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const {
    jobs,
    totalJobs,
    numOfPages,
    page,
    getJobs,
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job}></Job>;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
      {/* pagination */}
    </Wrapper>
  );
};

export default JobsContainer;
