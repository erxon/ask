/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\r\nsensitive informations are managed in one file\r\nfor greater flexibility and security\r\n*/\nconst config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 5000,\n  jwtSecret: process.env.JWT_SECRET || \"YOUR_secret_key\",\n  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/ask'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://question-and-answer-website/./config/config.js?");

/***/ }),

/***/ "./server/controllers/answer.controller.js":
/*!*************************************************!*\
  !*** ./server/controllers/answer.controller.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_answer_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/answer.model */ \"./server/models/answer.model.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst create = async (req, res) => {\n  const answer = new _models_answer_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await answer.save();\n    return res.status(200).json({\n      message: \"Answer successfully posted\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    let answers = await _models_answer_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find({\n      \"questionId\": req.params.questionId\n    });\n    res.json(answers);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst answerByID = async (req, res, next) => {\n  try {\n    let foundAnswer = await _models_answer_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.params.answerId).populate(\"user\", \"name\").exec();\n\n    if (!foundAnswer) {\n      return res.status(400).json({\n        message: \"Answer does not exist\"\n      });\n    }\n\n    req.answer = foundAnswer;\n    next();\n  } catch (err) {\n    return res.json(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst read = (req, res) => {\n  let answer = req.answer;\n  return res.json(answer);\n};\n\nconst update = async (req, res) => {\n  try {\n    let answer = req.answer;\n    answer = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()(answer, req.body);\n    answer.updated = Date.now();\n    await answer.save();\n    res.json(answer);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    let answer = req.answer;\n    let answerRemoved = await answer.remove();\n    return res.json(answerRemoved);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst vote = async (req, res) => {\n  try {\n    let result = await _models_answer_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.answerId, {\n      $push: {\n        usersVoted: req.body.userId\n      }\n    }, {\n      new: true\n    }); // let answerToEdit = req.answer;\n    // answerToEdit.usersVoted.push(req.body.userId);\n    // await answerToEdit.save();\n\n    res.json(result);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst unvote = async (req, res) => {\n  try {\n    let result = await _models_answer_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.answerId, {\n      $pull: {\n        usersVoted: req.body.userId\n      }\n    }, {\n      new: true\n    });\n    res.json(result);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n}; // const comment = async (req, res) => {\n//     try{\n//         let answerToEdit = req.answer;\n//         answerToEdit.comments.push(req.body);\n//         await answerToEdit.save();\n//         res.json(answerToEdit);\n//     } catch(err){\n//         return res.status(400).json({\n//             error: errorHandler.getErrorMessage(err)\n//         });\n//     }\n// }\n// const deleteComment = async (req, res) => {\n//     try{\n//         let answerToEdit = req.answer;\n//         answerToEdit.comments = answerToEdit.comments.filter(\n//             object => object.userId !== req.body.userId\n//         );\n//         await answerToEdit.save();\n//         res.json(answerToEdit);\n//     } catch(err){\n//         return res.status(400).json({\n//             error: errorHandler.getErrorMessage(err)\n//         });\n//     }\n// }\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  list,\n  answerByID,\n  read,\n  update,\n  remove,\n  vote,\n  unvote\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/controllers/answer.controller.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../config/config */ \"./config/config.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nconst signin = async (req, res) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findOne({\n      \"email\": req.body.email\n    });\n\n    if (!user) {\n      return res.status(\"401\").json({\n        error: \"User not found\"\n      });\n    }\n\n    if (!user.authenticate(req.body.password)) {\n      return res.status(\"401\").send({\n        error: \"Email and password don't match.\"\n      });\n    }\n\n    const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n      _id: user._id\n    }, _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret);\n    res.cookie(\"t\", token, {\n      expire: new Date() + 9999\n    });\n    return res.json({\n      token,\n      user: {\n        _id: user._id,\n        name: user.name,\n        email: user.email\n      },\n      error: \"\"\n    });\n  } catch (err) {\n    return res.status(\"401\").json({\n      error: \"Could not sign in\"\n    });\n  }\n};\n\nconst signout = (req, res) => {\n  res.clearCookie(\"t\");\n  return res.status(\"200\").json({\n    message: \"signed out\"\n  });\n};\n\nconst requireSignin = express_jwt__WEBPACK_IMPORTED_MODULE_2___default()({\n  algorithms: [\"HS256\"],\n  secret: _config_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].jwtSecret,\n  userProperty: \"auth\"\n});\n\nconst hasAuthorization = (req, res, next) => {\n  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;\n\n  if (!authorized) {\n    return res.status(\"403\").json({\n      error: \"User is not authorized\"\n    });\n  }\n\n  next();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  signin,\n  signout,\n  requireSignin,\n  hasAuthorization\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/comment.controller.js":
