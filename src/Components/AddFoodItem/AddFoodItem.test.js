import React from "react";
import ReactDOM from "react-dom";
import AddFoodItem from "./AddFoodItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddFoodItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
