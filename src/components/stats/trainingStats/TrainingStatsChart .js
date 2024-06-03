import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
// import PDFDocument from '@react-pdf/renderer'
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
import { head, size } from 'lodash';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function TrainingStatsChart({ year }) {

    const pdfRef = useRef(null); 
    const downloadPDF = async () =>{
        const canvas = await html2canvas(pdfRef.current);
        const imgData = canvas.toDataURL('image/png');
        
        
        const pdf = new jsPDF('p', 'mm', 'a4'); // Tạo một tài liệu PDF với kích thước A4
    ;
        
        // Tính toán kích thước và vị trí của ảnh để chèn vào tài liệu PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth * 1; // 80% chiều rộng của trang PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tính toán chiều cao tương ứng
        const imgX = (pdfWidth - imgWidth) / 2; // Canh giữa theo chiều ngang
        // const imgY = (pdfHeight - imgHeight) / 1.3; // Canh giữa theo chiều dọc
        const imgY = 20;
        pdf.setFontSize(12)
        pdf.text('Line Chart', 93, 18);
        pdf.text('Parameters', 93, imgY + imgHeight + 15);
        pdf.setFontSize(20)
        pdf.text('Statistical chart', 80, 10)
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới

        pdf.autoTable({
            head:[['Month' ,'Intern Enrolled', 'Intern Graduate', 'Intern Fail', 'Intern Leave']],
            body: trainingCharts.map((val, i) => [(i + 1) , val.internsEnrolled, val.graduatingInterns, val.internsFailed, val.internsQuitInternship]),
            startY: imgY + imgHeight + 20, // Vị trí y cho bảng, sau ảnh
            styles: {
                halign: 'center',
                cellWidth: 'wrap',
                lineColor: [0, 0, 0],  // Set border color (black)
                lineWidth: 0.1,        // Set border width
            },
            headStyles: {
                halign: 'center',
                fillColor: [255, 255, 255], // Background color for the header
                textColor: [0, 0, 0],       // Text color for the header
                lineWidth: 0.1,             // Border width for the header
                lineColor: [0, 0, 0]        // Border color for the header
            },
            bodyStyles: {
                lineWidth: 0.1,             // Border width for the body
                lineColor: [0, 0, 0]        // Border color for the body
            }
            })

        
        pdf.save('chart.pdf'); // Tải xuống tài liệu PDF
    }
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

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            if (user != null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                try {
                    const response = await axios.get("http://localhost:8080/api/stats/trainingCharts/year?year=" + year);
                    setTrainingCharts(response.data);
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
        <Box sx={{ width: '80%', height: '585px', padding: 2 }} ref={pdfRef}>
            <button style={{marginTop: '-75px', float: 'right'}} className='btn btn-success' onClick={downloadPDF}>Download PDF</button>
            <div style={{ width: '100%', height: '100%' }}>
                <Line  data={data} options={options} />
            </div>
            <div>
                {hiddenDatasets.join(', ')}
            </div>
            <p style={{ 
                textAlign: 'center', 
                fontFamily: 'sans-serif', 
                fontStyle: 'italic', 
                paddingTop: '10px',
                color: 'red' 
            }}>
                *( Vui lòng click vào các chú thích trên khi bạn muốn ẩn/ hiện dữ liệu )
            </p>
            
        </Box>
    );
}