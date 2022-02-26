import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail, // not invoking function here
      message: "Please provide a valid email",
    },
    unique: true, // not a validator, done in controller as well (match/regex)
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    // select at query level, prevents password to be returned with User obj
    // but it still returns password with .create
    select: false,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
    default: "lastName",
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "my city",
  },
});

// middleware(pre-hook) get triggered before user is saved
// but not every method is going to trigger it
// this.modifiedPaths() returns changed values only
// fix not modifying the password means we are just updating user
// the password doesnt need to be rehashed!
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// invoke it in controller
// will return json web token from here
UserSchema.methods.createJWT = function () {
  console.log(this);
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Compares password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Creates Users Collection in Mongodb
export default mongoose.model("User", UserSchema);
