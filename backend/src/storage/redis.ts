import { config } from "../types/config";
import * as Interfaces from "../types/interfaces";

const redis = require("redis");

const { promisify } = require("util");

export function redisStorage(): Interfaces.IStorage {
  const client = redis.createClient(config.redis);

  const rpush = promisify(client.rpush).bind(client);
  const lrem = promisify(client.lrem).bind(client);
  const lrange = promisify(client.lrange).bind(client);

  return {
    get: (list: string) => {
      return lrange(list, 0, -1)
        .then((val: string[]) => val)
        .catch((e: Error) => []);
    },

    add: (list: string, item: string) => {
      return rpush(list, item)
        .then((val: number) => val > 0)
        .catch((e: Error) => false);
    },

    remove: (list: string, item: string) => {
      return lrem(list, 0, item)
        .then((val: number) => val > 0)
        .catch((e: Error) => false);
    },
  };
}