/*!**************************************************!*\
  !*** ./server/controllers/comment.controller.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_comment_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/comment.model */ \"./server/models/comment.model.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst create = async (req, res) => {\n  const comment = new _models_comment_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await comment.save();\n    return res.status(200).json({\n      message: \"comment successfully posted\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    let comments = await _models_comment_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find();\n    res.json(comments);\n  } catch (err) {\n    return res.status(400).res.json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst commentByID = async (req, res, next) => {\n  try {\n    let comment = await _models_comment_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.params.commentId).populate(\"user\", \"name\").exec();\n\n    if (!comment) {\n      return res.status(400).json({\n        error: \"Comment does not exist\"\n      });\n    }\n\n    req.comment = comment;\n    next();\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst read = (req, res) => {\n  return res.json(req.comment);\n};\n\nconst edit = async (req, res) => {\n  try {\n    let comment = req.comment;\n    comment = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()(comment, req.body);\n    comment.updated = Date.now();\n    await comment.save();\n    res.json(comment);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    let comment = req.comment;\n    let removeComment = await comment.remove();\n    res.json(removeComment);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst like = async (req, res) => {\n  try {\n    let result = await _models_comment_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.commentId, {\n      $push: {\n        likes: req.body.userId\n      }\n    }, {\n      new: true\n    });\n    res.json(result);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst unlike = async (req, res) => {\n  try {\n    let result = await _models_comment_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.commentId, {\n      $pull: {\n        likes: req.body.userId\n      }\n    }, {\n      new: true\n    });\n    res.json(result);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  list,\n  read,\n  edit,\n  remove,\n  commentByID,\n  like,\n  unlike\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/controllers/comment.controller.js?");

/***/ }),

