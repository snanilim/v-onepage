const http = require('http');
const app = require('./app');
const port = 4000;
http.createServer(app).listen(port, () => {
    console.log('VTracker API start on port %o', `${port}`);
});
