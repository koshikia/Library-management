const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'frontend')));

//ROUTE HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'home.html'));
});

// TEST
app.get('/test', (req, res) => {
    res.send('SERVER OK');
});

// API book
app.get('/api/book', (req, res) => {
    db.query('SELECT * FROM book', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/book', (req, res) => {
    const { title, author, year } = req.body;
    db.query(
        'INSERT INTO book (title, author, year) VALUES (?, ?, ?)',
        [title, author, year],
        () => res.json({ message: 'Thêm sách thành công' })
    );
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
