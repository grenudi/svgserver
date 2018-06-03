const Fs = require("fs");
const {fork} = require("child_process");
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
Fs.watch(join(__dirname,"../pending"), (eventType, filename) => {
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
	console.log("Emmited: pending");
});

//watch for config change
Fs.watch(join(__dirname,"../config-custom.json"),(eventType)=>{
	if(eventType==="change"){
		Fs.readFile(join(__dirname,"../config-custom.json"),"utf8",(err,data)=>{
			if(err) console.error("ERROR! cannot read config-custom.json\n",err);
			else config = JSON.parse(data);
		});
	}
	console.log("Emmited: config-custom.js");
});
