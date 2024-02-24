import React, { useState } from "react";
import Select from 'react-select';
import './topbar.css'; // Assuming you have a separate CSS file for styling
import logo from '../assets/logo_big.png'; // Assuming you have a logo image

export default function Topbar(props) {
    const [region, setRegion] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const regionOptions = [
        // New England, Mid-Atlantic, Southeast, Midwest, Rocky Mountains, West Coast
        { value: 'All', label: 'All'},
        { value: 'New England', label: 'New England' },
        { value: 'Mid-Atlantic', label: 'Mid-Atlantic' },
        { value: 'Southeast', label: 'Southeast' },
        { value: 'Midwest', label: 'Midwest' },
        { value: 'Rocky Mountains', label: 'Rocky Mountains' },
        { value: 'West Coast', label: 'West Coast' }
    ];

    const handleRegionChange = (selectedOptions) => {
        setRegion(selectedOptions);
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // check all are filled
        if (!region || !startDate || !endDate) {
            return;
        }
        props.onSubmit({ region, startDate, endDate });
    }

    return (
        <div className="topbar">
            <div className="logo">
                <img src={logo} alt="Snowmap" />
            </div>
            <div className="search-container">
                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="region">Region</label>
                        <Select
                            id="region"
                            value={region}
                            onChange={handleRegionChange}
                            options={regionOptions}
                            placeholder="Select Region"
                            isMulti // Enable multi-select
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    width: '100%' // Adjust width as needed
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input 
                            type="date" 
                            id="startDate" 
                            value={startDate} 
                            onChange={handleStartDateChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End date</label>
                        <input 
                            type="date" 
                            id="endDate" 
                            value={endDate} 
                            onChange={handleEndDateChange} 
                        />
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}
