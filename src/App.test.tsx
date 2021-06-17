import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Redners renders react", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
