import { Router } from 'express';

import { signupController, signinController } from '../controllers/auth.js'
import schemaValidator from '../middlewares/schemaValidator.js';

const authRouter = Router()

authRouter.post('/signup', schemaValidator('signup'), signupController)
authRouter.post('/signin', schemaValidator('signin'), signinController)

export default authRouter