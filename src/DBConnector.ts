import mongoose from "mongoose";
import dbconfig from "./dbconfig"

export class DBConnector {

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(dbconfig.connectionString)
            console.log("Database connected")
        } catch (err) {
            console.log("Error in database operation", err);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log("Database disconnected");
        } catch (err) {
            console.log("Error while doing database operation", err);
        }
    }
}
