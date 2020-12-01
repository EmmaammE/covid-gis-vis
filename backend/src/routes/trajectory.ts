import Router from "koa-router";

const router = new Router();

router.post("/path", async (ctx) => {
  try {
    // validation
    //
    const addListRequest = new AddListRequest();
    addListRequest.name = ctx.request.body.name || "";

    // check error
    // console.log(storage);

    // const store = storage.redisStorage();
    const list_name = "game";

    // 200 201?
    ctx.status = 200;
    ctx.body = {
      status: "success",
      // games: [ctx.request.body.name]
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
