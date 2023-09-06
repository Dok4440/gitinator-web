// server.js

const express = require('express');
const fs = require('fs');
const getGitInfo = require('./git-info.js');

const app = express();
const port = 3000;

// Middleware to log visitor information
app.use((req, res, next) => {
    // Get client information
    const clientInfo = {
        ipAddress: req.ip, // Get the IP address of the client
        userAgent: req.headers['user-agent'], // Get the User-Agent header
        timestamp: new Date().toISOString(), // Get the current timestamp
        method: req.method, // Get the HTTP request method (GET, POST, etc.)
        path: req.path, // Get the requested path
    };

    // Log client information to a file (you can customize the log format)
    const logMessage = JSON.stringify(clientInfo);
    fs.appendFile('access.log', logMessage + '\n', (err) => {
        if (err) {
            console.error('Error writing to access.log:', err);
        }
    });

    next();
});

app.get('/pgp', (req, res) => {
    res.redirect('https://keyserver.ubuntu.com/pks/lookup?op=vindex&fingerprint=on&exact=on&search=0xc43f920fb48c42808a8d2e27ad186b5e5bbf07db');
});

app.get('/get-git-info', (req, res) => {
    const gitInfo = getGitInfo();
    res.json(gitInfo);
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
