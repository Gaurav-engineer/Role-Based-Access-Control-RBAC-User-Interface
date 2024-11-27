// /frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = "http://localhost:5000/api";

function App() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE}/roles`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRoles(response.data);
    } catch (err) {
      console.error("Failed to fetch roles", err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.status}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Roles</h2>
        <ul>
          {roles.map(role => (
            <li key={role.id}>{role.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
