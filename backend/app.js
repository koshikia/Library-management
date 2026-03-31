const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require("path");
// Import Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require("./routes/user.routes");
const { isAdmin } = require('./middleware/auth.middleware');
const dauSachRoutes = require('./routes/dausach.routes');
const banSaoRoutes = require('./routes/bansaosach.routes');
const datTruocRoutes = require('./routes/dattruoc.routes');
const phieuMuonRoutes = require('./routes/borrow.routes');
const phieuTraRoutes = require('./routes/returnRoutes');
const giaHanRoutes = require('./routes/renewRoutes');
const reportRouters = require('./routes/reportRouters');
const app = express();

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/pics', express.static('pics'));
app.use(bodyParser.json());

app.use(session({
    secret: "secret_key_library",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.use('/api', authRoutes);
app.use("/api", userRoutes);

app.get('/admin', isAdmin, (req, res) => {
    res.sendFile(__dirname + "/protected/admin.html");
});
app.use('/api/dausach', dauSachRoutes);
app.use('/api/bansaosach', banSaoRoutes);
app.use('/api/dattruoc', datTruocRoutes);
app.use('/api/phieumuon', phieuMuonRoutes);
app.use('/api/phieumuon', phieuTraRoutes);
app.use('/api/giahan', giaHanRoutes);
app.use('/api/thongke', reportRouters);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
