const express = require("express");
const app = express();
const path = require("path");
const filepath = path.join(__dirname, "home.html");
const fs = require("fs");
const sever = require("http").createServer((req, res) => {
    fs.readFile(filepath, (err, res) => {
    if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("Internal Server Error");
        return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end();
    });
});
app.get("/", (req, res) => {
    res.sendFile(filepath);
})
// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
