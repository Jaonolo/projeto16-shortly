import { Router } from 'express';

import { getUserController,  getRankingController } from '../controllers/users.js'

const usersRouter = Router()

usersRouter.get('/users/:id', getUserController)
usersRouter.get('/ranking', getRankingController)

export default usersRouter