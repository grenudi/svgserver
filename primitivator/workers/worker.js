const application = require("../app.js");
const Fs = require("fs");
const {join} = require("path");

async function convert(path,config){
  convert(path,config).then(svg=>{
    Fs.writeFile(join(__dirname,"../done/"+file.split('.')[0]+".svg"), svg);
  });
}
// receive message from master process
process.on('message', async (file,config) => {
  await convert(file,config);

  // send response to master process
  process.send("done");
});
