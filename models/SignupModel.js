const mongoose = require('mongoose');

const SignupSchema = mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: true,
      trim: true
    },
    Lastname: {
      type: String,
      required: true,
      trim: true
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    Password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Signup = mongoose.model('Signup', SignupSchema);

module.exports = Signup;
