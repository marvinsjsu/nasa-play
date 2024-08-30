const SPACEX_API_URL = 'https://api.spacexdata.com/v4';

const LAUNCHES_QUERY = {
    query: {},
    options: {
        pagination: false,
        populate: [
            {
                path: 'rocket',
                select: {
                    name: 1
                }
            },
            {
                path: 'payloads',
                select: {
                    customers: 1,
                }
            }
        ]
    }
}

module.exports = {
    SPACEX_API_URL,
    LAUNCHES_QUERY,
};
