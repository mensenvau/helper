require("dotenv").config({ path: `./.env` });

const { createClient } = require("redis");

const redis = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
});

(async () => {
    try {
        await redis.connect();
        console.info("\x1b[32m%s\x1b[0m", `Successfully connected to Redis.`);
    } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `Could not connect to Redis: ${err.message}`);
        process.exit(1);
    }
})();

redis.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", `Redis error: ${err.message}`);
});

module.exports = { redis };
