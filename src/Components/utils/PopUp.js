import React from "react";
import "./PopUp.css";

export default function PopUp({ component, ...props }) {
  const Component = component;
  console.log(props);
  return (
    <div className='pop-up'>
      <button className='close-window' onClick={props.hide}>
        X
      </button>
      <div className='component'>
        <Component {...props} />
      </div>
    </div>
  );
}
