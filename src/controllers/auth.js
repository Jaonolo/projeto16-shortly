import client from '../db/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const signupController = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const hash = bcrypt.hashSync(password, 10)

        const query =  await client.query('insert into users (name, email, password) values ($1, $2, $3)', [
            name,
            email,
            hash
        ]);
        return res.sendStatus(201)

    } catch (error) {
        const convertion = {
            "23505": 409 
        }

        return res.status(convertion[error.code] || 500).send()
    }
}

export const signinController = async (req, res) => {
    try {
        const {email, password} = req.body

        const checkQuery = (await client.query('select * from users u where u.email=$1', [email])).rows
        const user = checkQuery[0]

        if(checkQuery.length === 0 || !(bcrypt.compareSync(password, user.password))) return res.sendStatus(401)

        const token = uuid()

        const addQuery =  await client.query('insert into sessions ("authToken", "userId") values ($1, $2)', [
            token,
            user.id
        ]);
        return res.status(200).send(token)

    } catch (error) { return res.status(500).send(error) }
}