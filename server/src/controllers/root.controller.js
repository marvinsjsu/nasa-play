const path = require('path');

const ABS_PATH_INDEX_HTML = path.join(__dirname, '..', '..', 'public', 'index.html');

function getRoot (req, res) {
    return res.sendFile(ABS_PATH_INDEX_HTML);
}

module.exports = {
    getRoot,
};
