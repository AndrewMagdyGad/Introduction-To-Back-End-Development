const fs = require("fs");

const filePath = process.argv[2];

const buf = fs.readFileSync(filePath);

let count = 0;
const charArray = [...buf.toString()];
for (const ch of charArray) {
    if (ch === "\n") {
        count++;
    }
}

console.log(count);
