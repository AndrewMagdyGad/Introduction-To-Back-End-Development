const fs = require("fs");

module.exports = (dirPath, extension, cb) => {
    fs.readdir(dirPath, (err, list) => {
        if (err) {
            cb(err);
        } else {
            const result = [];
            for (const item of list) {
                if (item.includes(".")) {
                    const tempArr = item.split(".");
                    if (tempArr[tempArr.length - 1] === extension) {
                        result.push(item);
                    }
                }
            }
            cb(null, result);
        }
    });
};
