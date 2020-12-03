import Koa from "koa";
import bodyParser from "koa-bodyparser";
import KoaLogger from "koa-logger";
import cors from "koa2-cors";
import { config } from "./types/config";
import checkRouter from "./routes/check";
import listRouter from "./routes/list";
import trajRouter from "./routes/trajectory";

const app = new Koa();
const PORT = config.port;

app.use(bodyParser());

app.use(
  cors({
    origin: "*",
  })
);
app.use(KoaLogger());

app.use(checkRouter.routes());
app.use(listRouter.routes());
app.use(trajRouter.routes());

const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });

export default server;
