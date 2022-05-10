import axios from "axios";
import { Job } from "../store/jobs/jobs.slice";

const createJob = async (jobData: Job): Promise<Job> => {
  const createResponse = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/jobs/new`,
    jobData
  );

  const job = createResponse.data.job;

  return job;
};

const getJobs = async (): Promise<Job[]> => {
  const getResponse = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/jobs`
  );

  const jobs = getResponse.data;

  return jobs;
};

const jobsAdapter = { createJob, getJobs };

export default jobsAdapter;
