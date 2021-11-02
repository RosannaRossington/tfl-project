import React, { useEffect, useState } from 'react';
import './App.scss';

const App = () => {
  const [tflServices, setTflServices] = useState([]);

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
        console.log(tflServices);
      });
  }, [tflServices]);

  return (
    <div className='App'>
      <h1 className='title'>TFL</h1>
      <p className='subTitle'>Existing Services</p>
      <section className='menu'>
        <header className='row'>
          <div className='col headerTitle'>Line</div >
          <div className='col headerTitle'>Transport Mode</div >
        </header>
        {tflServices &&
          tflServices.map((s) => {
            return (
              <div className='row'>
                <div className='name' id={s.night}>
                  <p className={s.delays === 'false' ? 'noDelays' : 'delays'}>{s.name}</p>
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
