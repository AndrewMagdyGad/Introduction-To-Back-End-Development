const http = require("http");

const server = http.createServer((req, res) => {
    const buffer = [];
    req.on("data", (data) => {
        buffer.push(data.toString());
    });

    req.on("end", () => {
        res.end(buffer.join("").toUpperCase());
    });
});

server.listen(process.argv[2]);
