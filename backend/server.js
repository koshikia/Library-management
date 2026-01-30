const express = require('express');
const cors = require('cors');

require('./db'); // ✅ KẾT NỐI MYSQL

const authRoute = require('./routes/auth.route');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);

app.get('/test', (req, res) => {
    res.send('SERVER IS RUNNING');
});

app.listen(PORT, () => {
    console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
