import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import ExportButton from '../trainingStats/exportButton';
import ProcessedCVChart from "./processedCVChart";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
const ButtonPDFExport = ({ listChartElem, year }) => {
    const [anchor, setAnchor] = React.useState(null);
    const [checkboxes, setCheckboxes] = React.useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
    });
    const [trainingCharts, setTrainingCharts] = React.useState(new Array(12).fill({
        totalCV: 0,
        totalInterviewCV: 0,
        candidatesInterview: 0,
        candidatesDoNotInterview: 0,
        candidatesPass: 0,
        candidatesFail: 0,
        candidatesAcceptJob: 0,
    }));
    const [recruitmentChart, setRecuitmentChart] = React.useState(new Array(12).fill({
        candidatesInterview: 0,
        candidatesDoNotInterview: 0,
        candidatesPass: 0,
        candidatesFail: 0,
        candidatesAcceptJob: 0,
        candidatesRejectJob: 0,
    }));

    React.useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem("currentUser"))
            if (user != null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
                try {
                    const response = await axios.get(`http://localhost:8080/api/recruitmentStats/recruitmentChart/year?year=${year}`);
                    setTrainingCharts(response.data);
                    const response1 = await axios.get(`http://localhost:8080/api/recruitmentStats/recruitmentChart/year?year=2024`);
                    setRecuitmentChart(response.data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [year]);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckboxes((prev) => ({ ...prev, [id]: checked }));
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const pdf = new jsPDF('p', 'mm', 'a4'); // Tạo một tài liệu PDF với kích thước A4;
        // Tính toán kích thước và vị trí của ảnh để chèn vào tài liệu PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth * 1; // 80% chiều rộng của trang PDF
        const imgX = (pdfWidth - imgWidth) / 2; // Canh giữa theo chiều ngang
        // const imgY = (pdfHeight - imgHeight) / 1.3; // Canh giữa theo chiều dọc
        const imgY = 20;
        // Thêm trang mới vào tài liệu PDF

        if (checkboxes.checkbox1 === true) {
            const canvas = await html2canvas(listChartElem()[0].current);
            const imgData = canvas.toDataURL('image/png');
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tính toán chiều cao tương ứng
            pdf.setFontSize(12)
            pdf.text('Line Chart', 93, 18);
            // pdf.text('Parameters', 93, imgY + imgHeight + 15);
            pdf.setFontSize(20)
            pdf.text('Statistical chart', 80, 10)

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới

            pdf.autoTable({
                head:[['Month' ,'CV', 'Interview', 'Candidates Accept Interview', 'Candidates Reject Interview', 'Candidates Pass', "Candidates Fail", "Candidates Accept Job"]],
                body: trainingCharts.map((val, i) => [(i + 1) , val.totalCV, val.totalInterviewCV, val.candidatesInterview, val.candidatesDoNotInterview, val.candidatesPass, val.candidatesFail, val.candidatesAcceptJob]),
                startY: imgY + imgHeight + 20, // Vị trí y cho bảng, sau ảnh
                styles: {
                    halign: 'center',
                    tableLineWidth: 0.1,
                    tableLineColor: 'black'
                },
                headStyles: {
                    halign: 'center',
                    fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    fontStyle: 'bold',
                    lineWidth: 0.1,
                    lineColor: 'black'
                },
                bodyStyles: {
                    lineWidth: 0.1,
                    lineColor: 'black'
                }
            });
        }
        if (checkboxes.checkbox2 === true) {
            pdf.addPage()
            const canvas1 = await html2canvas(listChartElem()[1].current);
            const imgData1 = canvas1.toDataURL('image/png');
            // Nội dung trang mới
            pdf.setFontSize(12)
            pdf.text('Line Chart', 93, 18);
            pdf.setFontSize(20)
            pdf.text('Statistical chart', 80, 10)
            pdf.addImage(imgData1, 'PNG', imgX, imgY, imgWidth, 80); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới
            pdf.autoTable({
                head:[['Month' ,'Candidates Accept Interview', 'Candidates Reject Interview', 'Total']],
                body: recruitmentChart.map((val, i) => [(i + 1) , val.candidatesInterview, val.candidatesDoNotInterview,val.candidatesInterview +  val.candidatesDoNotInterview]),
                startY: imgY + 80 + 20, // Vị trí y cho bảng, sau ảnh
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
        }
        if (checkboxes.checkbox3 === true) {
            pdf.addPage()
            listChartElem()[2].current.style.visibility = "visible";
            listChartElem()[3].current.style.visibility = "visible";
            const canvas2 = await html2canvas(listChartElem()[2].current);
            const imgData2 = canvas2.toDataURL('image/png');
            // Nội dung trang mới
            pdf.setFontSize(12)
            pdf.text('Line Chart', 93, 18);
            pdf.setFontSize(20)
            pdf.text('Statistical chart', 80, 10)
            pdf.addImage(imgData2, 'PNG', 23, imgY, imgWidth, 80); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới
            pdf.autoTable({
                head:[['Month' ,'Candidates Pass', 'Candidates Fail', 'Total']],
                body: recruitmentChart.map((val, i) => [(i + 1) , val.candidatesPass, val.candidatesFail,val.candidatesPass +  val.candidatesFail]),
                startY: imgY + 80 + 20, // Vị trí y cho bảng, sau ảnh
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
        }
        if (checkboxes.checkbox4 === true) {
            pdf.addPage()
            const canvas3 = await html2canvas(listChartElem()[3].current);
            const imgData3 = canvas3.toDataURL('image/png');
            // Nội dung trang mới
            pdf.setFontSize(12)
            pdf.text('Line Chart', 93, 18);
            pdf.setFontSize(20)
            pdf.text('Statistical chart', 80, 10)
            pdf.addImage(imgData3, 'PNG', 23, imgY, imgWidth, 80); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới

            pdf.autoTable({
                head:[['Month' ,'Candidates Accept Job', 'Candidates Reject Job', 'Total']],
                body: recruitmentChart.map((val, i) => [(i + 1) , val.candidatesAcceptJob, val.candidatesRejectJob,val.candidatesAcceptJob +  val.candidatesRejectJob]),
                startY: imgY + 80 + 20, // Vị trí y cho bảng, sau ảnh
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
        }

        pdf.save('chart.pdf'); // Tải xuống tài liệu PDF
    };

    return (
        <div>
            <button style={{ marginTop: '-30px', float: 'right' }} className='btn btn-success' aria-describedby={id} type="button" onClick={handleClick}>
                Export File
            </button>
            <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody>
                    <div style={{width: '200px'}}>
                        <form onSubmit={formSubmitHandler}>
                            <div>
                                <label>
                                Chọn biểu đồ:
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox1" checked={checkboxes.checkbox1} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10 }}>Biểu đồ đường</label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox2" checked={checkboxes.checkbox2} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10 }}>Biểu đồ cột cv đã xử lý</label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox3" checked={checkboxes.checkbox3} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10 }}>Biểu đồ cột pass/fail</label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox4" checked={checkboxes.checkbox4} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10 }}>Biểu đồ cột nhận việc</label>
                            </div>
                            <div >
                                <button style={{width: '50%', height: '50%'}} className="btn btn-success" type="submit">Export</button>
                            </div>
                        </form>
                    </div>
                </PopupBody>
            </BasePopup>
        </div>
    );
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const PopupBody = styled('div')(
    ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
        };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);

// const Button = styled('button')(
//     ({ theme }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 600;
//   font-size: 0.875rem;
//   line-height: 1.5;
//   background-color: ${blue[500]};
//   padding: 8px 16px;
//   border-radius: 8px;
//   color: white;
//   transition: all 150ms ease;
//   cursor: pointer;
//   border: 1px solid ${blue[500]};
//   box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
//         }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

//   &:hover {
//     background-color: ${blue[600]};
//   }

//   &:active {
//     background-color: ${blue[700]};
//     box-shadow: none;
//   }

//   &:focus-visible {
//     box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//     outline: none;
//   }

//   &.disabled {
//     opacity: 0.4;
//     cursor: not-allowed;
//     box-shadow: none;
//     &:hover {
//       background-color: ${blue[500]};
//     }
//   }
// `,
// );

export default ButtonPDFExport;
