const createStore = require('../utils/createStore');

const user = require('./models/user');
const counter = require('./models/counter');

module.exports = createStore({
    user,
    counter
});