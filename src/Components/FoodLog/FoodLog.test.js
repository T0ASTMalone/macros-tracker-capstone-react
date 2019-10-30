import React from "react";
import ReactDOM from "react-dom";
import FoodLog from "./FoodLog";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FoodLog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
