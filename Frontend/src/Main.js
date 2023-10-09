import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Home = () => {
  const handleCardClick = (title) => {
    console.log(`Clicked on card with title: ${title}`);
    // Add your logic here for handling the card click
  };

  return (
    <div className='Main'>
      <div className="navbar">
        <a href="#">Home</a>
      </div>

      <div className="box-container">
        <Link to="/excel">
          <button className="box" onClick={() => handleCardClick("Title 1")}>
            <h2>Excel</h2>
          </button>
        </Link>
        <Link to="/form">
          <button className="box box-1" onClick={() => handleCardClick("Title 2")}>
            <h2>Form</h2>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
