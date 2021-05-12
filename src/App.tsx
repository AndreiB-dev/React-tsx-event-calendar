import React from 'react';

import { Calendar, Login } from './components';

import './App.css';

function App() {
  const [user, setUser] = React.useState(null);
  const me = window.localStorage.user;

  const usersList = [
    {
        id: 1,
        username: 'user',
        password: 'user',
    },
    {
        id: 2,
        username: 'user2',
        password: 'user2',
    },
]

  return (
    <div className="App">
      {me ? <Calendar user={user} setUser={setUser} usersList={usersList}/> : <Login setUser={setUser} usersList={usersList} />}
    </div>
  );
}

export default App;
