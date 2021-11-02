import React, { useEffect, useState } from 'react';
import './App.scss';

const App = () => {
  const [tflServices, setTflServices] = useState([]);
  const [statusSeverity, setStatusSeverity] = useState(false);

  const getServiceDisruption = () => {
    return fetch(
      'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true'
    )
      .then((response) => response.json())
      .then((data)=>{
        const statusSeverity = data.map((d)=>{
          return d.lineStatuses.statusSeverity !== 10
          //if there is a false in the array then there is an issue 
        });
        statusSeverity.includes(false) ? setStatusSeverity(false) :  setStatusSeverity(true)
        console.log(statusSeverity, 'statusSeverity')
        })
  }

  useEffect(()=>{
    getServiceDisruption();
  })

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


  }, [tflServices]);

  return (
    <div className='App'>
      <h1 className='title'>TFL</h1>
      {statusSeverity && (
        <section className='mainSection'>
          <header>“No Service Disruptions”</header>
        </section>
      )}

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
    </div>
  );
};

export default App;
