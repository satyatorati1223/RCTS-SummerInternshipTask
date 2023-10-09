import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Excel from './Excel';
import Main from './Main';
import Form from './Form';
import Bargraph from './bargraph';
import ExcelChart from './ExcelChart';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/form" element={<Form />} />
          <Route path="/excel" element={<Excel />} />
          <Route path="/bargraph" element={<Bargraph/>} />
          <Route path="/excelchart" element={<ExcelChart/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
