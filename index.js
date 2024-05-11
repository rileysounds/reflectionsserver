var express = require('express');
var fs = require("node:fs");
var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use("/static", express.static("./static"));

app.get("/", (req, res, next) => {
    fs.readdir("./static", { withFileTypes: true }, (err, files) => {
        if (err) return next(err);

        const links = files
            .filter((f) => f.isFile())
            .map((f) => `<li><a href="/static/${encodeURIComponent(f.name)}">${f.name}</a></li>`);

        res.send(`<!DOCTYPE html>
<html>
<head>
	<title>File list</title>
</head>
<body>
	<ul>
		${links.join("\n\t\t")}
	</ul>
</body>`);
    });
});


app.get("/audio-list", (req, res, next) => {
    fs.readdir("./static", { withFileTypes: true }, (err, files) => {
        if (err) return next(err);

        const audioList = files
            .filter((f) => f.isFile() && f.name.endsWith('.mp3'))
            .map((f) => {
                return {
                    name: f.name,
                    url: `/static/${encodeURIComponent(f.name)}`
                };
            });

        res.json(audioList);
    });
});





app.listen(port, hostname, () => {
	console.log(`server running at http://${hostname}:${port}/`);
});

