/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  scores: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Score' }],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
