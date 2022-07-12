import mongoose from "mongoose";
import config from "../config";
import Farm from "../models/Farm";
import Farmer from "../models/Farmer";
import Feed from "../models/Feed";
import Fruit from "../models/Fruit";
import Plant from "../models/Plant";
import Reservation from "../models/Reservation";
import Tour from "../models/Tour";
import User from "../models/User";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        mongoose.set("autoCreate", true);

        console.log("Mongoose Connected ...");

        User.createCollection().then(function (collection) {
            console.log("User Collection is created!");
        });

        Fruit.createCollection().then(function (collection) {
            console.log("Fruit Collection is created!");
        });

        Farmer.createCollection().then(function (collection) {
            console.log("Farmer Collection is created!");
        });

        Farm.createCollection().then(function (collection) {
            console.log("Farm Collection is created!");
        });

        Plant.createCollection().then(function (collection) {
            console.log("Plant Collection is created!");
        });

        Feed.createCollection().then(function (collection) {
            console.log("Feed Collection is created!");
        });

        Reservation.createCollection().then(function (collection) {
            console.log("Reservation Collection is created!");
        });

        Tour.createCollection().then(function (collection) {
            console.log("Tour Collection is created!");
        });
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
