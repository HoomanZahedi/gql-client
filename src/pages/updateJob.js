import { useEffect, useState } from 'react';
import { createJob, getJobById, updateJob } from '../lib/graphql/queries';
import { useNavigate, useParams } from 'react-router';

function UpdateJobPage() {
  const { jobId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    getJob()
  }, [])

  const getJob = async()=>{
    const job = await getJobById(jobId);
    setTitle(job.title)
    setDescription(job.description)
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const job = await updateJob({id:jobId,title,description})
    console.log(job)
    navigate(`/`)
  };

  return (
    <div>
      <h1 className="title">
        update Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit}>
                update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateJobPage;
