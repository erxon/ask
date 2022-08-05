import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import { postQuestion } from "./api-question";
import ProfilePhoto from "../user/ProfilePhoto";
import { read } from "../user/api-user";

function QuestionInput(props) {
  //create a state object question: questionTitle, questionContent
  //handleChange - to handle changes in the input fields
  //handleSubmit - save the question object to the database
  //Get request to the server for the user info

  const [values, setValues] = useState({
    questionTitle: "",
    questionBody: "",
    response: "",
    userId: "",
    userName: "",
    refresh: false,
  });

  const [open, setOpen] = useState(false);

  const handleInputClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    read({ userId: props.credentials.user._id }, { t: props.credentials.token })
      .then((response) => {
        setValues({
          ...values,
          userId: response.data._id,
          userName: response.data.name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = () => {
    const question = {
      questionTitle: values.questionTitle,
      questionBody: values.questionBody,
      user: values.userId,
      userName: values.userName,
      usersVoted: [],
      created: new Date(),
    };

    postQuestion(question, { t: props.credentials.token })
      .then((response) => {
        console.log(response);
        props.onSubmit(response.data);
        setValues({
          ...values,
          questionTitle: "",
          questionBody: "",
          response: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="question-input row rounded p-4 shadow-sm border mx-auto container-fluid">
      <div class="col-2">
        {values.userId && <ProfilePhoto userId={values.userId} />}
      </div>

      <div class="col-10">
        <input
          type="text"
          class="form-control my-2"
          name="questionTitle"
          onChange={handleChange}
          onClick={handleInputClick}
          placeholder="what do you want to know about?"
          value={values.questionTitle}
        />
        {open && (
          <div>
            <textarea
              type="text"
              name="questionBody"
              placeholder="Description"
              class="form-control mt-3"
              onChange={handleChange}
              value={values.questionBody}
            />
            <button
              type="submit"
              className="btn btn-custom btn-dark me-auto mt-3"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionInput;
