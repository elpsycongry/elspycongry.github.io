import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TrainingStatsChart = () => {

    const [hiddenDatasets, setHiddenDatasets] = useState([]);

    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
            {
                label: 'Thực tập sinh nhập học',
                data: [10, 3, 0, 2, 3, 4, 0, 4, 3, 2, 0, 2],
                borderColor: 'blue',
                backgroundColor: 'blue',
                fill: false,
                tension: 0,
            },
            {
                label: 'Thực tập sinh nghỉ',
                data: [0, 2, 3, 0, 2, 3, 2, 0, 1, 3, 2, 0],
                borderColor: 'green',
                backgroundColor: 'green',
                fill: false,
                tension: 0,
            },
            {
                label: 'Thực tập sinh tốt nghiệp',
                data: [3, 0, 2, 3, 0, 2, 3, 4, 0, 2, 3, 0],
                borderColor: 'black',
                backgroundColor: 'black',
                fill: false,
                tension: 0,
            },
            {
                label: 'Thực tập sinh Fail',
                data: [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                borderColor: 'orange',
                backgroundColor: 'orange',
                fill: false,
                tension: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'line',
                    font: {
                        size: 20,
                        weight: 700
                    },
                    onClick: (e, legendItem, legend) => {
                        const index = legendItem.datasetIndex;
                        const chart = legend.chart;
                        const meta = chart.getDatasetMeta(index);
                        meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
                        setHiddenDatasets(chart.data.datasets.filter(dataset => meta.hidden === true).map(dataset => dataset.label));
                        chart.update();
                    }
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                bodyFont: {
                    size: 20,
                },
                titleFont: {
                    size: 20,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Số lượng',
                    font: {
                        size: 20,
                    },
                },
                ticks: {
                    font: {
                        size: 20,
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                    font: {
                        size: 20,
                    },
                },
                ticks: {
                    font: {
                        size: 20,
                    },
                },
            },
        },
    };

    return (
        <Box sx={{ width: '100%', height: '600px', padding: 2 }}>
            <div style={{ width: '100%', height: '100%' }}>
                <Line data={data} options={options} />
            </div>
            <div>
                {hiddenDatasets.join(', ')}
            </div>
        </Box>
    );
};

export default TrainingStatsChart;
