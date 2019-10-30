import React from "react";
import ReactDOM from "react-dom";
import AddFoodLogItem from "./AddFoodLogItem";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddFoodLogItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
