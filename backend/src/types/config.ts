import * as Interfaces from "./interfaces";

export const config: Interfaces.Iconfig = {
  port: process.env.PORT || 7878,
  redis: {
    host: process.env.REDIS__HOST || "127.0.0.1",
    port: process.env.REDIS__PORT || 6401,
  },
};
