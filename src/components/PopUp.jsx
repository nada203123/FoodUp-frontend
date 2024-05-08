import React from 'react';
import './PopUp.css';

function PopUp({ message, buttontext, onclick }) {
  return (
    <div className="popup"> 
      <p className='msg'>{message}</p>
      <button className='btnPopup' onClick={onclick}>{buttontext}</button>
    </div>
  );
}

export default PopUp;