const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('abc', 10),
        isAdmin: true
    },
    {
        name: 'Emily Connor',
        email: 'emily@example.com',
        password: bcrypt.hashSync('abc', 10),
    },
    {
        name: 'Matt stone',
        email: 'stone@example.com',
        password: bcrypt.hashSync('abc', 10),
    }
];

module.exports = users;