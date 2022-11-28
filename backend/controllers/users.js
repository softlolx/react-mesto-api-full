const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const UsedEmailError = require('../utils/errors/usedEmailError');
const { getJWT } = require('../utils/utils');

const createTokenById = (id) => {
  const secretKey = getJWT();
  return jwt.sign({ _id: id }, secretKey, { expiresIn: '7d' });
};

const sendCookie = (res, { _id: id, email }) => {
  const token = createTokenById(id);
  return res
    .cookie('token', token, {
      maxAge: 604800000,
      httpOnly: true,
      sameSite: true,
    })
    .send({ email });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUser(email, password)
    .then((user) => {
      sendCookie(res, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (_, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли разлогинились' });
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
    _id,
    password,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, //
      about,
      avatar,
      email,
      _id,
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
