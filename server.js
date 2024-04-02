// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    // Parse the requested URL
    const parsedUrl = url.parse(req.url, true);
    let filePath = './public' + parsedUrl.pathname;

    // If the requested path is '/', serve 'index.html' by default
    if (filePath === './public') {
        filePath = './public/login.html';
    }

    // Read the file and serve it
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data, 'utf-8');
        }
    });
});


// http start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



