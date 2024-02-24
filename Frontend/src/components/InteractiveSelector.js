import { useState, useEffect } from "react";
import API from "../apilist.json";
import SnowMap from './map.js';

export default function InteractiveSelector(props) {
    const { region, startdate, enddate } = props;
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
        fetch(API.GET_DESTINATIONS + `?region=${region || ''}&startdate=${startdate || ''}&enddate=${enddate || ''}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDest(data?.data || []);
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
            width: '200px',
            height: '180px',
            backgroundColor: 'white',
            margin: '10px',
            cursor: 'pointer',
            border: '1px solid',
            borderColor: selectedDest === dest ? 'blue' : 'gainsboro',
            borderRadius: '10px'
        };
        return (
            <div 
            key={dest.id} 
            style={cardStyle} 
            onClick={() => { setSelectedDest((val) => val? null: dest); }}
            onMouseOver={() => {setHoverCard(dest); }}
            onMouseOut={() => { setHoverCard(null); }}
            >
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
                <p>Latitude: {dest.lat}</p>
                <p>Longitude: {dest.lon}</p>
                <p>Snowfall: {dest.snowfall}</p>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', width: '100%', height: '85vh'}}>
            <div style={{ width: '30%', height: '100%', overflowY: 'scroll'}}>
                {destData.map((dest) => genCard(dest))}
            </div>
            <div style={{ flex: 1, width: '70%', height: '100%', overflow: 'hidden' }}>
                <SnowMap markers={destData} width={screenWidth * 0.7} height={screenHeight * 0.85} hoveredCard={hoverCard}/>
            </div>
            
        </div>
    );
}
