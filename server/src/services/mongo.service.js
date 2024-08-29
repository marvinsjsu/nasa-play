
const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error: ', err);
});

async function connectMongoDB () {
    await mongoose.connect(MONGODB_URI);
}

async function disconnectMongoDB () {
    await mongoose.disconnect();
}

module.exports = {
    disconnectMongoDB,
    connectMongoDB,
}
