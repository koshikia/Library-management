const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoute = require('./routes/auth.route');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend (nếu có)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Test server
app.get('/test', (req, res) => {
    res.send('SERVER IS RUNNING');
});

// Routes
app.use('/api/auth', authRoute);

// Trang chủ (tuỳ chọn)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'home.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
