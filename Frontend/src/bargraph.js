import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import './bargraph.css'; // Import the CSS file

function BarGraphPage() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch the form data from the backend
    fetch('http://127.0.0.1:5000/formdata')
      .then(response => response.json())
      .then(data => {
        setFormData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const ageChartData = formData.reduce((accumulator, item) => {
    const existingItem = accumulator.find(([age]) => age === item.age);
    if (existingItem) {
      existingItem[1] += 1;
    } else {
      accumulator.push([item.age, 1]);
    }
    return accumulator;
  }, []);

  const genderChartData = formData.reduce((accumulator, item) => {
    const existingItem = accumulator.find(([gender]) => gender === item.gender);
    if (existingItem) {
      existingItem[1] += 1;
    } else {
      accumulator.push([item.gender, 1]);
    }
    return accumulator;
  }, []);

  const favoriteBikesChartData = formData.reduce((accumulator, item) => {
    const existingItem = accumulator.find(([bike]) => bike === item.favoritebikes);
    if (existingItem) {
      existingItem[1] += 1;
    } else {
      accumulator.push([item.favoritebikes, 1]);
    }
    return accumulator;
  }, []);

  // Reverse the order of chart data
  ageChartData.reverse();
  genderChartData.reverse();
  favoriteBikesChartData.reverse();

  const ageChartOptions = {
    title: 'Age Distribution',
    hAxis: {
      title: 'Count',
      minValue: 0,
    },
    vAxis: {
      title: 'Age',
    },
  };

  const genderChartOptions = {
    title: 'Gender Distribution',
    hAxis: {
      title: 'Count',
      minValue: 0,
    },
    vAxis: {
      title: 'Gender',
    },
  };

  const favoriteBikesChartOptions = {
    title: 'Favorite Bikes Distribution',
    hAxis: {
      title: 'Count',
      minValue: 0,
    },
    vAxis: {
      title: 'Bike Names',
    },
  };

  return (
    <div className="bar-graph-page">
      <h2>Bar Graph Page</h2>
      <div className="chart-container">
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[['Count', 'Age'], ...ageChartData]}
          options={ageChartOptions}
        />
      </div>
      <div className="chart-container">
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[['Count', 'Gender'], ...genderChartData]}
          options={genderChartOptions}
        />
      </div>
      <div className="chart-container">
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[['Count', 'Favorite Bikes'], ...favoriteBikesChartData]}
          options={favoriteBikesChartOptions}
        />
      </div>
    </div>
  );
}

export default BarGraphPage;
