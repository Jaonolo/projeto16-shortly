import { Router } from 'express';

import { postUrlController, getUrlController, openUrlController, deleteUrlController } from '../controllers/urls.js'

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', postUrlController)
urlsRouter.get('/urls/:id', getUrlController)
urlsRouter.get('/urls/open/:shortUrl', openUrlController)
urlsRouter.delete('/urls/:id', deleteUrlController)

export default urlsRouter