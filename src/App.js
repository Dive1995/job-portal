import { useEffect, useState } from 'react';
import './App.css';
import Job from './Components/Job';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {    
    const response = await fetch('https://www.arbeitnow.com/api/job-board-api?page=1&search=&sort_by=relevance&category=&tags=%5B%22visa+sponsorship%22%5D&locale=en');
    const jobList = await response.json();
    console.log(jobList);    
    setJobs(jobList.data);
  }

  return (
    <div className="App">      
      <nav>
        <h1>Job Portal</h1>
      </nav>
      <div className='main-container'>
        <div className='sidebar'>
          <label>Language</label>
          <ul>
            <li>JS</li>
            <li>Python</li>
            <li>Java</li>
          </ul>
          <label>Sponsorship</label>
          <ul>
            <li>Yes</li>
          </ul>
          <label>Tags</label>
          <ul>
            <li>Developer</li>
            <li>English</li>
            <li>Remote</li>
          </ul>
        </div>
        <div className='joblist'>
          {jobs?.map(job => {
            return <Job key={job.slug} types={job.job_types} tags={job.tags} location={job.location} company={job.company_name} title={job.title} remote={job.remote} description={job.description} url={job.url} posted={job.created_at}/>            
          })}
        </div>
        <div className='jobview'>
          <h3>Software Engineer</h3>
          <p>Berlin</p>
          <p dangerouslySetInnerHTML={{__html : jobs[0]?.description}}></p>
        </div>
      </div>
    </div>
  );
}

export default App;



//TODO:
//https://www.arbeitnow.com/api/jobs?page=1&search=&sort_by=relevance&category=&tags=%5B%22javascript%22%5D&locale=en  
    //https://www.arbeitnow.com/api/jobs?page=1&search=&sort_by=relevance&category=developer&tags=%5B%22visa+sponsorship%22%5D&locale=en
    // tags - &tags=%5B%22javascript%22%2C%22css%22%5D
    // search - &search=software+engineer
    // sort - &sort_by=relevance / &sort_by=newest
    // category - &category=english+speaking / &category=developer
    // https://www.arbeitnow.com/api/jobs?page=1&search=&sort_by=relevance&category=visa+sponsorship&tags=%5B%22developer%22%2C%22english+speaking%22%5D&locale=en