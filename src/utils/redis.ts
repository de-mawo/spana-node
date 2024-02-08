import RedisStore from "connect-redis";
import { createClient } from "redis";


// Initialize client.
let redisClient = createClient({url: process.env.REDIS_URL});
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "Spana App:",
});

export default redisStore;
