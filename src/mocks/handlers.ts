import { CURRENCY } from "@I/currency";
import { IWallet } from "@I/user";
import { rest } from "msw";

const rates = {
  "USD-EUR": 0.85,
  "EUR-USD": 1.18,
  "CHF-USD": 1.09,
  "USD-CHF": 0.92,
  "EUR-CHF": 1.09,
  "CHF-EUR": 0.92,
};
const currentWallet = {
  [CURRENCY.USD]: { value: 100 },
  [CURRENCY.EUR]: { value: 500 },
  [CURRENCY.CHF]: { value: 10000 },
};

interface AmountBody {
  amount: number;
}

export const handlers = [
  rest.get("/api/v1/auth", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Oleksii",
        email: "oleksii@gmail.com",
        wallet: currentWallet,
        currentCurrency: Object.keys(currentWallet).reduce((acc, rec) => {
          return {
            ...acc,
            [rec as CURRENCY]: {
              value:
                (CURRENCY.USD) === (rec as CURRENCY)
                  ? currentWallet[rec as CURRENCY].value
                  : currentWallet[rec as CURRENCY].value *
                    rates[`${rec}-USD` as keyof typeof rates],
            },
          };
        },{}),
        userpic:
          "data:image/jpeg;base64,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",
      })
    );
  }),
  rest.get("/api/v1/wallet/:currency", (req, res, ctx) => {
    const { currency } = req.params;
    const result = Object.keys(currentWallet).reduce((acc, rec) => {
      return {
        ...acc,
        [rec as CURRENCY]: {
          value:
            (currency as CURRENCY) === (rec as CURRENCY)
              ? currentWallet[rec as CURRENCY].value
              : currentWallet[rec as CURRENCY].value *
                rates[`${rec}-${currency}` as keyof typeof rates],
        },
      };
    }, {});
    return res(ctx.status(200), ctx.json(result));
  }),
  rest.post<AmountBody, IWallet>(
    "/api/v1/wallet/exchange/:from/:to",
    (req, res, ctx) => {
      const { from, to } = req.params;
      const { amount } = req.body;
      if (amount < 0 || amount > currentWallet[from as CURRENCY].value) {
        ctx.json(currentWallet);
      }
      const conv = amount * rates[`${from}-${to}` as keyof typeof rates];
      currentWallet[to as CURRENCY].value =
        currentWallet[to as CURRENCY].value + conv;
      currentWallet[from as CURRENCY].value =
        currentWallet[from as CURRENCY].value - amount;

      return res(ctx.status(200), ctx.json(currentWallet));
    }
  ),
  rest.post<AmountBody, IWallet>(
    "/api/v1/wallet/deposit/:to",
    (req, res, ctx) => {
      const { to } = req.params;
      const { amount } = req.body;
      currentWallet[to as CURRENCY].value =
        currentWallet[to as CURRENCY].value + amount;

      return res(ctx.status(200), ctx.json(currentWallet));
    }
  ),
];
