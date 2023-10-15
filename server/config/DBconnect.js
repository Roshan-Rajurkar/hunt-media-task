const mongoose = require('mongoose')
const mongoDBURL = 'mongodb+srv://roshanrajurkar50:Roshan123@cluster0.iay2uo3.mongodb.net/?retryWrites=true&w=majority\test'

const DBconnect = async () => {
    try {
        const res = await mongoose.connect(mongoDBURL, { useNewUrlParser: true })
        console.log('DB connected to : ', res.connection.host)
    } catch (err) {
        console.error('MongoDB connection error:', err);
    };
};

module.exports = DBconnect;
