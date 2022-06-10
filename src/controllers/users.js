import client from '../db/db.js'

export const getUserController = async (req, res) => {
    try {
        const {id} = req.params

        const query = (await client.query(`
            select
                u.*,
                urls.*
            from users u 
            left join urls on urls."userId"=u.id
            where u.id=$1
        `, [id])).rows;
        if (query.length === 0) return res.sendStatus(404)

        const {id: urlId, name} = query[0]

        const formattedResponse = {
            id: id,
            name,
            visitCount: query.reduce((acc, elem) => acc + 1*elem.viewCount, 0),
            shortenedUrls: urlId === null ? [] : query.map(
                ({id, shortUrl, url, viewCount}) => {return {id, shortUrl, url, visitCount: 1*viewCount}}
            )
        }

        return res.status(200).send(formattedResponse)

    } catch (error) {
        const convertion = {
            "23505": 409,
            "23503": 404
        }
        console.error(error)
        return res.status(convertion[error.code] || 500).send(error)
    }
}

export const getRankingController = async (req, res) => {
    try {
        const query = (await client.query(`
            select u.*, count(urls), sum(urls."viewCount") from users u 
            left join urls on urls."userId"=u.id
            group by u.id
            order by sum(urls."viewCount") desc nulls last
            limit 10
        `)).rows;
        if (query.length === 0) return res.sendStatus(404)

        const formattedResponse = query.map(
            ({id, name, count, sum}) => {return {id, name, linksCount: 1*count, visitCount: 1*sum}}
        )

        return res.status(200).send(formattedResponse)

    } catch (error) {
        const convertion = {
            "23505": 409,
            "23503": 404
        }
        console.error(error)
        return res.status(convertion[error.code] || 500).send(error)
    }
}