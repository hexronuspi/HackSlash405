// App.js

import React, { useState } from 'react';
import './App.css';

const initialData = [
  { id: 1, subject: 'Mathematics', Note: 'Mathematics is an area of knowledge that includes the topics of numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes.' },
  { id: 2, subject: 'Science', Note: 'Scientist' },
  { id: 3, subject: 'History', Note: 'It is a research, a narrative, or an account of past events and developments that are commonly related to a person, an institution, or a place.' },
];

const Card = ({ id, subject, Note, onDelete }) => (
  <div className="card">
    <button className="delete-button" onClick={() => onDelete(id)}>
      X
    </button>
    <h2>{subject}</h2>
   
    <p className="footer-note">{Note}</p>
  </div>
);
const App = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [newCardSubject, setNewCardSubject] = useState('');
  const [newCardOccupation, setNewCardNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCard = () => {
    setShowModal(true);
  };

  const handleSaveCard = () => {
    const newCard = {
      id: data.length + 1,
      subject: newCardSubject,
      Note: newCardOccupation,
    };

    setData([...data, newCard]);
    setShowModal(false);
    setNewCardSubject('');
    setNewCardNote('');
  };

  const handleDeleteCard = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="App">
      <h1>HackSlash Team405 | Task1  </h1>
      <div className="search-container">
        <span className="search-icon"></span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by heading..."
          className="search-input"
        />
      </div>
      <button onClick={handleAddCard}>Add New Card</button>
      <div className="card-container">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            subject={item.subject}
            Note={item.Note}
            onDelete={handleDeleteCard}
          />
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Card</h2>
            <input
              type="text"
              value={newCardSubject}
              onChange={(e) => setNewCardSubject(e.target.value)}
              placeholder="Heading"
            /> 
            <input
              type="text"
              value={newCardOccupation}
              onChange={(e) => setNewCardNote(e.target.value)}
              placeholder="Note"
            />
            <button onClick={handleSaveCard}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
