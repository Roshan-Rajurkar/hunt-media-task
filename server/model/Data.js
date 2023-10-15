const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: Number,
    startDate: Date,
    endDate: Date,
    monthYear: String,
    dateExcludes: [String],
    days: Number,
    leadCount: Number,
    expectedDRR: Number,
    lastUpdated: Date,
});

const Data = mongoose.model('hunt', dataSchema);

module.exports = Data;
