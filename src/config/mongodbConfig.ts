import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    mongoose.connection.on("error", (error: Error) => console.log(error));
    console.log("Connected to db successfully");
  } catch (error) {
    console.error(`${error} occured while connecting to mongodb`);
  }
};

export default mongoConnection;
