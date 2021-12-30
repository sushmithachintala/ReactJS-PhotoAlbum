import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Login from "./components/login";
import Carousel from "./components/carousel";
import PhotoGrid from "./components/PhotoGrid";

test("Login page structure is correct", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const emailLabel = screen.getByText(/email/i);
  expect(emailLabel).toBeInTheDocument();

  const passwordLabel = screen.getByText(/password/i);
  expect(passwordLabel).toBeInTheDocument();

  const loginButton = screen.getByRole("button", { label: "Login" });
  expect(loginButton).toBeDisabled();

  const emailInput = screen.getByRole("textbox", { label: /emailInput/i });
  userEvent.type(emailInput, "name@ex.com");
  expect(emailInput).toHaveValue("name@ex.com");

  const passwordInput = screen.getByRole("textbox", {
    label: /passwordInput/i,
  });
  userEvent.type(passwordInput, "1234");
});

test("Carousel page structure is correct", async () => {
  render(
    <BrowserRouter>
      <Carousel />
    </BrowserRouter>
  );
  await screen
    .findByRole("img")
    .then((image) =>
      expect(image.src).toContain("https://via.placeholder.com/600/92c952")
    );

  const arrows = screen.getAllByRole("link");
  expect(arrows[0].href).toContain("/photo/0");
  expect(arrows[1].href).toContain("/photo/1");
});
test("PhotoGrid page structure is correct", async () => {
  render(
    <BrowserRouter>
      <PhotoGrid />
    </BrowserRouter>
  );
  await screen.findAllByRole("img").then((images) => {
    expect(images).toHaveLength(50);
  });
  await screen.findAllByRole("link").then((links) => {
    links.forEach((link, i) => {
      expect(link.href).toContain(`/photo/${i}`);
    });
  });
});
