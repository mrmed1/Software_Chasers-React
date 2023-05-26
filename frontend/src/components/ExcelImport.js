import React, { useState } from 'react';
import axios from 'axios';
import {toast} from "react-hot-toast"

const ExcelImport = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => { 
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('https://school.eastus.cloudapp.azure.com/api/dg/importStudent', formData, {
          timeout: 60000,
        /*     headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NkYTczMWU5ODEyZWZiMmU3YjU2ZWEiLCJyb2xlIjoiRElSRUNURVVSIiwiaXNSZXNwb25zaWJsZSI6ZmFsc2UsImlhdCI6MTY4MDA2NzAzNH0.LasPK_EhErBM0Vi9ux1N5WVwfzRpQLOeSlSgPC-JA38'
        } */
//,'Accept-Language': 'en-US,en;q=0.8' 
      });
      console.log(response.data);
      
      toast.success('successful import !');
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button type="submit">Import</button>
    </form>
  );
};

export default ExcelImport;
