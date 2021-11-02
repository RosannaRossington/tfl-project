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
      <table className='menu'>
        <tr>
          <th>Line</th>
          <th>Transport Mode</th>
        </tr>
        {tflServices &&
          tflServices.map((s) => {
            return (
              <tr>
                <td className='name'>{s.name}</td>
                <span className={s.night}></span>
                <td className={s.delays === 'false' ? 'noDelays' : 'delays'}>
                  {s.mode}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default App;
