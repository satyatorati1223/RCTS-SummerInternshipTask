import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Excel.css';

function Excel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
  if (selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/uploadexcel', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Data saved successfully');
        navigate('/excelchart');
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Clear the selected file field
      fileInputRef.current.value = '';
      setSelectedFile(null);
    }
  }
};


  return (
    <div className="excel-container">
      <h3>Upload your Excel</h3>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="file-input"
        ref={fileInputRef}
      />
      {selectedFile && (
        <div className="file-info">
          Selected file: {selectedFile.name}
        </div>
      )}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}

export default Excel;