/***/ "./server/controllers/question.controller.js":
/*!***************************************************!*\
  !*** ./server/controllers/question.controller.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_question_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/question.model */ \"./server/models/question.model.js\");\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst create = async (req, res) => {\n  const question = new _models_question_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await question.save();\n    return res.status(200).json({\n      message: \"question successfully posted\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    let questions = await _models_question_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find();\n    res.json(questions);\n  } catch (err) {\n    return res.status(400).res.json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst questionByID = async (req, res, next) => {\n  try {\n    let findQuestion = await _models_question_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(req.params.questionId).populate(\"user\", \"name\").exec();\n\n    if (!findQuestion) {\n      return res.status(400).json({\n        error: \"Question does not exist\"\n      });\n    }\n\n    req.question = findQuestion;\n    next();\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst read = (req, res) => {\n  return res.json(req.question);\n};\n\nconst update = async (req, res) => {\n  try {\n    let edittedQuestion = req.question;\n    edittedQuestion = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()(edittedQuestion, req.body);\n    edittedQuestion.updated = Date.now();\n    await edittedQuestion.save();\n    res.json(edittedQuestion);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst remove = async (req, res) => {\n  try {\n    let questionToRemove = req.question;\n    let removedQuestion = await questionToRemove.remove();\n    res.json(removedQuestion);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst vote = async (req, res) => {\n  try {\n    let question = await _models_question_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.questionId, {\n      $push: {\n        \"usersVoted\": req.body.userId\n      }\n    }, {\n      new: true\n    });\n    res.json(question);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst unvote = async (req, res) => {\n  try {\n    let question = await _models_question_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.questionId, {\n      $pull: {\n        \"usersVoted\": req.body.userId\n      }\n    }, {\n      new: true\n    });\n    res.json(question);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  list,\n  read,\n  update,\n  remove,\n  questionByID,\n  vote,\n  unvote\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/controllers/question.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ \"lodash/extend\");\n/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _client_src_components_img_profile_pic_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../client/src/components/img/profile-pic.png */ \"./client/src/components/img/profile-pic.png\");\n\n\n\n\n\n\n\nconst create = async (req, res) => {\n  const user = new _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](req.body);\n\n  try {\n    await user.save();\n    return res.status(200).json({\n      message: \"Successfully signed up!\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst list = async (req, res) => {\n  try {\n    let users = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().select(\"name email updated created\");\n    res.json(users);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst userByID = async (req, res, next, id) => {\n  try {\n    let user = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findById(id).populate(\"following\", \"_id name\").populate(\"followers\", \"_id name\").exec();\n\n    if (!user) {\n      return res.status(\"400\").json({\n        error: \"User not found\"\n      });\n    }\n\n    req.profile = user;\n    next();\n  } catch (err) {\n    return res.status(\"400\").json({\n      error: \"Could not retrieve user\"\n    });\n  }\n};\n\nconst read = (req, res) => {\n  req.profile.hashed_password = undefined;\n  req.profile.salt = undefined;\n  return res.json(req.profile);\n};\n\nconst update = (req, res) => {\n  let form = new (formidable__WEBPACK_IMPORTED_MODULE_3___default().IncomingForm)();\n  form.keepExtensions = true;\n  form.parse(req, async (err, fields, files) => {\n    if (err) {\n      return res.status(400).json({\n        error: \"Photo could not be uploaded\"\n      });\n    }\n\n    let user = req.profile;\n    user = lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(user, fields);\n    user.updated = Date.now();\n\n    if (files.photo) {\n      user.photo.data = fs__WEBPACK_IMPORTED_MODULE_4___default().readFileSync(files.photo.filepath);\n      user.photo.contentType = files.photo.mimetype;\n    }\n\n    try {\n      await user.save();\n      user.hashed_password = undefined;\n      user.salt = undefined;\n      res.json(user);\n    } catch (err) {\n      return res.status(400).json({\n        error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n      });\n    }\n  });\n};\n\nconst remove = async (req, res) => {\n  try {\n    let user = req.profile;\n    let deletedUser = await user.remove();\n    deletedUser.hashed_password = undefined;\n    deletedUser.salt = undefined;\n    res.json(deletedUser);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst photo = (req, res, next) => {\n  if (req.profile.photo.data) {\n    res.set(\"Content-Type\", req.profile.photo.contentType);\n    res.send(req.profile.photo.data);\n  }\n\n  next();\n};\n\nconst defaultPhoto = (req, res) => {\n  return res.sendFile(process.cwd() + _client_src_components_img_profile_pic_png__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n};\n\nconst addFollowing = async (req, res, next) => {\n  try {\n    await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.userId, {\n      $push: {\n        following: req.body.followId\n      }\n    });\n    next();\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst addFollower = async (req, res) => {\n  try {\n    let result = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.followId, {\n      $push: {\n        followers: req.body.userId\n      }\n    }, {\n      new: true\n    }).populate(\"following\", \"_id name\").populate(\"followers\", \"_id name\").exec();\n    result.hashed_password = undefined;\n    result.salt = undefined;\n    res.json(result);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst removeFollowing = async (req, res, next) => {\n  try {\n    await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.userId, {\n      $pull: {\n        following: req.body.unfollowId\n      }\n    });\n    next();\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\nconst removeFollower = async (req, res) => {\n  try {\n    let result = await _models_user_model__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findByIdAndUpdate(req.body.unfollowId, {\n      $pull: {\n        followers: req.body.userId\n      }\n    }, {\n      new: true\n    }).populate(\"following\", \"_id name\").populate(\"followers\", \"_id name\").exec();\n    result.hashed_password = undefined;\n    result.salt = undefined;\n    res.json(result);\n  } catch (err) {\n    return res.status(400).json({\n      error: _helpers_dbErrorHandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getErrorMessage(err)\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  userByID,\n  read,\n  list,\n  remove,\n  update,\n  photo,\n  defaultPhoto,\n  addFollower,\n  addFollowing,\n  removeFollower,\n  removeFollowing\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../template */ \"./template.js\");\n/* harmony import */ var _routes_auth_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n/* harmony import */ var _routes_user_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n/* harmony import */ var _routes_question_route__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/question.route */ \"./server/routes/question.route.js\");\n/* harmony import */ var _routes_answer_route__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/answer.route */ \"./server/routes/answer.route.js\");\n/* harmony import */ var _routes_comment_route__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./routes/comment.route */ \"./server/routes/comment.route.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_12__);\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst CURRENT_WORKING_DIR = process.cwd();\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default().urlencoded({\n  extended: true\n}));\napp.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());\napp.use(compression__WEBPACK_IMPORTED_MODULE_3___default()());\napp.use(helmet__WEBPACK_IMPORTED_MODULE_5___default()());\napp.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());\napp.use(\"/dist\", express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"](path__WEBPACK_IMPORTED_MODULE_12___default().join(CURRENT_WORKING_DIR, \"dist\")));\napp.use(\"/\", _routes_user_routes__WEBPACK_IMPORTED_MODULE_8__[\"default\"]);\napp.use(\"/\", _routes_auth_routes__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\napp.use(\"/\", _routes_question_route__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\napp.use(\"/\", _routes_answer_route__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\napp.use(\"/\", _routes_comment_route__WEBPACK_IMPORTED_MODULE_11__[\"default\"]);\napp.use((err, req, res, next) => {\n  if (err.name === \"UnauthorizedError\") {\n    res.status(401).json({\n      \"error\": err.name + \": \" + err.message\n    });\n  } else if (err) {\n    res.status(400).json({\n      \"error\": err.name + \": \" + err.message\n    });\n    console.log(err);\n  }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://question-and-answer-website/./server/express.js?");

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*\
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst getErrorMessage = err => {\n  let message = \"\";\n\n  if (err.code) {\n    switch (err.code) {\n      case 11000:\n      case 11001:\n        message = getUniqueErrorMessage(err);\n        break;\n\n      default:\n        message = \"Something went wrong\";\n    }\n  } else {\n    for (let errName in err.errors) {\n      if (err.errors[errName].message) {\n        if (err.errors[errName].message) {\n          message = err.errors[errName].message;\n        }\n      }\n    }\n  }\n\n  return message;\n};\n\nconst getUniqueErrorMessage = err => {\n  let output;\n\n  try {\n    let fieldName = err.message.substring(err.message.lastIndexOf(\".$\") + 2, err.message.lastIndexOf(\"_1\"));\n    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + \" already exists \";\n  } catch (ex) {\n    output = \"Unique field already exists\";\n  }\n\n  return output;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getErrorMessage\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./server/models/answer.model.js":
/*!***************************************!*\
  !*** ./server/models/answer.model.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst AnswerSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  answerTitle: String,\n  answerBody: String,\n  user: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  },\n  questionId: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"Question\"\n  },\n  usersVoted: [{\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  }],\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: Date\n});\nconst Answer = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model)(\"Answer\", AnswerSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Answer);\n\n//# sourceURL=webpack://question-and-answer-website/./server/models/answer.model.js?");

/***/ }),

