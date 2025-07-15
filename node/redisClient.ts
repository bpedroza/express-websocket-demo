import { createClient } from 'redis';

const redisClient = await createClient({
  socket:{
    host: 'redis',
    port: 6379
  } 
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export { redisClient };