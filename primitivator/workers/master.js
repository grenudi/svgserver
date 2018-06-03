const Fs = require("fs");
const {fork} = require("child_worker");
const {join} = require("path");

let workingon = [];
let config = 0;

const setworkers = function (files){
	files.forEach(file=>{
		let filepath = join(__dirname,"../pending/"+file);
		if(!workingon.find(file)){
			const worker = fork("./worker.js");
			worker.send(file, config);
			worker.on("message", (message) => {
				if(message==="done"){
					worker.kill();
					workingon.find(file,(x,i)=>workingon.slice(i,0));//remove file from working list
					Fs.unlink(filepath, (err) => {//remove file from pending folder , cuz it is now in "done" folder
						if (err) throw err;
					});
				}
			});
			workingon.push(file);
		}
	});
};

//watch on directory change
Fs.watch("../pending", (eventType, filename) => {
	switch(eventType){
	case "change":
		Fs.readdir("../pending", (err, files)=>{
			setworkers(files);
		});
		break;
	case "error":
		console.log("watch ERROR!",filename);
		break;
	}
	if (filename) {
		console.log(filename);
		// Prints: <Buffer ...>
	}
});

//watch for config change
Fs.watch("../config-custom.json",(eventType)=>{
	if(eventType==="change"){
		Fs.readFile("../config-custom.json","utf8",(err,data)=>{
			if(err) console.error("ERROR! cannot read config-custom.json");
			else config = JSON.parse(data);
		});
	}
});
