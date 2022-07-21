import React from "react";

function Question(props) {
    return (
        <div class="question border shadow-sm p-4">
            <h3 class="mb-3">{props.title}</h3>
            <p class="">{props.content}</p>
        </div>
    )
}

export default Question;