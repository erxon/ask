import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import UserDetails from "./UserDetails";
import Question from "./Question";
import mark from "../img/1.jpg";
import Avatar from "../user/Avatar";
import Answer from "./Answer";
import sherlock from "../img/2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import auth from "../auth/auth-helper";
import { question } from "../Home/api-question";
import { useParams } from "react-router-dom";
import { listAnswers, submitAnswer } from "./api-answer";
import ProfilePhoto from "../user/ProfilePhoto";
function PostWithAnswers() {
  //Submitting answers
  //1. Create state constant to handle values
  const jwt = auth.isAuthenticated();

  const { questionId } = useParams();

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    listAnswers({ questionId: questionId })
      .then((response) => {
        setAnswers([...response.data.reverse()]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [answer, setAnswer] = useState({
    title: "",
    content: "",
    user: jwt.user._id,
    questionId: questionId,
  });
  const [open, setOpen] = useState(false);

  const handleInputClick = () => {
    setOpen(true);
  };

  //2. Create a handleChange function
  const handleChange = (event) => {
    const { value, name } = event.target;
    setAnswer({ ...answer, [name]: value });
  };
  //3. Create a handleSubmit function
  const handleSubmit = () => {
    const data = {
      answerTitle: answer.title,
      answerBody: answer.content,
      user: answer.user,
      questionId: answer.questionId,
      usersVoted: [],
      created: new Date(),
    };

    submitAnswer(data, { t: jwt.token })
      .then((response) => {
        setAnswers([response.data, ...answers]);
        setAnswer({
          title: "",
          content: "",
          user: jwt.user._id,
          questionId: questionId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [values, setValues] = useState({
    user: {},
    title: "",
    content: "",
  });

  useEffect(() => {
    question({ questionId: questionId }, { t: jwt.token })
      .then((response) => {
        setValues({
          ...values,
          user: response.data.user,
          title: response.data.questionTitle,
          content: response.data.questionBody,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //3. Map all the data in the Answer component

  return (
    <div>
      <div className="row gx-0">
        <div className="post col-lg-6 col-md-12">
          <div>
            {Object.keys(values.user).length !== 0 && (
              <UserDetails
                userId={values.user._id}
                name={values.user.name}
                jwt={jwt}
              />
            )}
          </div>
          <div>
            <Question title={values.title} content={values.content} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 answers">
          <div className="answer-input mt-3 mb-3">
            <div className="d-flex">
              {/* row gx-0 container-fluid */}
              <div>
                <div className="ms-2">
                  <ProfilePhoto userId={jwt.user._id} />
                </div>
              </div>
              <div className="align-self-center px-2">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={answer.title}
                  placeholder="Write your answer"
                  onChange={handleChange}
                  onClick={handleInputClick}
                />
              </div>
            </div>
            {open && (
              <div>
                <textarea
                  type="text"
                  name="content"
                  value={answer.content}
                  onChange={handleChange}
                  className="form-control mt-3"
                  placeholder="description"
                />
                <button
                  type="button"
                  className="btn btn-custom me-auto mt-3"
                  onClick={handleSubmit}
                >
                  Post
                </button>
              </div>
            )}
          </div>
          <div className="answers-heading">
            <h3>Answers</h3>
          </div>
          <div className="answer-thread">
            {answers.length > 0 ? (
              answers.map((answer) => {
                return <Answer key={answer._id} answer={answer} jwt={jwt} />;
              })
            ) : (
              <p className="p-4">There were no answers yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostWithAnswers;
