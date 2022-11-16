const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { validateLoginData, validateRegisterData } = require('../utils/validators/userValidator');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(() => {
  throw new NotFoundError('Кажется вы не туда попали. Здесь ничего нет');
});

module.exports = router;
