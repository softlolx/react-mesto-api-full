const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { validateLoginData, validateRegisterData } = require('../utils/validators/userValidator');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Минус сервер');
  }, 0);
});

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, createUser);
router.get('/signout', (_, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли разлогинились' });
});

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(() => {
  throw new NotFoundError('Кажется вы не туда попали. Здесь ничего нет');
});

module.exports = router;
