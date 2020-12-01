import Router from "koa-router";
import { AddListRequest } from "../request/AddList";
import * as storage from "../storage/redis";

const router = new Router();

router.post("/list", async (ctx) => {
  try {
    // validation

    const addListRequest = new AddListRequest();
    addListRequest.name = ctx.request.body.name || "";

    // check error
    console.log(storage);

    const store = storage.redisStorage();
    const list_name = "game";

    await store.add(list_name, addListRequest.name);

    // 200 201?
    ctx.status = 200;
    ctx.body = {
      status: "success",
      // games: [ctx.request.body.name]
      games: await store.get(list_name),
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
