import React from "react";

function Avatar(props) {
  let styleClass = "avatar" + " " + props.custom;
  return (
    <div>
      <img className={styleClass} src={props.picture} alt="" />
    </div>
  );
}

export default Avatar;
