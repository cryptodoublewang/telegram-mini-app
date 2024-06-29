require('dotenv').config({ path: './.env' });

module.exports = {
    env: {
        STRAPI_API_KEY: process.env.STRAPI_API_KEY
    }
}