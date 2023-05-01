import { useEffect, useState } from 'react';
import './App.css';
import Job from './Components/Job';
import Nav from './Components/Nav';
import Sidebar from './Components/Sidebar';
import JobView from './Components/JobView';
import Pagination from './Pagination';
import Loading from './Loading';
import Footer from './Footer';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [tags, setTags] = useState([{name:'java', selected: false}, {name:'javascript', selected: false}, {name:'react', selected: false}, {name:'junior', selected: false},{name:'intern', selected: false},{name:'freelance', selected: false},{name:'remote', selected: false}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [selectedJob, setSelectedJob] = useState();
  const [currentPageJobs, setCurrentPageJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [pageReqNum, setPageReqNum] = useState(1);

  useEffect(() => {
    paginateJobs();
  }, [currentPage]);
  
  useEffect(() => {
    if(pageReqNum === 1){
      paginateJobs();
    }
  },[jobs])

  useEffect(() => {
    filterJobsByTags();
  }, [pageReqNum]);

  const addOrRemoveItemToFilter = (tag) => {
    setIsLoading(true);
    var index = filters.indexOf(tag.name);

    if(index < 0 ){
      updateTagsArray(tag);
      setFilters([...filters, tag.name]);
    }else{
      var newFilter = filters.filter(item => item !== tag.name)
      updateTagsArray(tag);
      setFilters(newFilter);
    }

    if(pageReqNum === 1|| currentPage === 1){
      filterJobsByTags();
    }

    setPageReqNum(1);
    setCurrentPage(1);
  }

  const updateTagsArray = (tag) => {
    var updatedTags = tags.map(tagItem => {
      if(tagItem.name === tag.name){
        return {...tag, selected: !tag.selected}
      }else{
        return tagItem;
      }
    });

    setTags(updatedTags);    
  }
  
  const filterJobsByTags = async () => {
    var string = "";

    filters.forEach(tag => {
      if(tag.includes(" ")){
        tag = tag.replace(" ", "+")
      }
      string += `%2C%22${tag}%22`;
    });

    var text = searchString.replaceAll(',', '%2C');    
    var updatedtext = text.replaceAll(' ', '+')
    
    const response = await fetch(`https://www.arbeitnow.com/api/job-board-api?page=${pageReqNum}&search=${updatedtext}&sort_by=relevance&category=developer&tags=%5B%22english+speaking%22${string}%5D&locale=en`);
    const result = await response.json();
    
    setJobs([...jobs, ...result.data]);
    setIsLoading(false);
  }

  const searchJobs = (e) => {
    setSearchString(e.target.value);    
    if(pageReqNum === 1|| currentPage === 1){
      filterJobsByTags();
    }
    setPageReqNum(1);
    setCurrentPage(1);    
  }

  const paginateJobs = () => {
    if(currentPage % 10 === 0){
      setPageReqNum(prev => prev + 1);
    }
    setCurrentPageJobs(jobs.slice((currentPage*jobsPerPage - 10), (currentPage*jobsPerPage)));    
  }

  const closeJobView = () => {
    setSelectedJob(null);
  }

  return (
    <div className="App">      
      <Nav/>
      {isLoading && <Loading/>}
      <div className='main-container'>
        <Sidebar tags={tags} searchJobs={searchJobs} searchString={searchString} addOrRemoveItemToFilter={addOrRemoveItemToFilter}/>

        <div className='joblist'>
          {currentPageJobs?.map(job => {
            return <Job selectJob={() => setSelectedJob(job)} key={job.slug} types={job.job_types} tags={job.tags} location={job.location} company={job.company_name} title={job.title} remote={job.remote} description={job.description} url={job.url} posted={job.created_at}/>            
          })}

          <Pagination setCurrentPageNum={setCurrentPage}/>
        </div>

        {selectedJob && <JobView close={closeJobView} job={selectedJob ? selectedJob : jobs[0]}/>}
      </div>
      <Footer/>
    </div>
  );
}

export default App;