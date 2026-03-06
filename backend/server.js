const express = require('express');
const cors = require('cors');

require('./config/db'); // kết nối MySQL

const borrowRoutes = require('./routes/borrowRoutes');
const renewRoutes = require('./routes/renewRoutes'); // thêm dòng này
const returnRoutes = require('./routes/returnRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/borrows', borrowRoutes);
app.use('/api/renew', renewRoutes); // thêm dòng này
app.use('/api/returns', returnRoutes);

app.get('/test', (req, res) => {
    res.send('SERVER IS RUNNING');
});

app.listen(PORT, () => {
    console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});