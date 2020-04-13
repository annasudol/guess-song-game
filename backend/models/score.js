/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  date: { type: Date, default: Date.now() },
  points: { type: Number, required: true },
  playlistId: { type: String, required: true, unique: false },
  playlistName: { type: String, required: true },
  playlistImage: { type: String, required: true },
  tracks: [{ artist: String, songUrl: String, externalUrl: String, title: String, img: String }],
  creator: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Score', scoreSchema);
