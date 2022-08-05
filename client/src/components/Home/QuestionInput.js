import React, { useEffect, useState } from "react";
import { postQuestion } from "./api-question";
import ProfilePhoto from "../user/ProfilePhoto";
import { read } from "../user/api-user";

function QuestionInput(props) {
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
    <div className="question-input row rounded p-4 shadow-sm border mx-auto container-fluid">
      <div className="col-2">
        {values.userId && <ProfilePhoto userId={values.userId} />}
      </div>

      <div className="col-10">
        <input
          type="text"
          className="form-control my-2"
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
              className="form-control mt-3"
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
