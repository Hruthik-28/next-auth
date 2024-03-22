import mongoose from "mongoose";

export default async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully!!!");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error", err);
            process.exit(1);
        });
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}
