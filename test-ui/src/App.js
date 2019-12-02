import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log(res)
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
    })
  }, [])

  return (
    <div className="App">
      {users && users.map(user => (
        <>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </>
      ))}
    </div>
  );
}

export default App;
