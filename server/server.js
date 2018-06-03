const Express = require("express");
const app = Express();

const config = require("./config.js");
const routes = require("./routes.js");

const start = function(){
	return new Promise((ok,notok)=>{
		routes(app).then(app=>app.listen(config.port,()=>ok(config.domain+":"+config.port)));
	});
};

module.exports = {
	start
};
