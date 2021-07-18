import { rest } from "msw";

export const handlers = [
  rest.get("/users/:user", (req, res, ctx) => {
    const { user } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        status: 'ok'
      })
    );
  }),
];
