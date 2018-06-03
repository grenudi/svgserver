const Express = require("express");
const Uploader = require("express-fileupload");
const Path = require("path");
const app = Express();

const port = 8080;

const start = function(){
	return new Promise((ok,notok)=>{
		app.use(Uploader());

		app.post("/upload",(req,res)=>{
			if (!req.files)
				return res.status(400).send("No files were uploaded.");

			// The name of the input field (i.e. "file") is used to retrieve the uploaded file
			let file = req.files.sampleFile;

			// Use the mv() method to place the file somewhere on your server
			file.mv(Path.join(__dirname,"../primitivator/pending/")+file.name, function(err) {
				if (err)
					return res.status(500).send(err);
				res.sendFile(Path.join(__dirname,"../primitivator/pending/")+file.name);
				//TODO start coversion
			});
		});

		app.listen(port);
		ok(port);
	});
};

module.exports = {
	start
};
