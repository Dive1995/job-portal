import React from 'react'
import './JobView.css'

function JobView({job}) {

  const translate = async () => {
    console.log("translating...");
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: "Mit dem OMR Festival veranstalten wir eines der weltweit größten Präsenz-Events für die Digital-Branche mit zuletzt über 70.000 Besucher*innen in 2022. Schau dir jetzt das Recap unseres letzten OMR Festivals an! Wie du dir vorstellen kannst, braucht es Know-how, Power und auch mal starke Nerven, um ein Event in der Größenordnung auf die Beine zu stellen. All das hat unser Festival & Events Team! Das Festival & Events Team besteht aktuell aus rund 25 Mitarbeiter*innen und ist für die operative Durchführung des OMR Festivals zuständig.",
        source: "auto",
        target: "en",
        format: "text",
        api_key: ""
      }),
      headers: { "Content-Type": "application/json" }
    });

    console.log(await res.json());
  }

  return (
    <div className='jobview'>
      {/* <button onClick={translate}>English</button> */}
      <div className='jobview-header'>
        <h3>{job?.title}</h3>
        <p>{job?.location}</p>
        <a className='btn' href={job?.url}>Apply</a>
      </div>
      <p className='jobview-content' dangerouslySetInnerHTML={{__html : job?.description}}></p>
    </div>
  )
}

export default JobView