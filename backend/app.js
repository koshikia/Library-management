const express = require('express');
const bodyParser = require('body-parser');

// Import Routes
const dauSachRoutes = require('./routes/dausach.routes');
const banSaoRoutes = require('./routes/bansaosach.routes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Sử dụng Routes
app.use('/api/dausach', dauSachRoutes);
app.use('/api/bansaosach', banSaoRoutes);

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});