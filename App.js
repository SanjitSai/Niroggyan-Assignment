
import React, { useState, useEffect } from 'react';


import './App.css'

import Records from './records.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills, faUser, faFaceDizzy, faFaceTired, faFaceFlushed, faFaceAngry, faUtensils } from '@fortawesome/free-solid-svg-icons'

/**
 * Main App component
 */
function App() {
  const [setMedications] = useState([]);

  useEffect(() => {
    fetch('/api/medications')
      .then(response => response.json())
      .then(data => setMedications(data))
      .catch(error => console.log(error));
  }, []);
  return (
    <div className="app">
      <h3 className='main-heading'>MEDICATIONS</h3>
      <div className='header'>
        <div>
          <h1 className="heading">
            <FontAwesomeIcon icon={faPills} />
            &nbsp; Active Medications ({Records.length})
          </h1>
        </div>

        <div className="key-value-pairs">

          <div className="key-value-pair">
            <div className="key">PATIENT NAME:</div>
            <div className="value">{Records[0].name}</div>
          </div>
          <div className="key-value-pair">
            <div className="key">DATE OF BIRTH:</div>
            <div className="value">{Records[0].dob}</div>
          </div>
          <div className="key-value-pair">
            <div className="key">DATE OF ISSUE:</div>
            <div className="value">{Records[0].date}</div>
          </div>
        </div>


      </div>
      <p className="style" ></p>
      <p className="style" ></p>
      {
        Records.map((record, index) => (
          <Medication key={index} {...record} />
        ))
      }
      <div className='footer'>
        <p><span className='footer-text'>MEDICATIONS:</span> ACTIVE MEDICATIONS</p>
      </div>
    </div>

  );
}
/**
 * Medication component to display medication information
 * @param {Object} props - Medication props
 */
function Medication(props) {
  const sideEffects = {
    "Headache": faUser,
    "Nausea": faFaceFlushed,
    "Dizziness": faFaceDizzy,
    "Fatigue": faFaceTired,
    "Constipation": faFaceAngry,
    "Loss of appetite": faUtensils
  }
  /**
   * Format the directions/notes text by wrapping numbers in <strong> tags
   * @param {string} text - Directions/notes text
   * @returns {JSX.Element} - Formatted JSX element
   */
  const formatDirections = (text) => {
    // Split the text into an array of words
    const words = text.split(' ');

    // Map over the words and wrap numbers with <strong> tags
    const formattedText = words.map((word, index) => {
      // Check if the word is a numbe
      const isNumber = !isNaN(Number(word));

      // Wrap numbers with <strong> tags and add spacing
      return (
        <React.Fragment key={index}>
          {isNumber ? <strong>{word}</strong> : word}
          {index !== words.length - 1 ? ' ' : null}
        </React.Fragment>
      );
    });

    // Return the formatted text as a React fragment
    return <>{formattedText}</>;
  };

  return (
    <div>
      <div className='med-name'>
        {props.medName.toUpperCase()}
      </div>
      <div className='med-container'>
        <div className='appearance'>
          <p className='appearance-heading'>APPEARANCE</p>

          <img src={props.appearance} alt={props.medName.toUpperCase()} className='image' />
          <p className='appearance-heading'>REASON FOR MEDICATION</p>
          <p className='description'>{props.reason}</p>

        </div>

        <div className='appearance-2'>
          <p className='appearance-heading'>DIRECTION/NOTES</p>
          <p className='description' >{formatDirections(props.directions)}</p>
          <img src={props.timeSlot} alt={props.directions.toUpperCase()} className='imageSlot' />

        </div>
        <div className='appearance-3'>

          <div className='side-effects-section'>
            <p className='appearance-heading'>POSSIBLE SIDE EFFECTS</p>
            <ul className='side-effects'>
              {props.sideEffects && props.sideEffects.map((sideEffect, index) => (
                <li className='list' key={index}>
                  <FontAwesomeIcon
                    icon={sideEffects[sideEffect]}
                    className='icon'
                  />
                  &nbsp;
                  <span className='list-item'>{sideEffect}</span>
                </li>
              ))}
            </ul>
          </div>
          {props.getHelp && (
            <React.Fragment>
              <p className='appearance-heading'>GET MEDICAL HELP IF</p>
              <p className='description-help'>{props.getHelp}</p>
            </React.Fragment>
          )}
        </div>
      </div>
      <p className="style" ></p>

    </div>

  )
}

export default App;
