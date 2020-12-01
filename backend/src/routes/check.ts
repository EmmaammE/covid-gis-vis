import Router from "koa-router";

const router = new Router();
router.get("/", async (ctx) => {
  try {
    ctx.body = {
      status: "success",
    };
  } catch (e) {
    console.error(e);
  }
});

export default router;
