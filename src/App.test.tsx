import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { STAR_WARS_URL } from "./statics/star_wars_url";
import { Character } from "./Character";

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
    expect(await screen.findByText("19BBY")).toBeInTheDocument();
  });

});
