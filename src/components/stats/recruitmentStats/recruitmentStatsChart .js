import React, { useEffect, useRef, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';
import { Box } from "@mui/material";
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ButtonPDFExport from './buttonPDFExport';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ChartDataLabels);

export default function RecruitmentStatsChart({ year }) {
    const pdfRef = useRef(null); 
    const [trainingCharts, setTrainingCharts] = useState(new Array(12).fill({
        totalCV: 0,
        totalInterviewCV: 0,
        candidatesInterview: 0,
        candidatesDoNotInterview: 0,
        candidatesPass: 0,
        candidatesFail: 0,
        candidatesAcceptJob: 0,
    }));
    const [hiddenDatasets, setHiddenDatasets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            if (user != null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                try {
                    const response = await axios.get(`http://localhost:8080/api/recruitmentStats/recruitmentChart/year?year=${year}`);
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
                label: 'Số CV mới',
                data: trainingCharts.map(item => item.totalCV),
                borderColor: 'blue',
                backgroundColor: 'blue',
                fill: false,
                tension: 0,
            },
            {
                label: 'Số CV phỏng vấn',
                data: trainingCharts.map(item => item.totalInterviewCV),
                borderColor: 'green',
                backgroundColor: 'green',
                fill: false,
                tension: 0,
            },
            {
                label: 'Ứng viên không đến phỏng vấn',
                data: trainingCharts.map(item => item.candidatesDoNotInterview),
                borderColor: 'black',
                backgroundColor: 'black',
                fill: false,
                tension: 0,
            },
            {
                label: 'Ứng viên pass',
                data: trainingCharts.map(item => item.candidatesPass),
                borderColor: 'orange',
                backgroundColor: 'orange',
                fill: false,
                tension: 0,
            },
            {
                label: 'Ứng viên fail',
                data: trainingCharts.map(item => item.candidatesFail),
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                tension: 0,
            },
            {
                label: 'Ứng viên nhận việc',
                data: trainingCharts.map(item => item.candidatesAcceptJob),
                borderColor: 'purple',
                backgroundColor: 'purple',
                fill: false,
                tension: 0,
            },
            {
                label: 'Ứng viên đã phỏng vấn',
                data: trainingCharts.map(item => item.candidatesInterview),
                borderColor: 'brown',
                backgroundColor: 'brown',
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
                        size: 18,
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
                    },
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
        <Box sx={{ width: '80%', height: '585px', padding: 2 }}  ref={pdfRef}>
            {/* <button style={{marginTop: '-75px', float: 'right'}} className='btn btn-success' onClick={downloadPDF}>Download PDF</button> */}
            {/* <button style={{marginTop: '-75px', float: 'right'}} className='btn btn-success'>Download PDF</button> */}
            {/* <ButtonPDFExport/> */}
            <div style={{ width: '100%', height: '100%' }}>
                <Line data={data} options={options} />
            </div>
            <div id="legendContainer">
                {hiddenDatasets.join(', ')}
            </div>
            <p style={{ 
                textAlign: 'center', 
                fontFamily: 'sans-serif', 
                fontStyle: 'italic', 
                paddingTop: '10px',
                color: 'red' 
            }}>
                ( *Vui lòng click vào các chú thích trên khi bạn muốn ẩn/ hiện dữ liệu )
            </p>
        </Box>
    );
}