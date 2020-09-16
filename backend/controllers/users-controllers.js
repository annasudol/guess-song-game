/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HttpError = require('../models/http-error');
const User = require('../models/user');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const login = async (req, res, next) => {
  const {
    name,
    id
  } = req.body;

  let existingUser;

  const createdUser = new User({
    name,
    userId: id,
    scores: [],
  });

  try {
    existingUser = await User.findOne({
      userId: id
    });
    if (!existingUser) {
      await createdUser.save();
    }
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again later.', 500);
    return next(error);
  }

  if (!existingUser) {
    res.status(201).json({
      user: createdUser.toObject({
        getters: true
      })
    });
  }

  res.json({
    message: 'Logged in!',
    user: existingUser.toObject({
      getters: true
    }),
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500);
    return next(error);
  }

  res.json({
    users: users.map(user => user.toObject({
      getters: true
    }))
  });
};

exports.login = login;
exports.getUsers = getUsers;