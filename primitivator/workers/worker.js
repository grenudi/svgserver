const app = require("../app.js");
const Fs = require("fs");
const {join} = require("path");
const config = require("../config-custom.json");

function convert(file){
	return new Promise((ok)=>{
		const path = join(__dirname,"./pending/"+file);
		app.convert(file);
		// .then(svg=>{
		// 	Fs.writeFile(join(__dirname,"../done/"+file.split(".")[0]+".svg"), svg ,(err)=>{
		// 		if(err) console.error("ERROR! cannot write SVG");
		// 		ok("done");
		// 	});
		// })
		// .catch((err)=>console.log("ERROR! app.convert\n",err));
	});
}
convert("Tulips.jpg");
// receive message from master process
process.on("message",  (file,config) => {
	convert(file,config).then(msg=>process.send(msg));
});
