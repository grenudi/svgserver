const server = require("./server/server.js");

server.start().then((url)=>console.log("We rolling on: http://"+url));
