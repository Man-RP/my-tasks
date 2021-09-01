import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello world", () => {
  render(<App />);
  const exampleText = screen.getByRole("main");
  expect(exampleText).toHaveTextContent("Hello World!");
});
