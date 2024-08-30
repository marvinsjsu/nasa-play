
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_LIMIT_NUM = 0;
const DEFAULT_SORT_BY = 'flightNumber';
const DEFAULT_ORDER = 1;

function getPagination (query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUM;
    const limit = Math.abs(query.limit) || DEFAULT_LIMIT_NUM;
    const sortBy = query.sort || DEFAULT_SORT_BY;
    const order = Number(query.order) || DEFAULT_ORDER;
    const sort = { [sortBy]: order };
    const skip = (page - 1) * limit;

    return {
        limit,
        sort,
        skip,
    };
}

module.exports = {
    getPagination,
};
