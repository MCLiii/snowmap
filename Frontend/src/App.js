import './App.css';
import Topbar from './components/topbar.js';
import InteractiveSelector from './components/InteractiveSelector.js';
import { useState } from 'react';

function App() {
  const [Region, setRegion] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [unit, setUnit] = useState("Imperial");
  console.log(Region, StartDate, EndDate);
  return (
    <div className="App" align="center">
      <Topbar 
      onSubmit={({region, startDate, endDate}) => {
        setRegion(region);
        setStartDate(startDate);
        setEndDate(endDate);
      }}
      unit={unit}
      setUnit={setUnit}
      />
      <div align="center">
        <InteractiveSelector unit = {unit} width="100%" height="100%" region={Region.map(value=>value.value)} startdate={StartDate} enddate={EndDate}/>
      </div>
    </div>
  );
}

export default App;
