// import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';

// const JobDetails = () => {
//     const { jobId } = useParams();
//     const { jobs } = useContext(JobContext);
//     const job = jobs[jobId];

//     if (!job) {
//         return <div>Job not found</div>;
//     }

//     return (
//         <div>
//             <h1>Job Details</h1>
//             <h2>{job.companyName}</h2>
//             <p>Job Title: {job.title}</p>
//             <p>Status: {job.status}</p>
//             {/* Display other job details here */}
//         </div>
//     );
// };

// export default JobDetails;