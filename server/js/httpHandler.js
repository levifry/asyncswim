const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const readline = require("readline");
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background2.jpg');
////////////////////////////////////////////////////////



// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
//   console.log("here is the queue",queue)
// };


module.exports.router = (req, res, next = () => {}) => {
  // console.log("Here is our path:", req.url)
  let path = req.url.split('/') // http://localhost:3001/
  // console.log("Here is our path[0]:", path)
  if (path[0] === undefined) {
    if (req.method === 'GET') {
      res.writeHead(200, headers);
      res.end("undefined request");
    }
  } else if (path[1] === 'swimmer-says') { // http://localhost:3001/swimmer-says
      if (req.method === 'GET') {

        res.writeHead(200, headers);

        // let randomMove;
        // let thisIsTheWay = Math.floor(Math.random() * 5)+1; //will be 1-4
        // switch(thisIsTheWay){
        //   case 1:
        //     res.end('left')
        //     break;
        //   case 2:
        //     res.end('up')
        //     break;
        //   case 3:
        //     res.end('right')
        //     break;
        //   default:
        //     res.end('down')
        // }
        res.end(messageQueue.dequeue())

      }
  } else if (req.url === '/background.jpg')
  {
    // http://localhost:3001/background this will send back an entire imageFile
    if (req.method === "GET") {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          console.log("The path has been changed")
          // module.exports.backgroundImageFile2 = path.join('.', 'background.jpg');
        } else {
          console.log("DEFAULT, SENDING BACKGROUND2.JPG")
          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.write(data, "binary");
          res.end();
        }
      });

      fs.readFile("./background.jpg", (err, data) => {
        if (err) {
          console.log("BAD, SENDING 404")
          res.writeHead(404);
        } else {
          console.log("DEFAULT, SENDING BACKGROUND2.JPG")
          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.write(data, "binary");
        }

        res.end();
      });

      // 1. This code reads a file
      // 2. If the file is not found, it reads a different file
      // 3. If the second file is not found, it sends a response to the client that says "404"
      // 4. If the second file is found, it sends a response to the client that says "200" and sends the image data
      // 5
    }
    if (req.method === 'POST') {
      console.log("Here art thou request", req)

      let buffer1 = Buffer.alloc(0);

      req.on('data', (chunk) => {
        buffer1 = Buffer.concat([buffer1, chunk])
      });

      req.on('end', () => {
        let newImage = multipart.getFile(buffer1);
        console.log("NEW IMAGE", newImage);
        fs.writeFile('background2.jpg', newImage.data, err => {
          res.writeHead(err ? 404 : 200, headers);
          res.end()
        });
        next(); //comment
      });
    }
  }
   else if (req.url === '/file-changer') { // http://localhost:3001/file-changer this will accept an entire imageFile as a jpg
    console.log("File changer called")

  } else {
    if (req.method === 'GET') {
      res.writeHead(200, headers);
      res.end("request handled, nothing to do");
    }

  }
  // console.log("path,",path)
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  next(); // invoke next() at the end of a request to help with testing!
};
//next step how to utilize this to our advantage I.E. how can we send back a command to the front end to make the swimmers swim like theyve never swimed before.
