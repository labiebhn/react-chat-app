import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IconSend } from '../../assets/icons';
import './style.scss';

export function FormChat({ name, endpoint }) {
  // state
  const [message, setMessage] = useState('');
  const formRef = useRef();

  const onSubmit = () => {
    
    const data = {
      name,
      message
    }

    axios.post(endpoint, data).then(res => {
      console.log(res.data);
      formRef.current.reset();
      setMessage('');
    }).catch(err => console.log(err));
  }

  return (
    <div id="FormChat">
      <form 
        ref={formRef}
        className='form-container'
      >
        <textarea
          className="input"
          rows={1}
          onKeyUp={({ key, target }) => key === 'Enter' ? onSubmit() : setMessage(target.value)}
          // onChange={({ target }) => setMessage(target.value)}
          placeholder="Type something.."></textarea>
      </form>
      <div className="submit">
        <button className="btn-submit" disabled={message ? false : true} onClick={onSubmit}>
          <img src={IconSend} />
        </button>
      </div>
    </div>
  );
}