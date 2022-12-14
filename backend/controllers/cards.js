const Card = require('../models/card');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCards = async (req, res, next) => {
  const {
    name, link,
  } = req.body;
  const owner = req.user._id;
  try {
    const cards = await Card({
      name, link, owner,
    }).save();
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCards = async (req, res, next) => {
  const Id = req.params.cardId;
  try {
    const CardId = await Card.findById(Id);
    if (CardId) {
      if (req.user._id === CardId.owner._id.toString()) {
        await Card.remove(CardId);
        res.status(200).send({ CardId });
      } else {
        throw new ForbiddenError('Недостаточно прав');
      }
    } else {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = async (req, res, next) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndUpdate(CardId, { $addToSet: { likes: req.user._id } }, {
      new: true,
    });
    if (!cards) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  const CardId = req.params.cardId;
  try {
    const cards = await Card.findByIdAndUpdate(CardId, { $pull: { likes: req.user._id } }, {
      new: true,
    });
    if (!cards) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
