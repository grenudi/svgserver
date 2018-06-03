const updown = require("./routes/updown.js");
const parsefile = require("express-fileupload");
const {join} = require("path");

module.exports = (app)=>{
	return new Promise((ok)=>{
		app.post("/upload",parsefile(),updown.upload);
		app.get("/download",updown.download);
		app.get("/",(req,res)=>{
			res.sendFile(join(__dirname,"./test.html"));
		});
		ok(app);
	});
};
