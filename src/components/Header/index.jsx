import React, { useEffect, useState } from 'react';
import { IconBack, IconLoading } from '../../assets/icons';
import { UserBib, UserKorea, UserTaehyung } from '../../assets/images';
import './style.scss';

export function Header({ handler, name, person }) {

  // state
  const [data, setData] = useState('');

  useEffect(() => {
    if(name && person) {
      const personNew = person.filter(item => item !== name);
      console.log(personNew);
      setData(personNew[0]);
    }
  }, [name, person]);

  return (
    <header id="Header">
      <div className="user-back" onClick={handler}>
        <img src={IconBack} />
      </div>
      <div className="user-ava">
        <img src={data ? `https://source.unsplash.com/random/10${data.length}x10${data.length}` : IconLoading} />
      </div>
      {
        data ?
        <div className="user-detail">
          <div className="name">
            {data}
          </div>
          <div className="activity">Online</div>
        </div> :
        <div className="user-waiting">Waiting for other user..</div>
      }
    </header>
  );
}