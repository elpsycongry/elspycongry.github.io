import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import './trainingStats.css';

const ExportButton = ({ month, quarter, year }) => {
  const localhost = process.env.REACT_APP_API_BACK_END;

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

    try {
      let endpoint;
      let filename;

      if (month == currentMonth && quarter == currentQuarter && year == currentYear) {
        endpoint = `${localhost}api/stats/exportExcelTrainingStatsAll`;
        filename = `Chỉ số thống kê đào tạo toàn hệ thống.xlsx`;
      } else if (month !== 0) {
        endpoint = `${localhost}api/stats/exportExcelTrainingStats/monthExportExcel?month=${month}&year=${year}`;
        filename = `Chỉ số thống kê đào tạo tháng ${month}.xlsx`;
      } else if (quarter !== 0) {
        endpoint = `${localhost}api/stats/exportExcelTrainingStats/quarterExportExcel?quarter=${quarter}&year=${year}`;
        filename = `Chỉ số thống kê đào tạo quý ${quarter}.xlsx`;
      } else if (year !== 0) {
        endpoint = `${localhost}api/stats/exportExcelTrainingStats/year?year=${year}`;
        filename = `Chỉ số thống kê đào tạo năm ${year}.xlsx`;
      } else {
        console.log("Không có endpoint hợp lệ tồn tại");
        return;
      }

      axios.defaults.headers.common["Authorization"] = "Bearer " + user.accessToken;
      const response = await axios.get(endpoint, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
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
      style={{ position: 'absolute', right: '0', width: '123px', marginTop: '22px' }}
      onClick={handleExport}
    >
      <span style={{ paddingRight: '5px', paddingTop: '3px' }}>Excel</span>
      <Icon
        icon="mdi:microsoft-excel"
        style={{ width: '25px', height: '25px' }}
      />
    </button>
  );
};

export default ExportButton;
