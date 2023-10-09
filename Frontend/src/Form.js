import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; // Import the CSS file

function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [favoritebikes, setFavoriteBike] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      name,
      age,
      gender,
      favoritebikes
    };

    // Send the form data to the backend
    fetch('http://127.0.0.1:5000/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data saved:', data);
        setSubmitted(true);
        navigate('/bargraph')
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Clear the form inputs
    setName('');
    setAge('');
    setGender('');
    setFavoriteBike('');
  };

  const ageOptions = [];
  for (let i = 10; i <= 25; i++) {
    ageOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const bikeOptions = [
    'BMW',
    'KTM',
    'Royal Enfield',
    'JAWA',
    'Pulsar',
    'Harley-Davidson',
    'Yamaha R15',
    'Yamaha RX100'
  ];

  return (
    <div className='container'>
      <h3 className="form-heading">Fill out the form</h3>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
        </label>
        <br />
        <label>
          Age:
          <select value={age} onChange={(e) => setAge(e.target.value)} required className="form-select">
            <option value="">Select</option>
            {ageOptions}
          </select>
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)} required className="form-select">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Favorite Bike:
          <select value={favoritebikes} onChange={(e) => setFavoriteBike(e.target.value)} required className="form-select">
            <option value="">Select</option>
            {bikeOptions.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit" className="form-button">Submit</button>
      </form>
      {submitted}
    </div>
  );
}

export default Form;