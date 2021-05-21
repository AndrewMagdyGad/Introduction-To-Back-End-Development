const mongoose = require("mongoose");
const PersonModel = require("./Model/person");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 1 - Create and Save a Record of a Model
const person = new PersonModel({
    name: "Ahmed Ali",
    age: 26,
    favoriteFoods: ["Hamburger", "Vegetables", "Fresh Fruits", "burritos"],
});
person.save((err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});

// 2 - Create Many Records with model.create()
PersonModel.create([
    {
        name: "Mustafa Barakat",
        age: 22,
        favoriteFoods: ["Hamburger", "Fresh Fruits", "burritos"],
    },
    {
        name: "Bassem Tamer",
        age: 28,
        favoriteFoods: ["Hamburger", "Vegetables", "burritos"],
    },
])
    .then((data) => {
        console.log("Model.create() response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 3 - Use model.find() to Search Your Database
PersonModel.find({ name: /bassem/i })
    .then((data) => {
        console.log("Model.find() response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 4 - Use model.findOne() to Return a Single Matching Document from Your Database
PersonModel.findOne({ favoriteFoods: "Vegetables" })
    .then((data) => {
        console.log("Model.findOne() response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 5 - Use model.findById() to Search Your Database By _id
PersonModel.findById("person-id")
    .then((data) => {
        console.log("Model.findById() response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 6 - Perform Classic Updates by Running Find, Edit, then Save
PersonModel.findById("person-id")
    .then((data) => {
        const favoriteFoods = data.favoriteFoods;
        console.log(favoriteFoods);
        if (!favoriteFoods.includes("Hamburger")) {
            favoriteFoods.push("Hamburger");
            PersonModel.findByIdAndUpdate(
                "person-id",
                { favoriteFoods },
                { new: true, useFindAndModify: false }
            )
                .then((data) => {
                    console.log("Model.findByIdAndUpdate response: ", data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    })
    .catch((err) => {
        console.error(err);
    });

// 7 - Perform New Updates on a Document Using model.findOneAndUpdate()
PersonModel.findOneAndUpdate(
    { name: "Ahmed Ali" },
    { age: 20 },
    { new: true, useFindAndModify: false }
)
    .then((data) => {
        console.log("Model.findOneAndUpdate response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 8 - Delete One Document Using model.findByIdAndRemove
PersonModel.findByIdAndRemove("person-id", {
    useFindAndModify: false,
})
    .then((data) => {
        console.log("Model.findByIdAndRemove response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 9 - MongoDB and Mongoose - Delete Many Documents with model.remove()
// actually we should use Model.deleteMany()
PersonModel.deleteMany({ name: /barakat/i })
    .then((data) => {
        console.log("Model.remove response: ", data);
    })
    .catch((err) => {
        console.error(err);
    });

// 10 - Chain Search Query Helpers to Narrow Search Results
PersonModel.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("name favoriteFoods")
    .exec(function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });
