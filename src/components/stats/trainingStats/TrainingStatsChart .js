import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function TrainingStatsChart({ year }) {
    const [trainingCharts, setTrainingCharts] = useState([
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        },
        {
            "averageGraduationScore": 0,
            "graduatingInterns": 0,
            "internsCurrentlyPracticing": 0,
            "internsEnrolled": 0,
            "internsFailed": 0,
            "internsQuitInternship": 0,
            "rate": 0
        }
    ]);
    const [hiddenDatasets, setHiddenDatasets] = useState([]);
    console.log(year);
    console.log(trainingCharts);
    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            if (user != null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                try {
                    const response = await axios.get("http://localhost:8080/api/stats/trainingCharts/year?year=" + year);
                    setTrainingCharts(response.data);
                    console.log(response.data);
                    console.log(trainingCharts);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [year]);


    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
            {
                label: 'Thực tập sinh nhập học',
                data: [trainingCharts.at(0).internsEnrolled,
                trainingCharts.at(1).internsEnrolled,
                trainingCharts.at(2).internsEnrolled,
                trainingCharts.at(3).internsEnrolled,
                trainingCharts.at(4).internsEnrolled,
                trainingCharts.at(5).internsEnrolled,
                trainingCharts.at(6).internsEnrolled,
                trainingCharts.at(7).internsEnrolled,
                trainingCharts.at(8).internsEnrolled,
                trainingCharts.at(9).internsEnrolled,
                trainingCharts.at(10).internsEnrolled,
                trainingCharts.at(11).internsEnrolled
                ],
                borderColor: 'blue',
                backgroundColor: 'blue',
                fill: false,
                tension: 0,
            },
            {
                label: 'Thực tập sinh nghỉ',
                data: [trainingCharts.at(0).internsQuitInternship,
                trainingCharts.at(1).internsQuitInternship,
                trainingCharts.at(2).internsQuitInternship,
                trainingCharts.at(3).internsQuitInternship,
                trainingCharts.at(4).internsQuitInternship,
                trainingCharts.at(5).internsQuitInternship,
                trainingCharts.at(6).internsQuitInternship,
                trainingCharts.at(7).internsQuitInternship,
                trainingCharts.at(8).internsQuitInternship,
                trainingCharts.at(9).internsQuitInternship,
                trainingCharts.at(10).internsQuitInternship,
                trainingCharts.at(11).internsQuitInternship],
                borderColor: 'green',
                backgroundColor: 'green',
                fill: false,
                tension: 0,
            },
            {
                label: 'Thực tập sinh tốt nghiệp',
                data: [trainingCharts.at(0).graduatingInterns,
                trainingCharts.at(1).graduatingInterns,
                trainingCharts.at(2).graduatingInterns,
                trainingCharts.at(3).graduatingInterns,
                trainingCharts.at(4).graduatingInterns,
                trainingCharts.at(5).graduatingInterns,
                trainingCharts.at(6).graduatingInterns,
                trainingCharts.at(7).graduatingInterns,
                trainingCharts.at(8).graduatingInterns,
                trainingCharts.at(9).graduatingInterns,
                trainingCharts.at(10).graduatingInterns,
                trainingCharts.at(11).graduatingInterns],
                borderColor: 'black',
                backgroundColor: 'black',
                fill: false,
                tension: 0,
            },
            {
                label: 'Thực tập sinh Fail',
                data: [trainingCharts.at(0).internsFailed,
                trainingCharts.at(1).internsFailed,
                trainingCharts.at(2).internsFailed,
                trainingCharts.at(3).internsFailed,
                trainingCharts.at(4).internsFailed,
                trainingCharts.at(5).internsFailed,
                trainingCharts.at(6).internsFailed,
                trainingCharts.at(7).internsFailed,
                trainingCharts.at(8).internsFailed,
                trainingCharts.at(9).internsFailed,
                trainingCharts.at(10).internsFailed,
                trainingCharts.at(11).internsFailed],
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
                    pointStyle: 'shape',
                    font: {
                        size: 20,
                        weight: 700
                    },
                    padding: 30,
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
                callbacks: {
                    title: function (tooltipItems) {
                        return 'Tháng ' + tooltipItems[0].label;
                    }
                },
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
        <Box sx={{ width: '80%', height: '490px', padding: 2 }}>
            <div style={{ width: '100%', height: '100%' }}>
                <Line data={data} options={options} />
            </div>
            <div>
                {hiddenDatasets.join(', ')}
            </div>
        </Box>
    );
}