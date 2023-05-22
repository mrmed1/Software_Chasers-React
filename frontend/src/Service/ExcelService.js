import axios from 'axios';

export const importStudent = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      'https://school.eastus.cloudapp.azure.com/api/dg/importStudent',
      formData
    );

    return response.data;
  } catch (error) {
    throw new Error('Import failed. ' + error.message);
  }
};
