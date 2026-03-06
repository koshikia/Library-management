const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const { isAdmin } = require('./middleware/auth.middleware');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/pics', express.static('pics'));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    secret: "secret_key_library",
    resave: false,
    saveUninitialized: false
}));

// frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);

// route admin
app.get('/admin', isAdmin, (req, res) => {
    res.sendFile(__dirname + "/protected/admin.html");
});

module.exports = app;