/***/ "./server/models/comment.model.js":
/*!****************************************!*\
  !*** ./server/models/comment.model.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CommentSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  postId: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"Question\"\n  },\n  content: String,\n  user: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  },\n  likes: [{\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  }],\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: Date\n}, {\n  toJSON: {\n    virtuals: true\n  }\n});\nCommentSchema.virtual(\"fromAnswers\", {\n  ref: \"Answer\",\n  localField: \"postId\",\n  foreignField: \"_id\",\n  justOne: true\n});\nconst Comment = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model)(\"comment\", CommentSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);\n\n//# sourceURL=webpack://question-and-answer-website/./server/models/comment.model.js?");

/***/ }),

/***/ "./server/models/question.model.js":
/*!*****************************************!*\
  !*** ./server/models/question.model.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst QuestionSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  questionTitle: String,\n  questionBody: String,\n  user: {\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: 'User'\n  },\n  userName: {\n    type: String,\n    ref: 'User'\n  },\n  usersVoted: [{\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: 'User'\n  }],\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: Date\n});\nconst Question = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model)(\"Question\", QuestionSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Question);\n\n//# sourceURL=webpack://question-and-answer-website/./server/models/question.model.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n  name: {\n    type: String,\n    trim: true,\n    required: \"Name is required\"\n  },\n  about: {\n    type: String,\n    trim: true\n  },\n  photo: {\n    data: Buffer,\n    contentType: String\n  },\n  email: {\n    type: String,\n    trim: true,\n    unique: \"Email already exists\",\n    match: [/.+\\@.+\\..+/, \"Please fill a valid email address\"],\n    required: \"Email is required\"\n  },\n  following: [{\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  }],\n  followers: [{\n    type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema.ObjectId),\n    ref: \"User\"\n  }],\n  created: {\n    type: Date,\n    default: Date.now\n  },\n  updated: Date,\n  hashed_password: {\n    type: String,\n    required: \"Password is required\"\n  },\n  salt: String\n}); //Password virtual field\n\nUserSchema.virtual(\"password\").set(function (password) {\n  this._password = password;\n  this.salt = this.makeSalt();\n  this.hashed_password = this.encryptPassword(password);\n}).get(function () {\n  return this._password;\n}); //password validation\n\nUserSchema.path(\"hashed_password\").validate(function (v) {\n  if (this._password && this._password.length < 6) {\n    this.invalidate(\"password\", \"Password must be at least 6 characters.\");\n  }\n\n  if (this.isNew && !this._password) {\n    this.invalidate(\"password\", \"Password is required\");\n  }\n}, null); //User schema methods for hashing, authenticating and salting\n\nUserSchema.methods = {\n  authenticate: function (plainText) {\n    return this.encryptPassword(plainText) === this.hashed_password;\n  },\n  encryptPassword: function (password) {\n    if (!password) return \"\";\n\n    try {\n      return crypto__WEBPACK_IMPORTED_MODULE_1___default().createHmac(\"sha1\", this.salt).update(password).digest(\"hex\");\n    } catch (err) {\n      return \"\";\n    }\n  },\n  makeSalt: function () {\n    return Math.round(new Date().valueOf() * Math.random()) + \"\";\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', UserSchema));\n\n//# sourceURL=webpack://question-and-answer-website/./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/answer.route.js":
/*!***************************************!*\
  !*** ./server/routes/answer.route.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/answer.controller */ \"./server/controllers/answer.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/api/answers\").post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route(\"/api/answers/list/:questionId\").get(_controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list);\nrouter.route(\"/api/answers/vote\").put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].vote);\nrouter.route(\"/api/answers/unvote\").put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].unvote);\nrouter.route(\"/api/answers/:answerId\").get(_controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param(\"answerId\", _controllers_answer_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].answerByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://question-and-answer-website/./server/routes/answer.route.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/auth/signin\").post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signin);\nrouter.route(\"/auth/signout\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].signout);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://question-and-answer-website/./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/comment.route.js":
