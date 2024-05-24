import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { deleteJob, getJobById } from "../lib/graphql/queries";
import { useEffect, useState } from "react";

function JobPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate() 
  // const job = jobs.find((job) => job.id === jobId);
  const getJobData = async () => {
    const response = await getJobById(jobId);
    setJob(response);
  };

  const handleDelete = async()=>{
    const job = await deleteJob(jobId)
    debugger
    if(job.deleteJob.id){
      navigate('/')
    }
  }

  useEffect(() => {
    getJobData();
  }, [jobId]);

  return (
    <div>
      <h1 className="title is-2">{job?.title}</h1>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>
      </h2>
      <div className="box">
        {/* <div className="block has-text-grey">
          Posted: {formatDate(job?.date, "long")}
        </div> */}
        <p className="block">{job?.description}</p>
        <button onClick={handleDelete}>delete job</button>
      </div>
    </div>
  );
}

export default JobPage;
