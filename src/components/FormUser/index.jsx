import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

export function FormUser({ handler, endpoint }) {
  const [name, setName] = useState('');

  const onSubmit = () => {
    axios.post(`${endpoint}/person`, {name})
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
    handler(name);
  }

  return (
    <div id="FormUser">
      <div className="form-container">
        <input
          type="text"
          className="input-name"
          placeholder="Input nama kamu"
          onKeyUp={({ key, target }) => key === 'Enter' ? onSubmit() : setName(target.value)}
        />
        <div className="submit">
          <button className="btn-submit" onClick={onSubmit}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}