const express = require("express");
const app = express();
const port = 3000;

const appGet = (path,file) => {
	app.get(path, (req,res) => {
		res.sendFile("./src/"+file, { root: __dirname });
	});
}

appGet("/","index.html");
appGet("/bs","css/bootstrap.min.css");
appGet("/style","css/style.css");
appGet("/app","js/app.js");
appGet("/angularjs","js/angular.min.js");

app.listen(3000, () => {
	console.log("Server aktif");
	console.log(`Menunggu permintaan (request) dari 'localhost:${port}' ...`);
});