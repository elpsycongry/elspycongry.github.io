import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import ExportButton from '../trainingStats/exportButton';
import ProcessedCVChart from "./processedCVChart";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { get } from 'lodash';
import { Icon } from '@iconify/react';

const ButtonPDFExport = ({ listChartElem, year }) => {
    const localhost = process.env.REACT_APP_API_BACK_END;
    const [anchor, setAnchor] = React.useState(null);
    const date = new Date();
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
                    const response = await axios.get(`${localhost}api/recruitmentStats/recruitmentChart/year?year=${year}`);
                    setTrainingCharts(response.data);
                    const response1 = await axios.get(`${localhost}api/recruitmentStats/recruitmentChart/year?year=2024`);
                    setRecuitmentChart(response1.data)
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
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth * 1; // 80% chiều rộng của trang PDF
        const imgX = (pdfWidth - imgWidth) / 2; // Canh giữa theo chiều ngang
        const imgY = 20;

        if (checkboxes.checkbox1 === true) {
            const canvas = await html2canvas(listChartElem()[0].current);
            const imgData = canvas.toDataURL('image/png');
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tính toán chiều cao tương ứng
            pdf.setFontSize(12)
            pdf.text('Intern recruitment chart in ' + year, 74, 18);
            pdf.text('Intern recruitment parameters in ' + year, 71, imgY + imgHeight + 15);
            pdf.setFontSize(20)
            pdf.text('Statistical chart', 80, 10)

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới

            pdf.autoTable({
                head: [['Month', 'CV', 'Interview', 'Candidates Accept Interview', 'Candidates Reject Interview', 'Candidates Pass', "Candidates Fail", "Candidates Accept Job"]],
                body: trainingCharts.map((val, i) => [(i + 1), val.totalCV, val.totalInterviewCV, val.candidatesInterview, val.candidatesDoNotInterview, val.candidatesPass, val.candidatesFail, val.candidatesAcceptJob]),
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
            listChartElem()[1].current.style.visibility = "visible";
            if (checkboxes.checkbox1 === true) {
                pdf.addPage();
            }
            if (checkboxes.checkbox1 === false) {
                pdf.text('Statistical chart', 80, 10);
            }
            const canvas1 = await html2canvas(listChartElem()[1].current);
            const imgData1 = canvas1.toDataURL('image/png');
            pdf.setFontSize(12)
            pdf.text('Column chart of number of CVs processed in 2024', 60, 18);
            pdf.text('Parameters of number of CVs processed in 2024', 62, imgY + 90);
            pdf.setFontSize(20)
            pdf.addImage(imgData1, 'PNG', 21, imgY, imgWidth, 80); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới
            pdf.autoTable({
                head: [['Month', 'Candidates Accept Interview', 'Candidates Reject Interview', 'Total']],
                body: recruitmentChart.map((val, i) => [(i + 1), val.candidatesInterview, val.candidatesDoNotInterview, val.candidatesInterview + val.candidatesDoNotInterview]),
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
            if (checkboxes.checkbox1 === true || checkboxes.checkbox2 === true) {
                pdf.addPage()
            }
            
            if (checkboxes.checkbox2 === false && checkboxes.checkbox1 === false) {
                pdf.text('Statistical chart', 90, 10);
            }
            listChartElem()[2].current.style.visibility = "visible";
            const canvas2 = await html2canvas(listChartElem()[2].current);
            const imgData2 = canvas2.toDataURL('image/png');
            pdf.setFontSize(12)
            pdf.text('Column chart of number of pass/fail in 2024', 68, 18);
            pdf.text('Parameters of number of pass/fail in 2024', 68, imgY + 90);
            pdf.setFontSize(20)
            pdf.addImage(imgData2, 'PNG', 23, imgY, imgWidth, 80); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới
            pdf.autoTable({
                head: [['Month', 'Candidates Pass', 'Candidates Fail', 'Total']],
                body: recruitmentChart.map((val, i) => [(i + 1), val.candidatesPass, val.candidatesFail, val.candidatesPass + val.candidatesFail]),
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
            listChartElem()[3].current.style.visibility = "visible";
            if (checkboxes.checkbox3 === true || checkboxes.checkbox2 === true || checkboxes.checkbox1 === true) {
                pdf.addPage()
            }
            if (checkboxes.checkbox3 === false && checkboxes.checkbox2 === false && checkboxes.checkbox1 === false) {
                pdf.text('Statistical chart', 90, 10);
            }
            const canvas3 = await html2canvas(listChartElem()[3].current);
            const imgData3 = canvas3.toDataURL('image/png');
            pdf.setFontSize(12)
            pdf.text('Column chart of number of accept and reject job in 2024', 62, 18);
            pdf.text('Parameters of number of accept and reject job in 2024', 62, imgY + 90);
            pdf.setFontSize(20)
            pdf.addImage(imgData3, 'PNG', 23, imgY, imgWidth, 80); // Chèn ảnh vào tài liệu PDF với kích thước và vị trí mới

            pdf.autoTable({
                head: [['Month', 'Candidates Accept Job', 'Candidates Reject Job', 'Total']],
                body: recruitmentChart.map((val, i) => [(i + 1), val.candidatesAcceptJob, val.candidatesRejectJob, val.candidatesAcceptJob + val.candidatesRejectJob]),
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

        pdf.save('chart' + '/' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + '.pdf'); // Tải xuống tài liệu PDF
    };

    return (
        <div>
            <button style={{ marginTop: '-30px', float: 'right', marginRight: '220px' }} className='btn btn-stats-pdf' aria-describedby={id} type="button" onClick={handleClick}>
                Xuất file PDF <Icon icon="ant-design:file-pdf-filled" />
            </button>
            <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody>
                    <div style={{ width: '200px' }}>
                        <form onSubmit={formSubmitHandler}>
                            <div>
                                <label>
                                    Chọn biểu đồ bạn muốn:
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox1" checked={checkboxes.checkbox1} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10, marginBottom: 5 }}>Biểu đồ đường</label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox2" checked={checkboxes.checkbox2} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10, marginBottom: 5 }}>Biểu đồ cột cv đã xử lý</label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox3" checked={checkboxes.checkbox3} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10, marginBottom: 5 }}>Biểu đồ cột pass/fail</label>
                            </div>
                            <div>
                                <input type="checkbox" id="checkbox4" checked={checkboxes.checkbox4} onChange={handleCheckboxChange} />
                                <label style={{ marginLeft: 10, marginBottom: 5 }}>Biểu đồ cột nhận việc</label>
                            </div>
                            <div >

                                <button style={{ marginLeft: 50 }} className="btn btn-stats-pdf" type="submit">Xuất file <Icon icon="ant-design:file-pdf-filled" /></button>
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


export default ButtonPDFExport;
