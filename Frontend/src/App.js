import './App.css';
import Topbar from './components/topbar.js';
import InteractiveSelector from './components/InteractiveSelector.js';
import { useState } from 'react';

function App() {
  const [Region, setRegion] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  console.log(Region, StartDate, EndDate);
  return (
    <div className="App" align="center">
      <Topbar onSubmit={({region, startDate, endDate}) => {
        setRegion(region);
        setStartDate(startDate);
        setEndDate(endDate);
      }}/>
      <div align="center">
        <InteractiveSelector width="100%" height="100%"/>
      </div>
    </div>
  );
}

export default App;
