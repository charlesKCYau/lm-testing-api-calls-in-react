import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { STAR_WARS_URL } from "./statics/star_wars_url";
import { Character } from "./Character";
import { ERROR_418, ERROR_500 } from "./statics/error_code";

const server = setupServer(
  rest.get(STAR_WARS_URL, (req, res, ctx) => {
    return res(ctx.json({ name: "Luke Skywalker", birth_year: "19BBY" } as Character));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<App>", () => {
  test("on successful API call, displays character name", async () => {
    render(<App />);
    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();
  });

  test("on server error 500, displays correct error message", async () => {
    server.use(
      rest.get(STAR_WARS_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({name: ERROR_500}));
      })
    );
    render(<App />);
    expect(await screen.findByText(ERROR_500)).toBeInTheDocument();
  });

  test("on HTTP code 418, displays correct error message", async () => {
    server.use(
      rest.get(STAR_WARS_URL, (req, res, ctx) => {
        return res(ctx.status(418), ctx.json({name: ERROR_418}));
      })
    );
    render(<App />);
    expect(await screen.findByText(ERROR_418)).toBeInTheDocument();
  });

});

