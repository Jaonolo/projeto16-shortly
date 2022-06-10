import { Router } from 'express';

import { getUserController,  getRankingController } from '../controllers/users.js'
import userValidator from '../middlewares/userValidator.js';

const usersRouter = Router()

usersRouter.get('/users/:id', userValidator, getUserController)
usersRouter.get('/ranking', getRankingController)

export default usersRouter