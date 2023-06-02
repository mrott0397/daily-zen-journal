const db = require('../config/connection');
const profileSeeds = require('./profileSeeds.json');
const { User, Journal } = require('../models');

db.once('open', async () => {
    try {
        
    } catch (error) {
        throw error;
    }
});