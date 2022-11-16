const cardRouter = require('express').Router();

const {
  getCards, //
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCardId, validateCardData } = require('../utils/validators/cardValidator');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCardData, createCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
