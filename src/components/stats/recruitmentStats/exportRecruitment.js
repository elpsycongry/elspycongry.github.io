import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import './recruitmentStats.css';

const ExportRecruitment = ({ month, quarter, year }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const handleExport = async () => {
    // Tạo một biến thời gian hiện tại
    const currentDate = new Date();

    // Lấy tháng hiện tại (tháng trong JavaScript tính từ 0 đến 11)
    const currentMonth = currentDate.getMonth() + 1;

    // Lấy quý hiện tại
    const currentQuarter = Math.floor(currentMonth / 3) + 1;

    // Lấy năm hiện tại
    const currentYear = currentDate.getFullYear();
    console.log(month);
    console.log(quarter);
    console.log(year);
    try {
      let endpoint;
      if (month == currentMonth & quarter == currentQuarter & year == currentYear) {
        endpoint = 'http://localhost:8080/api/recruitmentStats/exportExcel';
        // console.log("In ra tat ca current excel");
      } else if (month !== 0) {
        endpoint = `http://localhost:8080/api/recruitmentStats/monthExportExcel?month=${month}&year=${year}`;
        // console.log("In ra thang excel");
      } else if (quarter !== 0) {
        endpoint = `http://localhost:8080/api/recruitmentStats/quarterExportExcel?quarter=${quarter}&year=${year}`;
        // console.log("In ra quy excel");
      } else if (year !== 0) {
        endpoint = `http://localhost:8080/api/recruitmentStats/yearExportExcel?year=${year}`;
        // console.log("In ra nam excel");
      } else {
        console.log("Không có endpoint hợp lệ tồn tại");
      }

      axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
      const response = await axios.get(endpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'recruitment_stats.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  return (
    <button
      className="btn btn-stats-green"
      style={{ position: 'absolute', left: '0', width: '123px', marginTop: '22px', marginLeft: '53px' }}
      onClick={handleExport}
    >
      <span style={{ paddingRight: '5px' }}>Excel</span>
      <Icon
        icon="mdi:microsoft-excel"
        style={{ width: '25px', height: '25px' }}
      />
    </button>
  );
};

export default ExportRecruitment;