/*!****************************************!*\
  !*** ./server/routes/comment.route.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/comment.controller */ \"./server/controllers/comment.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/api/comments\").get(_controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route('/api/comments/like').put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].like);\nrouter.route('/api/comments/unlike').put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].unlike);\nrouter.route(\"/api/comments/:commentId\").get(_controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].edit).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param(\"commentId\", _controllers_comment_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].commentByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://question-and-answer-website/./server/routes/comment.route.js?");

/***/ }),

/***/ "./server/routes/question.route.js":
/*!*****************************************!*\
  !*** ./server/routes/question.route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/question.controller.js */ \"./server/controllers/question.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/api/questions\").get(_controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route(\"/api/questions/vote\").put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].vote);\nrouter.route(\"/api/questions/unvote\").put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].unvote);\nrouter.route(\"/api/questions/:questionId\").get(_controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param(\"questionId\", _controllers_question_controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].questionByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://question-and-answer-website/./server/routes/question.route.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n/* harmony import */ var _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\nrouter.route(\"/api/users\").get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].list).post(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create);\nrouter.route('/api/users/photo/:userId').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].photo, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultPhoto);\nrouter.route('/api/users/defaultPhoto').get(_controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].defaultPhoto);\nrouter.route(\"/api/users/follow\").put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addFollowing, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addFollower);\nrouter.route(\"/api/users/unfollow\").put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].removeFollowing, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].removeFollower);\nrouter.route(\"/api/users/:userId\").get(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].read).put(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].update).delete(_controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].requireSignin, _controllers_auth_controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hasAuthorization, _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove);\nrouter.param(\"userId\", _controllers_user_controller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].userByID);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://question-and-answer-website/./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_2__);\n/*\r\nimport config to access the port that\r\nthe server will listen to\r\n*/\n //import configured express file\n\n //mongoose configuration\n\n\n(mongoose__WEBPACK_IMPORTED_MODULE_2___default().Promise) = global.Promise;\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mongoUri);\nmongoose__WEBPACK_IMPORTED_MODULE_2___default().connection.on(\"error\", () => {\n  throw new Error(`unable to connect to database: ${_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mongoUri}`);\n});\n_express__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(_config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port, err => {\n  if (err) {\n    console.log(err);\n  }\n\n  console.info(\"Server started on port %s.\", _config_config__WEBPACK_IMPORTED_MODULE_0__[\"default\"].port);\n});\n\n//# sourceURL=webpack://question-and-answer-website/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  return `<!doctype html>\n    <html lang=\"en\">\n    <head>\n    <meta charset=\"utf-8\">\n    <title>MERN Skeleton</title>\n    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:100,300,400\">\n    <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n    </head>\n    <body>\n    <div id=\"root\"></div>\n    <script type=\"text/javascript\" src=\"/dist/bundle.js\"></script>\n    </body>\n    </html>`;\n});\n\n//# sourceURL=webpack://question-and-answer-website/./template.js?");

/***/ }),

/***/ "./client/src/components/img/profile-pic.png":
/*!***************************************************!*\
  !*** ./client/src/components/img/profile-pic.png ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"b5e188c92802e96faa6f2b04d236ebb2.png\");\n\n//# sourceURL=webpack://question-and-answer-website/./client/src/components/img/profile-pic.png?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("express-jwt");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "lodash/extend":
/*!********************************!*\
  !*** external "lodash/extend" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("lodash/extend");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;