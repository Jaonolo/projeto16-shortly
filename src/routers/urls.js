import { Router } from 'express';

import { postUrlController, getUrlController, openUrlController, deleteUrlController } from '../controllers/urls.js'
import schemaValidator from '../middlewares/schemaValidator.js';
import userValidator from '../middlewares/userValidator.js';

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', schemaValidator('urls'), userValidator, postUrlController)
urlsRouter.get('/urls/:id', getUrlController)
urlsRouter.get('/urls/open/:shortUrl', openUrlController)
urlsRouter.delete('/urls/:id', userValidator, deleteUrlController)

export default urlsRouter