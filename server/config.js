const local = {
	port:8080,
	domain: "localhost"
};

const heroku = {
	port: process.env.port,
	domain: "svgserver.herokuapp.com"
};

module.exports = local;
