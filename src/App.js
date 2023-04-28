import { useEffect, useState } from 'react';
import './App.css';
import Job from './Components/Job';
import Nav from './Components/Nav';
import Sidebar from './Components/Sidebar';
import JobView from './Components/JobView';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState(['english speaking']);
  const [tags, setTags] = useState([{name:'java', selected: false}, {name:'javascript', selected: false}, {name:'react', selected: false}, {name:'junior', selected: false},{name:'intern', selected: false},{name:'freelance', selected: false},{name:'remote', selected: false}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [selectedJob, setSelectedJob] = useState();

  useEffect(() => {
    filterJobsByTags();
  }, [filters]);

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
    // console.log(searchString)
    // console.log(updatedtext)
    
    const response = await fetch(`https://www.arbeitnow.com/api/job-board-api?page=1&search=${updatedtext}&sort_by=relevance&category=&tags=%5B%22developer%22${string}%5D&locale=en`);
    const result = await response.json();
    
    setJobs(result.data);
    setIsLoading(false);
  }

  const searchJobs = (e) => {
    setSearchString(e.target.value);
    filterJobsByTags();
  }

  return (
    <div className="App">      
      <Nav isLoading={isLoading}/>
      <div className='main-container'>
        <Sidebar tags={tags} searchJobs={searchJobs} searchString={searchString} addOrRemoveItemToFilter={addOrRemoveItemToFilter}/>
        <div className='joblist'>
          {jobs?.map(job => {
            return <Job selectJob={() => setSelectedJob(job)} key={job.slug} types={job.job_types} tags={job.tags} location={job.location} company={job.company_name} title={job.title} remote={job.remote} description={job.description} url={job.url} posted={job.created_at}/>            
          })}
        </div>
        <JobView job={selectedJob ? selectedJob : jobs[0]}/>
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