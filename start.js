const http = require('http');
const app = require('./app');

const httpServer = http.createServer(app);
// const httpPort = process.env.NODE_ENV === 'production' ? 80 : 8000;
const httpPort = 2323;
httpServer.listen(httpPort);
console.log(`MasterMind Express server listening on port ${httpPort}`);
