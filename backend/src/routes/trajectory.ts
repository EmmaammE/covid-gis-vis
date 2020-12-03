import Router from "koa-router";
const { getAllData, init } = require("../controllers/trajectory");

const router = new Router();

router.post("/init", async (ctx) => {
  try {
    // validation
    init();
    // 200 201?
    ctx.status = 200;
    ctx.body = {
      status: "success",
      // games: [ctx.request.body.name]
    };
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = {
      status: "error",
    };
  }
});

router.post("/getAllData", async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: await getAllData(),
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
