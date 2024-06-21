// user.js (Mongoose model)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Middlename: String,
  Lastname: String,
  Email: String,
  Password: String,
  Address: String,
  Phone: String,
  BloodGroup: String,
  Gender: String,
  City: String,
});

const User = mongoose.model('User', userSchema);

export default User;
