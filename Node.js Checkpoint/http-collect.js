const http = require("http");

http.get(process.argv[2], (response) => {
    const buffer = [];
    response.on("data", (data) => {
        buffer.push(data.toString());
    });
    response.on("error", (err) => {
        console.error(err);
    });
    response.on("end", () => {
        const message = buffer.join("");
        console.log(message.length);
        console.log(message);
    });
});
