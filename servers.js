// /backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

const PORT = 5000;
const SECRET_KEY = "your_secret_key";

// Mock DB
let users = [];
let roles = [];
let permissions = [];

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    res.status(403).json({ error: "Forbidden" });
  }
};

// CRUD APIs
app.post('/api/users', (req, res) => {
  const { name, email, password, roleId, status } = req.body;
  const id = users.length + 1;
  users.push({ id, name, email, password, roleId, status });
  res.json({ id });
});

app.get('/api/users', authenticate, (req, res) => {
  res.json(users);
});

app.post('/api/roles', (req, res) => {
  const { name, permissions } = req.body;
  const id = roles.length + 1;
  roles.push({ id, name, permissions });
  res.json({ id });
});

app.get('/api/roles', authenticate, (req, res) => {
  res.json(roles);
});

// JWT Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, roleId: user.roleId }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
