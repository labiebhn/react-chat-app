import React from 'react';
import './style.scss';

export function Chat({ value, active }) {
  return (
    <div id="Chat">
      <div className={`container ${active ? 'me' : null}`}>
        <p className="chat-value">
          {value}
        </p>
      </div>
    </div>
  );
}