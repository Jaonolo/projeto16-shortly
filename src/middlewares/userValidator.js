import client from '../db/db.js'

export default async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization) return res.sendStatus(401)
    const query = await client.query('select * from sessions s where s."authToken"=$1', [authorization.substring(7)])
    if(query.rows.length === 0) return res.sendStatus(401)

    res.locals.currentUser = query.rows[0].userId
    next()
}