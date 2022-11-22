import eah from "express-async-handler"
import {
    searchQueryHelper,
    paginationQueryHelper
} from "./middleware-query-helpers.js"

export const userQuery = (model, options) => {
    return eah(async (req, res, next) => {
        let query = model.find()

        // Search by name
        query = searchQueryHelper("name", query, req)

        // Pagination
        const total = await model.countDocuments()
        const paginationResult = await paginationQueryHelper(total, query, req)
        query = paginationResult.query
        const pagination = paginationResult.pagination

        // Results
        const queryResults = await query

        res.queryResults = {
            success: true,
            count: queryResults.length,
            pagination,
            data: queryResults
        }

        next()
    })
}
