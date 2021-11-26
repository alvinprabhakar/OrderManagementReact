import React from "react";
 
const AddOrder = props => {
  return (
    <div className="popup-box">
      <div className="box">
          {props.content}
      </div>
    </div>
  );
};
 
export default AddOrder;