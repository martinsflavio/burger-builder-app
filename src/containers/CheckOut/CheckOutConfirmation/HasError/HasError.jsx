import React from "react";

const HasError = (props) => {
  return (
    <div>
      <h3>Sorry! We couldn't complete your Order!</h3>
      <p>{props.error}</p>
    </div>
  );
};

export default HasError;