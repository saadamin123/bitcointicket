const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bitCoinAccountAddress: {
    type: String,
    required: true,
  },
});

let Users = mongoose.model("users", userSchema); // mongoose.models.Shop ||
module.exports = Users;
