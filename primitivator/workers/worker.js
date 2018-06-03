const application = require("../app.js");

async function convert(path,config){
  convert(path,config);
}
// receive message from master process
process.on('message', async (file,config) => {
  const numberOfMailsSend = await convert(file,config);

  // send response to master process
  process.send("done");
});
