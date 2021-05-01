const http = require("http");

const parseTime = (time) => {
    return {
        hour: new Date(time).getHours(),
        minute: new Date(time).getMinutes(),
        second: new Date(time).getSeconds(),
    };
};

const unixTime = (time) => {
    return { unixtime: new Date(time).getTime() };
};

const server = http.createServer((req, res) => {
    const parsedURL = new URL(req.url, "http://www.example.com");
    const value = parsedURL.searchParams.get("iso");
    let result;
    switch (parsedURL.pathname) {
        case "/api/parsetime":
            result = parseTime(value);
            break;

        case "/api/unixtime":
            result = unixTime(value);
            break;
        default:
            res.end();
    }

    if (result) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(process.argv[2]);
