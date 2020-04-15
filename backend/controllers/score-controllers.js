/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Score = require('../models/score');
const mongoose = require('mongoose');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getScoreByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithScores;
  try {
    userWithScores = await User.findOne({ userId }).populate('scores');
  } catch (err) {
    const error = new HttpError('Fetching scores failed, please try again later.', 500);
    return next(error);
  }

  if (!userWithScores || userWithScores.scores.length === 0) {
    return next(new HttpError('No Scores', 404));
  }

  res.json({ scores: userWithScores.scores.map(score => score.toObject({ getters: true })) });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const recordScore = async (req, res, next) => {
  const { userId, points, playlistId } = req.body;
  console.log(userId, points, playlistId)

  const createdScore = new Score({ points, playlistId, creator: userId });

  let user;
  try {
    user = await User.findOne({ userId });
  } catch (err) {
    const error = new HttpError('Creating score failed, please try again.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  let scoreDB;
  try {
    coreDB = await Score.findOne({ playlistId });
    const userScores = await User.findOne({ userId }).populate('scores');
    scoreDB = userScores['scores'].filter(data => data.playlistId === playlistId);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update score.', 500);
    return next(error);
  }
  if (scoreDB.length === 0) {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdScore.save({ session: sess });
      user.scores.push(createdScore);
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(err, 500);
      return next(error);
    }

    res.status(201).json({ scores: createdScore });
  } else {
    console.log('There is already a record with that playlistId');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const updateScore = async (req, res, next) => {
  const { playlistId, score } = req.body;

  let scoreDB;
  try {
    scoreDB = await Score.findOne({ playlistId });
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update score.', 500);
    return next(error);
  }

  scoreDB.points = score;
  scoreDB.date = Date.now();

  try {
    await scoreDB.save();
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update score.', 500);
    return next(error);
  }

  res.status(200).json({ score: scoreDB.toObject({ getters: true }) });
};

exports.recordScore = recordScore;
exports.getScoreByUserId = getScoreByUserId;
exports.updateScore = updateScore;
