import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import '../recruitmentStats.css'

const ExportRecruitment = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recruitmentStats/exportExcel', {
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
      <span style={{paddingRight: '5px'}}>Excel</span>
      <Icon
        icon="mdi:microsoft-excel"
        style={{width: '25px', height: '25px'}}
      />
    </button>
  );
};

export default ExportRecruitment;