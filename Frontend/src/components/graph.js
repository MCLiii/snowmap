import React, { useState, useEffect, useMemo } from 'react';
import {Chart as ChartJS} from 'chart.js/auto'
import { Line } from 'react-chartjs-2';
import API from '../apilist.json';

const Graph = (props) => {
    const { selectedResort, startdate, enddate, width, height, unit } = props;
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        //fetch data
        fetch(API.GET_GRAPH + `?resort=${selectedResort || ''}&start_date=${startdate || ''}&end_date=${enddate || ''}&data_type=snowfall`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setJsonData(data?.data || {});
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedResort, startdate, enddate]);

    const generateColors = (data) => {
        const colors = {};
        for (let key in data) {
            colors[key] = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
        }
        return colors;
    };

    const lineColors = useMemo(() => {
        if (jsonData) {
            return generateColors(jsonData);
        }
    }, [jsonData]);

    const chartData = {
        labels: [],
        datasets: [],
    };

    if (jsonData) {
        for (let key in jsonData) {
            let d = [];
            if(unit === "Imperial") {
                d = Object.values(jsonData[key]).map(val => val * 0.0393701);
            } else {
                d = Object.values(jsonData[key]);
            }
            chartData.datasets.push({
                label: key,
                data: d, 
                borderColor: lineColors[key],
                borderWidth: 2,
                fill: false,
            });
        }
        chartData.labels = Object.keys(jsonData[Object.keys(jsonData)[0]]);
    }

    console.log(chartData);
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return (
        <div>
            <h4>{selectedResort}</h4>
            <Line data={chartData} options={options} height={height} width={width} />
        </div>
    );
};

export default React.memo(Graph);
