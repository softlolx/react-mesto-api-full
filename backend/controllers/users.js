const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const UsedEmailError = require('../utils/errors/usedEmailError');
const { JWT_SECRET } = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('token', token, { maxAge: 3600 * 24 * 7, httpOnly: true, sameSite: true })
        .send({ email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMyProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = async (_, res, next) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      throw new NotFoundError('Такого пользователя нет и не было!');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Что-то не так с id пользователя.'));
      return;
    }
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, //
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, //
      about,
      avatar,
      email,
      password: passwordHash,
    });
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new UsedEmailError('Пользователь с данным email уже существует'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const data = await User.findByIdAndUpdate(
      owner,
      { name: req.body.name, about: req.body.about },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const data = await User.findByIdAndUpdate(
      owner,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
