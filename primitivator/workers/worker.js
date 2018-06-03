const app = require("../app.js");
const Fs = require("fs");
const {join} = require("path");

function convert(file,config){
	return new Promise((ok)=>{
		const path = join(__dirname,"../pending/"+file);
		app.convert(path,config).then(svg=>{
			Fs.writeFile(join(__dirname,"../done/"+file.split(".")[0]+".svg"), svg ,(err)=>{
				if(err) console.error("ERROR! cannot write SVG");
				ok("done");
			});
		});
	});
}
// receive message from master process
process.on("message",  (file,config) => {
	convert(file,config).then(msg=>process.send(msg));
});
