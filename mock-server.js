const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// In-memory storage for testing
const orders = [];
const trials = [];

app.use(cors());
app.use(express.json());

// Mock API endpoints
app.post('/api/orders', (req, res) => {
  const order = {
    id: orders.length + 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  console.log('✅ Order submitted:', order);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/trials', (req, res) => {
  const trial = {
    id: trials.length + 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  trials.push(trial);
  console.log('✅ Trial submitted:', trial);
  res.status(201).json(trial);
});

app.get('/api/trials', (req, res) => {
  res.json(trials);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    orders: orders.length, 
    trials: trials.length,
    message: 'Mock server running successfully'
  });
});

app.listen(port, () => {
  console.log(`🚀 Mock server running on http://localhost:${port}`);
  console.log(`📊 Orders submitted: ${orders.length}`);
  console.log(`🎁 Trials submitted: ${trials.length}`);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
}); 