import React, { useEffect } from 'react';
import './App.css';


const App = () => {
  const getTFLServices = useEffect(()=>{
    return fetch('https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true').then(response => response.json()).then((data) => console.log(data))
    },[]);
  return (
    <div className="App">
     <h1>Existing TFL services:</h1>
     
    </div>
  );
}

export default App;
