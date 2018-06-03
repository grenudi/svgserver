const updown = require("./routes/updown.js");
const parsefile = require("express-fileupload");

module.exports = (app)=>{
	return new Promise((ok)=>{
		app.post("/upload",parsefile(),updown.upload);
		app.get("/download",updown.download);
		app.get("/",(req,res)=>{
			res.sendFile("./test.html");
		});
		ok(app);
	});
};
