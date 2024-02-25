import React, { useState } from "react";
import Select from 'react-select';
import './topbar.css'; // Assuming you have a separate CSS file for styling
import logo from '../assets/logo_big.png'; // Assuming you have a logo image
import { FiSettings } from 'react-icons/fi'; // Assuming you have imported the setting icon
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css';
import 'bootstrap-switch';

export default function Topbar(props) {
    const { unit, setUnit } = props;
    const [region, setRegion] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);

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
        const selectedEndDate = e.target.value;
        // Ensure endDate is not earlier than startDate
        if (selectedEndDate < startDate) {
            // If endDate is earlier than startDate, set it to startDate
            setEndDate(startDate);
        } else {
            setEndDate(selectedEndDate);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // check all are filled
        if (!region || !startDate || !endDate) {
            return;
        }
        props.onSubmit({ region, startDate, endDate });
    }

    const handleToggleUnit = () => {
        setUnit(unit === 'Metric' ? 'Imperial' : 'Metric');
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
                    
                    <div className="form-group">
                    <h5 style={{paddingLeft: '10px', marginBottom: '0px', marginTop: '10px'}}>Metric</h5>
                        <div className="unit-toggle">
                            <input
                                type="checkbox"
                                id="unitToggle"
                                className="unit-toggle-checkbox"
                                checked={unit === 'Metric'}
                                onChange={handleToggleUnit}
                            />
                            <label htmlFor="unitToggle" className="unit-toggle-label">
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
