import React from "react";
import ReactDOM from "react-dom";
import SearchFoods from "./SearchFoods";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchFoods />, div);
  ReactDOM.unmountComponentAtNode(div);
});
