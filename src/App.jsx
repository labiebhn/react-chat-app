import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import axios from 'axios';
import './App.scss';
import { Chat, FormChat, FormUser, Header } from "./components";

const ENDPOINT = "http://localhost:4001";

function App() {
  // state
  const [name, setName] = useState('');
  const [person, setPerson] = useState(null);
  const [chat, setChat] = useState(null);
  const [formUser, setFormUser] = useState(false);
  const messageEndRef = useRef(null);

  const logout = () => {
    axios.delete(`${ENDPOINT}/person/${name}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
    localStorage.removeItem('name');
    setName('');
    setChat(null);
  }

  // socket
  useEffect(() => {
    // get value name
    const name = localStorage.getItem('name');
    if(name) {
      axios.post(`${ENDPOINT}/person`, {name})
      .then(res => setPerson(res.data.person))
      .catch(err => console.log(err));
      setName(name);
      axios.get(ENDPOINT).then(res => setChat(res.data.data));
    }
    // init server socket
    const socket = socketIOClient(ENDPOINT);
    // open server socket chat
    socket.on("ChatAPI", data => {
      setChat(data);
    });
    // open server socket person
    socket.on("PersonAPI", data => {
      setPerson(data);
      console.log(data);
    });
    // close server socket
    return () => socket.disconnect();
  }, []);

  // display form name
  useEffect(() => {
    if(name) {
      setFormUser(false);
      axios.get(ENDPOINT).then(res => setChat(res.data.data));
      console.log(name);
    } else {
      setFormUser(true);
    }
  }, [name]);

  // scroll to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat]);

  return (
    <div className="App">
      <main className="chat">
        <Header 
          name={name}
          person={person}
          handler={logout}
        />
        <div 
          className="chat-container"
        >
          {
            chat ?
            chat.map((chat, i) => {
              return(
                <Chat 
                  key={i} 
                  value={chat?.message} 
                  active={chat?.name === name}
                />
              )
            }) : null
          }
          <div ref={messageEndRef}></div>
        </div>
        <FormChat name={name} endpoint={ENDPOINT} />
      </main>
      {
        formUser ? 
        <FormUser endpoint={ENDPOINT} handler={(name) => {
          setName(name)
          localStorage.setItem('name', name);
        }} /> : null
      }
    </div>
  );
}

export default App;
