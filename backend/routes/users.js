const userRouter = require('express').Router();

const {
  getUsers, //
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMyProfile,
} = require('../controllers/users');

const {
  validateUserId,
  validateUserInfo,
  validateUserAvatar,
} = require('../utils/validators/userValidator');

userRouter.get('/', getUsers);
userRouter.get('/me', getMyProfile);
userRouter.get('/:userId', validateUserId, getUserById);
userRouter.patch('/me', validateUserInfo, updateUserInfo);
userRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRouter;
