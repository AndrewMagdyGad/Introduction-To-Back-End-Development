const filterFun = require("./mymodule");

filterFun(process.argv[2], process.argv[3], (err, data) => {
    if (err) {
        console.error(err);
    } else {
        data.forEach((item) => {
            console.log(item);
        });
    }
});
