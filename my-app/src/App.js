import React,{useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import printJS from 'print-js'

import './App.css';

function App() {
  const [order, setOrder] = useState({
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  })
  const handleChange = ({ target: { value, name }}) => setOrder({...order , [name]: value })
  const createAndDownloadPdf = () => {
    axios.post('download-pdf', order ,{ responseType: 'blob' })
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  const printPDF = () => {
    axios.post('download-pdf', order ,{ responseType: 'blob' })
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      printJS(pdfUrl);
      })
  }
  return (
    <div className="App">
      <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
      <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
      <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
      <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
      <button onClick={printPDF}>Print PDF</button>
    </div>
  );
}

export default App;
