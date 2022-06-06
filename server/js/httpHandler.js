const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};


module.exports.router = (req, res, next = ()=>{}) => {
  console.log("Here is our path:", req.url)
  let path = req.url.split('/')
  console.log("Here is our path[0]:", path)
  if (path[0] === undefined) {
    if (req.method === 'GET') {
      res.writeHead(200, headers);
      res.end("undefined request");
    }
  } else
   if (path[1] === 'swimmer-says') {
    if (req.method === 'GET') {
      let randomMove;
      res.writeHead(200, headers);
      let thisIsTheWay = Math.floor(Math.random() * 5)+1; //will be 1-4
      switch(thisIsTheWay){
        case 1:
          res.end('left')
          break;
        case 2:
          res.end('up')
          break;
        case 3:
          res.end('right')
          break;
        default:
          res.end('down')
      }

    }
  } else {
    if (req.method === 'GET') {
      res.writeHead(200, headers);
      res.end("request handled, nothing to do");
    }
  }

  // console.log("path,",path)
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  next(); // invoke next() at the end of a request to help with testing!
};
//next step how to utilize this to our advantage I.E. how can we send back a command to the front end to make the swimmers swim like theyve never swimed before.
