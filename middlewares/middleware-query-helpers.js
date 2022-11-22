import Question from "../models/Question-model.js";

export const searchQueryHelper = (searchKey, query, req) => {
    if (req.query.search){
        const searchObject = {}

        const regex = new RegExp(req.query.search, "i")
        searchObject[searchKey] = regex

        return query.where(searchObject)
    }

    return query
}

export const populateQueryHelper = (query, population) => {
    return query.populate(population)
}

export const sortQueryHelper = (query, req) => {
    let sort = "createdAt"
    const sortKey = req.query.sortBy

    if (sortKey === "most-answered"){
        sort = "-answerCount"
    }

    if (sortKey === "most-liked"){
        sort = "-likeCount"
    }

    return query.sort(sort)
}

export const paginationQueryHelper = async (total, query, req) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const pagination = {}

    if (startIndex > 0){
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }

    if (endIndex < total){
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    return {
        query: (query === undefined) ? undefined : query.skip(startIndex).limit(limit),
        pagination,
        startIndex,
        limit
    }
}
