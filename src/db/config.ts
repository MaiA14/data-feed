const DB_NAME = 'feed';
const DB_USERNAME = 'mai_role';
const DB_PASSWORD = '4390';

const SERVER_PORT = 9000;
const SERVER_IP = '127.0.0.1'; // localhost

const API_KEY = '1d5da03a0ead670aa12f88e6031ad791';
const LIMIT_FEED_API_RESULTS = 5;

const SERVER = {
    dbName: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    port: SERVER_PORT,
    ip: SERVER_IP,
    apiKey: API_KEY,
    limit_feed_api_results: LIMIT_FEED_API_RESULTS
}

const config = {
    server: SERVER
}

export default config;