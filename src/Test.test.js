import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from './From'
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";

test("check if button is enabled", () => {
    render(<Form/>);
  });

  test("AddTodo contains input field and is focused on load", () => {
    const { queryByTitle } = render(<Form/>);
    const button = queryByTitle("submitButton");
     expect(button).toBeEnabled();
  });