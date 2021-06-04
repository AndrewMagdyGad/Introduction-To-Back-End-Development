require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const data = await UserModel.find({});
    res.send(data);
});

app.post("/user", async (req, res) => {
    const body = req.body;
    const newUser = new UserModel({
        name: body.name,
        email: body.email,
        age: body.age,
    });
    const error = newUser.validateSync();
    if (error) {
        res.statusCode = 400;
        res.send(error);
    } else {
        const response = await newUser.save().catch((e) => console.error(e));
        res.send(response);
    }
});

app.put("/user/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    let error;
    const data = await UserModel.findByIdAndUpdate(
        id,
        { ...body },
        { runValidators: true, new: true, useFindAndModify: false }
    ).catch((e) => {
        error = e;
    });
    if (!data) {
        res.statusCode = 400;
        res.send(error);
    } else {
        res.send(data);
    }
});

app.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    let error;
    const data = await UserModel.findByIdAndDelete(id).catch((e) => {
        error = e;
    });

    if (error) {
        res.statusCode = 400;
        res.send(error);
    } else {
        res.send(data);
    }
});

app.listen(3000, () => console.log("Server is running 🚀"));
