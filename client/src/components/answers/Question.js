import React from "react";

function Question(props) {
  return (
    <div className="question border shadow-sm p-4">
      <h3 className="mb-3">{props.title}</h3>
      <p className="">{props.content}</p>
    </div>
  );
}

export default Question;
