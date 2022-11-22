import eah from "express-async-handler"
import {
    searchQueryHelper,
    populateQueryHelper,
    sortQueryHelper,
    paginationQueryHelper
} from "./middleware-query-helpers.js"

export const questionQuery = (model, options) => {
    return eah(async (req, res, next) => {
        let query = model.find()

        // Search by title
        query = searchQueryHelper("title", query, req)

        // Population
        if (options && options.population){
            query = populateQueryHelper(query, options.population)
        }

        // Sort
        query = sortQueryHelper(query, req)

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
