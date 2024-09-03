
async function httpGetSecrets (req, res) {
    return res.send('Your personal secret value is 42!');
}

module.exports = {
    httpGetSecrets,
};
