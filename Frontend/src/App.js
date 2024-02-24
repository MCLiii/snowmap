import './App.css';
import SnowMap from './components/map.js';
import InteractiveSelector from './components/InteractiveSelector.js';

function App() {
  return (
    <div className="App" align="center">
      <header className="App-header">
          <h1 align="center">Snow Map</h1>
      </header>
      <p>Plan Your Perfect Ski Vacation</p>
      <div align="center">
        <InteractiveSelector width="100%" height="100%"/>
      </div>
    </div>
  );
}

export default App;
