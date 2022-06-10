import signin from "../schemas/signin.js"
import signup from "../schemas/signup.js"
import urls from "../schemas/urls.js"

const chooseSchema = {signin,signup, urls}

export default schemaName => ((req, res, next) => {
    const schema = chooseSchema[schemaName]

    const errors = schema.validate(req.body).error
    if(errors) return res.status(402).send(errors)

    next()
})