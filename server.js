// server.js

const express = require('express');
const getGitInfo = require('./git-info.js');

const app = express();
const port = 3000;


// Middleware to check for HTTP requests and WWW subdomain
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        // Redirect HTTP to HTTPS
        return res.redirect(`https://${req.hostname}${req.url}`);
    }

    if (req.hostname.startsWith('www.')) {
        // Redirect WWW to non-WWW
        const newHostname = req.hostname.slice(4); // Remove 'www.' prefix
        return res.redirect(`https://${newHostname}${req.url}`);
    }

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
