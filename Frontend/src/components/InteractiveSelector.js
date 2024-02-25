import { useState, useEffect } from "react";
import API from "../apilist.json";
import SnowMap from './map.js';
import Graph from "./graph.js";

export default function InteractiveSelector(props) {
    const { region, startdate, enddate, unit } = props;
    const [selectedDest, setSelectedDest] = useState(null);
    const [destData, setDest] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [hoverCard, setHoverCard] = useState(null);

    useEffect(() => {
        // Function to handle resize event
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        // Attach resize event listener
        window.addEventListener('resize', handleResize);

        // Fetch data from backend
        fetch(API.GET_DESTINATIONS + `?region=${region || ''}&start_date=${startdate || ''}&end_date=${enddate || ''}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (unit === "Imperial" && data?.data && data.data.length > 0) {
                    const newData = data.data.map(dest => ({
                        ...dest,
                        snowfall: dest.snowfall * 0.0393701
                    }));
                    setDest(newData);
                } else {
                    setDest(data?.data || []);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Cleanup function to remove resize event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [region, startdate, enddate]); // Add dependencies

    const genCard = (dest) => {
        const cardStyle = {
            width: '80%',
            height: '130px',
            backgroundColor: 'white',
            margin: '10px',
            cursor: 'pointer',
            border: '1px solid',
            borderColor: selectedDest === dest ? 'blue' : 'gainsboro',
            borderRadius: '10px'
        };
    
        return (
            <div 
                key={dest.name} 
                style={cardStyle} 
                onClick={() => { setSelectedDest((val) => val === dest ? null : dest); }}
                onMouseOver={() => { setHoverCard(dest); }}
                onMouseOut={() => { setHoverCard(null); }}
            >
                <img 
                src={`/resort-images/${dest.name}.jpg`} 
                alt={dest.name} 
                style={{ width: '40%', height: '100%', float: 'left', borderRadius: '10px 0px 0px 10px', objectFit: 'cover' }} 
                onError={(e) => { e.target.src = '/resort-images/default.jpg'; }}
                />
                <div style={{ marginLeft: '10%', paddingLeft: '10px' }}>
                    <h4>{dest.name.split(" — ")[0]}, {dest.state}</h4>
                    <p>Expected Snowfall: {Math.round(dest.snowfall * 10) / 10}{unit === "Imperial" ? '"' : 'mm'}</p>
                </div>
            </div>
        );
    };
    
    

    return (
        <div style={{ display: 'flex', width: '100%', height: '91vh'}}>
            <div style={{ width: '30%', height: '100%', overflowY: 'scroll'}}>
                {destData.map((dest) => genCard(dest))}
            </div>
            <div style={{ flex: 1, width: '70%', height: '100%', overflow: 'hidden' }} key={"mapngraph"}>
                <SnowMap markers={destData} width={screenWidth * 0.7} height={selectedDest ? (screenHeight * 0.55) : (screenHeight * 0.91)} hoveredCard={hoverCard} setSelected={setSelectedDest} selected={selectedDest}/>
                {selectedDest && startdate && enddate && 
                    <Graph selectedResort={selectedDest.name} startdate={startdate} enddate={enddate} width={screenWidth * 0.7} height={screenHeight * 0.25} unit={unit} />
                }
            </div>
        </div>
    );
}
