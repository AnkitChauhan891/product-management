const {createClient} = require("redis");

const redisClient = createClient({
    // url: "redis://localhost:3030"
}).on("error", (err) => {
    console.log("Redis Client Error", err)
}).connect();

module.exports = redisClient;