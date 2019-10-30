import React from "react";
import ReactDOM from "react-dom";
import MealLog from "./MealLog";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MealLog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
