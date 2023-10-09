import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import './bargraph.css';

const ExcelPieChart = () => {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false); // State variable to track table visibility

  useEffect(() => {
    // Fetch data from the Excel file
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/exceldata');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  function getAgeData(data) {
    const ageData = [['Age', 'Count']];
    const ageCounts = {};
    data.forEach(({ Age }) => {
      ageCounts[Age] = (ageCounts[Age] || 0) + 1;
    });
    Object.keys(ageCounts).forEach((age) => {
      ageData.push([age, ageCounts[age]]);
    });
    return ageData;
  }
  
  function getGenderData(data) {
    const genderData = [['Gender', 'Count']];
    const genderCounts = {
      Male: 0,
      Female: 0,
    };
    data.forEach(({ Gender }) => {
      genderCounts[Gender] += 1;
    });
    Object.keys(genderCounts).forEach((gender) => {
      genderData.push([gender, genderCounts[gender]]);
    });
    return genderData;
  }
  
  function getFavoriteBikeData(data) {
    const favoriteBikeData = [['Favorite Bike', 'Count']];
    const favoriteBikes = {};
    data.forEach(({ FavoriteBike }) => {
      if (FavoriteBike) {
        favoriteBikes[FavoriteBike] = (favoriteBikes[FavoriteBike] || 0) + 1;
      }
    });
  
    Object.keys(favoriteBikes).forEach((bike) => {
      favoriteBikeData.push([bike, favoriteBikes[bike]]);
    });
    return favoriteBikeData;
  }  

  function getColorScale(numColors) {
    const colors = ['blue', 'red', 'green', 'orange', 'purple', 'yellow', 'pink', 'violet'];
    const colorScale = [];
    for (let i = 0; i < numColors; i++) {
      const colorIndex = i % colors.length;
      colorScale.push(colors[colorIndex]);
    }
    return colorScale;
  }

  function getMaxGenderCount(data) {
    let maxCount = 0;
    const genderCounts = {
      Male: 0,
      Female: 0,
    };
    data.forEach(({ Gender }) => {
      genderCounts[Gender] += 1;
      if (genderCounts[Gender] > maxCount) {
        maxCount = genderCounts[Gender];
      }
    });
    return maxCount;
  }

  return (
    <div>
      <h1>Data Visualization</h1>
      <h2>Age</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="ColumnChart"
        loader={<div>Loading Chart...</div>}
        data={getAgeData(data)}
        options={{
          title: 'Age',
          hAxis: {
            title: 'Age',
            minValue: 0,
          },
          vAxis: {
            title: 'Count',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />

      <h2>Gender</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="ColumnChart"
        loader={<div>Loading Chart...</div>}
        data={getGenderData(data)}
        options={{
          title: 'Gender',
          hAxis: {
            title: 'Gender',
          },
          vAxis: {
            title: 'Count',
            minValue: 0,
            maxValue: getMaxGenderCount(data) + 1,
          },
          legend: { position: 'right' },
        }}
        rootProps={{ 'data-testid': '2' }}
      />

      <h2>Favorite Bike</h2>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart...</div>}
        data={getFavoriteBikeData(data)}
        options={{
          title: 'Favorite Sport',
          colors: getColorScale(getFavoriteBikeData(data).length),
        }}
        rootProps={{ 'data-testid': '3' }}
      />
    </div>
  );
};

export default ExcelPieChart;
