const net = require("net");

const server = net.createServer((socket) => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month =
        date.getMonth() + 1 > 9
            ? String(date.getMonth() + 1)
            : "0" + String(date.getMonth() + 1);
    const day =
        date.getDate() > 9
            ? String(date.getDate())
            : "0" + String(date.getDate());
    const hours =
        date.getHours() > 9
            ? String(date.getHours())
            : "0" + String(date.getHours());
    const minutes =
        date.getMinutes() > 9
            ? String(date.getMinutes())
            : "0" + String(date.getMinutes());
    socket.end(`${year}-${month}-${day} ${hours}:${minutes}\n`);
});

server.listen(process.argv[2]);
