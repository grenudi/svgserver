let que = [];//object's array
const randstr = require("randomstring");
const config = require("./config.js");

const upload = (req,res)=>{
	if (!req.files)
		return res.status(400).send("No files were uploaded.");
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let file = req.files.sampleFile;
	// Use the mv() method to place the file somewhere on your server
	file.mv(Path.join(__dirname,"../primitivator/pending/")+file.name, function(err) {
		if (err)
			return res.status(500).send(err);
		const token = randstr.generate(10);
		que.push({token,file:file.name});
		res.send(config.domain+"/?secret="+token);
	});
};

const download = (req,res)=>{
	const file = que.find(x=>x.token === req.query.secret);
	if(!file) res.statusCode(404).send("i don't have your file");
	else res.sendFile("../../primitivator/done/"+file.name);
};

module.exports = {
	upload,
	download
};
