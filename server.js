const express = require('express');
const fs = require('fs');

const app = express();

// Serve static files from the 'src' directory
app.use(express.static('src'));
app.use(express.static('dist'));

// Serve static files from the 'public' directory
app.use(express.static('public'));



// If the requested path is '/', serve 'login.html' by default
app.route('/')
    .get((req, res) => {
        res.sendFile(__dirname + '/public/login.html');
    });

// Route for handling other paths
app.route('*')
    .get((req, res) => {
        const filePath = __dirname + '/public' + req.path;
        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.status(404).send('404 Not Found');
                } else {
                    res.status(500).send('500 Internal Server Error');
                }
            } else {
                res.status(200).send(data);
            }
        });
    });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
