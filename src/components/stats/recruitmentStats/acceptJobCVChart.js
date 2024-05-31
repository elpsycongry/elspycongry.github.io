import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box } from '@mui/material';
import { size } from 'lodash';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function AcceptJobCVChart() {
    const [recruitmentChart, setRecuitmentChart] = useState(new Array(12).fill({
        candidatesAcceptJob: 0,
        candidatesRejectJob: 0,
    }));
    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            if (user != null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                try {
                    const response = await axios.get(`http://localhost:8080/api/recruitmentStats/recruitmentChart/year?year=2024`);
                    setRecuitmentChart(response.data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, []);
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
            {
                label: 'Ứng viên nhận việc',
                data: recruitmentChart.map(item => item.candidatesAcceptJob),
                backgroundColor: 'rgba(75, 75, 75, 0.6)',
                borderColor: 'rgba(75, 75, 75, 1)',
                borderWidth: 1
            },
            {
                label: 'Ứng viên không nhận việc',
                data: recruitmentChart.map(item => item.candidatesRejectJob),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    const maxDataValue = Math.max(
        ...data.datasets.flatMap(dataset => dataset.data)
    );

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                stacked: true,
                max: maxDataValue + 10,
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
                stacked: true,
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
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'shape',
                    padding: 30,
                    font: {
                        size: 18,
                        weight: 700
                    }
                }
            },
            datalabels: {
                display: true,
                color: 'black',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    return value > 0 ? value : '';
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const total = context.dataset.data[context.dataIndex] + (context.chart.data.datasets[0].data[context.dataIndex] || 0);
                        return `${context.dataset.label}: ${context.raw} (Total: ${total})`;
                    }
                }
            }
        }
    };

    const totalPlugin = {
        id: 'totalPlugin',
        afterDatasetsDraw: (chart) => {
            const { ctx, data } = chart;
            ctx.save();
            const meta1 = chart.getDatasetMeta(0);
            const meta2 = chart.getDatasetMeta(1);

            data.labels.forEach((label, index) => {
                const data1 = data.datasets[0].data[index];
                const data2 = data.datasets[1].data[index];
                const total = data1 + data2;

                if (total > 0) {
                    const model1 = meta1.data[index].tooltipPosition();
                    const model2 = meta2.data[index].tooltipPosition();
                    const x = (model1.x + model2.x) / 2;
                    const y = model2.y - 10; // Adjust this value to position the total correctly

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 20px Arial';
                    ctx.fillStyle = 'black';
                    ctx.fillText(total, x, y);
                }
            });

            ctx.restore();
        }
    };

    return (
        <Box sx={{ height: 1, padding: 2, width: "80%" }}>
            <Bar data={data} options={options} plugins={[totalPlugin]} />
            <p style={{ 
                textAlign: 'center', 
                fontFamily: 'sans-serif', 
                fontStyle: 'italic', 
                paddingTop: '5px',
                color: 'red' 
            }}>
                *( Vui lòng click vào các chú thích trên khi bạn muốn ẩn/ hiện dữ liệu )
            </p>
        </Box>
    );
}
