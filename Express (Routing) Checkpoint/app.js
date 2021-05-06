var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var ourServicesRouter = require("./routes/our-services");
var contactUsRouter = require("./routes/contact-us");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    const current = new Date();
    const day = current.getDay();
    const hours = current.getHours();
    console.log(day, hours);
    if (day === 6 || day === 0 || hours < 9 || hours > 17) {
        res.send(
            "The web application is only available during working hours (Monday to Friday,  from 9 to 17)."
        );
    }
    next();
});

app.use("/", indexRouter);
app.use("/our-services", ourServicesRouter);
app.use("/contact-us", contactUsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
