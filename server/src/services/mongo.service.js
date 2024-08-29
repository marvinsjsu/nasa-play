
const mongoose = require('mongoose');


const MONGODB_URI = 'mongodb+srv://nasa-play-dev:rrjznu0NWJ3M0gC4@cluster0.h5sdh9h.mongodb.net/nasa-play?retryWrites=true&w=majority&appName=Cluster0';

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
