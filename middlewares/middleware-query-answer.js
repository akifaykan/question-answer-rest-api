import eah from "express-async-handler"
import {
    populateQueryHelper,
    paginationQueryHelper
} from "./middleware-query-helpers.js"

export const answerQuery = (model, options) => {
    return eah(async (req, res, next) => {
        const {id} = req.params
        const total = (await model.findById(id))["answerCount"]
        const paginationResult = await paginationQueryHelper(total, undefined, req)
        const pagination = paginationResult.pagination
        const startIndex = paginationResult.startIndex
        const limit = paginationResult.limit

        let queryObject = {}

        queryObject["answers"] = {$slice: [startIndex, limit]}

        let query = model.find({_id: id}, queryObject)

        query = populateQueryHelper(query, options.population)

        const queryResults = await query

        res.queryResults = {
            success: true,
            pagination,
            data: queryResults
        }

        next()
    })
}
