const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require("./routes/user.routes");
const bookRoutes = require('./routes/book.routes');

//nam
const borrowRoutes = require('./routes/borrowRoutes');
const renewRoutes = require('./routes/renewRoutes'); // thêm dòng này
const returnRoutes = require('./routes/returnRoutes');
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
app.use("/api", userRoutes);
app.use('/api/borrows', borrowRoutes);
app.use('/api/renew', renewRoutes); // thêm dòng này
app.use('/api/returns', returnRoutes);

// route admin
app.get('/admin', isAdmin, (req, res) => {
    res.sendFile(__dirname + "/protected/admin.html");
});

module.exports = app;