const fs = require("fs");

const dirPath = process.argv[2];
const extexsion = process.argv[3];

fs.readdir(dirPath, (err, list) => {
    if (err) {
        console.error(err);
    } else {
        for (const item of list) {
            if (item.includes(".")) {
                const tempArr = item.split(".");
                if (tempArr[tempArr.length - 1] === extexsion) {
                    console.log(item);
                }
            }
        }
    }
});
