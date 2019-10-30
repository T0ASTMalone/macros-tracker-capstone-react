import React from "react";
import ReactDOM from "react-dom";
import MealItem from "./MealItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MealItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
