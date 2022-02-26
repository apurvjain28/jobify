import mongoose from "mongoose";

// return a promise
// after v6 >> no need to pass deprecated values
const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
