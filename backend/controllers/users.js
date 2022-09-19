const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/name');
const { BadRequestError } = require('../errors/BadRequestError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getThisUser = async (req, res, next) => {
  try {
    const id = req.user;
    const users = await User.findById(id);
    if (!users) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const id = req.params.userId;
  try {
    const users = await User.findById(id);
    if (!users) {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
};

module.exports.createUsers = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const users = await User({
      name, about, avatar, email, password: hashedPassword,
    }).save();
    res.status(200).send({
      name: users.name,
      about: users.about,
      avatar: users.avatar,
      email: users.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    if (err.name === 'MongoServerError') {
      next(new ConflictError('Пользователь с таким электнонным адресом уже зарегистрирован'));
    }
    next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const UserId = req.user._id;
    const users = await User.findByIdAndUpdate(UserId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  const UserId = req.user._id;
  try {
    const users = await User.findByIdAndUpdate(UserId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    if (err.name === 'CastError') {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const users = await User.findOne({ email }).select('+password');
    if (!users) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const match = await bcrypt.compare(password, users.password);
    if (!match) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: users._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    res.status(200).send({ token });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    }
    next(err);
  }
};
