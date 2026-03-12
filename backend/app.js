const express = require('express');
<<<<<<< HEAD
const bodyParser = require('body-parser');

// Import Routes
const dauSachRoutes = require('./routes/dausach.routes');
const banSaoRoutes = require('./routes/bansaosach.routes');
const datTruocRoutes = require('./routes/dattruoc.routes');
const app = express();

// Middleware
app.use(bodyParser.json());

// Sử dụng Routes
app.use('/api/dausach', dauSachRoutes);
app.use('/api/bansaosach', banSaoRoutes);
app.use('/api/dattruoc', datTruocRoutes);
// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
=======
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

<<<<<<< HEAD
module.exports = app;
>>>>>>> 9033fff91e09249b161d28c029fd04721231ac6a
=======
module.exports = app;
>>>>>>> c3d0409ddb7bbe9101418ecea918898e9b3122e6
