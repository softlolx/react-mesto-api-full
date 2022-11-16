const Card = require('../models/card');

const BadRequestError = require('../utils/errors/badRequestError');
const ForbiddenError = require('../utils/errors/forbiddenError');
const NotFoundError = require('../utils/errors/notFoundError');

module.exports.getCards = async (_, res, next) => {
  try {
    const data = await Card.find({});
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ name, link, owner });
    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
      return;
    }
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Такой карточки не существует');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Можно удалять только свои карточки. А эта не ваша.');
    }
    await card.remove();
    res.send({ message: 'Карточка удалена.' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Что-то не так с id карточки'));
      return;
    }
    next(err);
  }
};

const handleLikeCard = async (req, res, next, options) => {
  const action = options.isLiked ? '$pull' : '$addToSet';
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { [action]: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      throw new NotFoundError('Не смогли найти такую карточку');
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('что-то не так с id карточки'));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = (req, res, next) => {
  handleLikeCard(req, res, next, { isLiked: false });
};

module.exports.dislikeCard = (req, res, next) => {
  handleLikeCard(req, res, next, { isLiked: true });
};
