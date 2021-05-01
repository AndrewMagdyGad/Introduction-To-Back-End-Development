const fs = require("fs");

const filePath = process.argv[2];

const cb = (err, data) => {
    let count = 0;
    const charArray = [...data.toString()];
    for (const ch of charArray) {
        if (ch === "\n") {
            count++;
        }
    }

    console.log(count);
};

const buf = fs.readFile(filePath, cb);
