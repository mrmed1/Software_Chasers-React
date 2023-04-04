import { useState, useEffect } from 'react';
import './EventForm.css';

function EventForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [univId, setUnivId] = useState('');
  const [univList, setUnivList] = useState([]);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isTypeValid, setIsTypeValid] = useState(true);
  const [isUnivIdValid, setIsUnivIdValid] = useState(true);

  useEffect(() => {
    async function fetchUnivList() {
      const response = await fetch('http://localhost:3000/api/Univ');
      const data = await response.json();
      setUnivList(data);
    }
    fetchUnivList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit event');
    const eventObject = {
      name,
      description,
      type,
      univId,
    };

    const response = await fetch('http://localhost:3000/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventObject),
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    console.log('Event created successfully!');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsNameValid(event.target.value !== '');
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsDescriptionValid(event.target.value !== '');
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setIsTypeValid(event.target.value !== '');
  };

  const handleUnivIdChange = (event) => {
    setUnivId(event.target.value);
    setIsUnivIdValid(event.target.value !== '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-control ${!isNameValid ? 'is-invalid' : ''}`}
          value={name}
          onChange={handleNameChange}
          required
        />
        {!isNameValid && <div className="invalid-feedback">Please enter a name.</div>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className={`form-control ${!isDescriptionValid ? 'is-invalid' : ''}`}
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        {!isDescriptionValid && <div className="invalid-feedback">Please enter a description.</div>}
      </div>
      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          className={`form-select ${!isTypeValid ? 'is-invalid' : ''}`}
          value={type}
          onChange={handleTypeChange}
          required
        >
          <option value="" disabled>
            Select a type
          </option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>

          <option value="conference">Conference</option>
        </select>
        {!isTypeValid && <div className="invalid-feedback">Please select a type.</div>}
      </div>
      <div className="form-group">
        <label htmlFor="univYear">University Year:</label>
        <select
          required
          value={univId}
          onChange={(e) => setUnivId(e.target.value)}
          className={`form-input ${isUnivIdValid ? '' : 'is-invalid'}`}
        >
          <option disabled value="">
            -- Select --
          </option>

     
          {univList.map((univ) => (
            <option key={univ._id} value={univ._id}>
              {univ.name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Please select a university year.</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default EventForm;
