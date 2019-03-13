const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(serveStatic((__dirname + "/build")));

const port = process.env.PORT || 5000;
app.listen(port);