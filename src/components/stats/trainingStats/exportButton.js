import React from 'react';
import axios from 'axios';

const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/stats/exportExcelTrainingStatsAll', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'training_stats.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  return (
    <button
      className="btn btn-success"
      style={{ position: 'absolute', right: '0' }}
      onClick={handleExport}
    >
      Xuất file Excel
    </button>
  );
};

export default ExportButton;