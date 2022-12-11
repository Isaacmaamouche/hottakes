import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.debug("Connection to MongoDB successful!"))
    .catch((error) =>
      console.debug("Connection to MongoDB has failed: ", error)
    );
};
