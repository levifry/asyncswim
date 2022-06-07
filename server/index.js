const keypressHandler = require('./js/keypressHandler');
const messageQueue = require('./js/messageQueue');

keypressHandler.initialize(messageQueue.enqueue); // modify init function
//module.exports.enqueue
const httpHandler = require('./js/httpHandler');

// init httpHandler

const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3001;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
