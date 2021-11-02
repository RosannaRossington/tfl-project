import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';

const App = () => {
  const [tflServices, setTflServices] = useState([]);
  const [statusSeverity, setStatusSeverity] = useState(false);
  const [linesDisrupted, setLinesDisrupted] = useState(false);

  useEffect(() => {
    return fetch(
      'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true'
    )
      .then((response) => response.json())
      .then((data) => {
        const statusSeverity = data.map((d) => {
          return d.lineStatuses[0].statusSeverity !== 10;
          //if there is a false in the array then there is an issue
        });
        if (statusSeverity.includes(false)) {
          setStatusSeverity(false);
          const linesDisrupted = data.map((d) => {
            if (d.lineStatuses[0].statusSeverity !== 10) {
              let disruptions = {
                line: d.name,
                status: d.lineStatuses[0].statusSeverity !== 10 ? d.lineStatuses[0].statusSeverityDescription : null
              } 
              return disruptions;
            }
            return []
          });
          setLinesDisrupted(linesDisrupted);
          console.log(linesDisrupted)
        } else {
          setStatusSeverity(true);
        }
      });
    }, []);


  useEffect(() => {
    return fetch(
      'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true'
    )
      .then((response) => response.json())
      .then((data) => {
        const tflServiceDisplay = data.map((d) => {
          let tflServices = {
            id: d.id,
            name: d.name,
            mode: d.modeName,
            night: d.serviceTypes.map((st) =>
              st.name === 'night' ? 'night' : 'day'
            ),
            delays: d.lineStatuses[0].statusSeverity !== 10,
          };
          return tflServices;
        });
        setTflServices(tflServiceDisplay);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [ tflServices]);

const handleCycleHire = async () => {
  try {
    let response = await fetch(
      'https://api.tfl.gov.uk/BikePoint/Search?query=regent'
    )
    console.log(response.json(response), 'res')
  }catch(e){
      return e
    }
}
  return (
    <div className='App'>
      <h1 className='title'>TFL</h1>
      <section className='mainSection'>
        {statusSeverity ? (
          <header>“No Service Disruptions”</header>
        ) : (
          <header>“Service currently suffering disruptions:”</header>
        )}
        {linesDisrupted.length > 0 &&
          linesDisrupted.map((l) => {  
            return (
            <>
            {l.status && l.line && <div>{l.status} {l.line}</div>}
            </> 
          )
        })}

      </section>

      <p className='subTitle'>Existing Services</p>
      <section className='menu'>
        <header className='row'>
          <div className='col headerTitle'>Line</div>
          <div className='col headerTitle'>Transport Mode</div>
        </header>
        {tflServices &&
          tflServices.map((s) => {
            return (
              <div className='row'>
                <div className='name' id={s.night}>
                  <p className={s.delays === false ? 'noDelays' : 'delays'}>
                    {s.name}
                  </p>
                </div>

                <div>
                  <p>{s.mode}</p>
                </div>
              </div>
            );
          })}
      </section>

      {<section className='cycleHire'>
      <form onSubmit={(e) => {
                  e.preventDefault();
                  handleCycleHire();
                }}>
                   <input
                  type='text'
                  placeholder='Search Bicycle'
                  id='bike'
                  // onChange={}
                />
                <button className={`button discoverButton`} type='submit'>
                Discover Cycle Hire 
                </button>
                </form>
      </section> }
    </div>
  );
};

export default App;
