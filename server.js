// server.js

const express = require('express');
const getGitInfo = require('./git-info.js');

const app = express();
const port = 3000; // Change to your desired port

app.get('/get-git-info', (req, res) => {
    const gitInfo = getGitInfo();
    res.json(gitInfo);
});

app.use(express.static('public')); // Serve your HTML and client-side JavaScript

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
