import client from '../db/db.js'
import { nanoid } from 'nanoid';

export const postUrlController = async (req, res) => {
    try {
        const {url} = req.body

        //const {userId} = res.locals
        const userId = 2

        const shortUrl = nanoid()

        const query = await client.query('insert into urls (url, "shortUrl", "userId") values ($1, $2, $3)', [
            url,
            shortUrl,
            userId
        ]);
        return res.status(201).send({ shortUrl })

    } catch (error) {
        const convertion = {
            "23505": 409,
            "23503": 404
        }
        console.error(error)
        return res.status(convertion[error.code] || 500).send(error)
    }
}

export const getUrlController = async (req, res) => {
    try {
        const {id} = req.params

        const query = (await client.query('select * from urls u where u.id=$1', [id])).rows;
        if (query.length === 0) return res.sendStatus(404)

        const {shortUrl, url} = query[0]

        return res.status(200).send({ id, shortUrl, url })

    } catch (error) {
        const convertion = {
            "23505": 409,
            "23503": 404
        }
        console.error(error)
        return res.status(convertion[error.code] || 500).send(error)
    }
}

export const openUrlController = async (req, res) => {
    try {
        const {shortUrl} = req.params

        const checkQuery = (await client.query('select * from urls u where u."shortUrl"=$1', [shortUrl])).rows;
        if (checkQuery.length === 0) return res.sendStatus(404)

        const {url, viewCount} = checkQuery[0]

        const updateQuery = await client.query('update urls u set "viewCount" = $1 where u."shortUrl"=$2', [1*viewCount + 1, shortUrl])

        return res.redirect(url)

    } catch (error) {
        const convertion = {
            "23505": 409,
            "23503": 404
        }
        console.error(error)
        return res.status(convertion[error.code] || 500).send(error)
    }
}

export const deleteUrlController = async (req, res) => {
    try {
        const {id} = req.params

        //const {currentUserId} = res.locals
        const currentUserId = 2

        const checkQuery = (await client.query('select * from urls u where u.id=$1', [id])).rows;
        if (checkQuery.length === 0) return res.sendStatus(404)

        const {userId} = checkQuery[0]
        if (currentUserId != userId) return res.sendStatus(401)

        const deleteQuery = await client.query('delete from urls where id=$1', [id])

        return res.sendStatus(204)

    } catch (error) {
        const convertion = {
            "23505": 409,
            "23503": 404
        }
        console.error(error)
        return res.status(convertion[error.code] || 500).send(error)
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