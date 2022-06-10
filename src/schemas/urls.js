import joi from 'joi'

export default joi.object({
    url: joi.string().uri().required(),
})