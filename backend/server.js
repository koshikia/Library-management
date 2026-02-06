const express = require('express');
const cors = require('cors');

require('./config/db'); // ✅ KẾT NỐI MYSQL


const borrowRoutes = require('./routes/borrowRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/borrows', borrowRoutes);

app.get('/test', (req, res) => {
    res.send('SERVER IS RUNNING');
});

app.listen(PORT, () => {
    console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
