// FeedbackForm.js
import React, { useEffect, useState } from "react";
import "./FeedbackForm.css";
import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CSSTransition } from "react-transition-group";
import { Rating, Typography } from "@mui/material";
// import Rating from "react-rating";
// const mongoose = require("mongoose");

// Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/feedbacks", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Create a feedback schema
// const feedbackSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   rating: String,
//   description: String,
//   mobileNumber: String,
// });

// Create a feedback model
// const Feedback = mongoose.model("Feedback", feedbackSchema);
const Form = (props) => {
  const [value, setValue] = React.useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = (value) => {
    setActiveStep((prev) => prev + value);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    // Handle form submission logic here
    // You can send the feedback data to a server or perform any other actions

    // Clear form inputs
    console.log(props.tele, "INSIDE THE HANDLE SUBMIT");
    console.log(name, email, rating, description, mobileNumber);
    // props.tele.initData = "initData random";
    // props.tele.initDataUnsafe["random"] = "initData random";
    // props.tele.sendData(
    //   JSON.stringify({
    //     name,
    //     email,
    //     rating: value,
    //     description,
    //     phone_number: mobileNumber,
    //   })
    // );
    const dataToSend = {
      name,
      email,
      rating: value,
      description,
      phone_number: mobileNumber,
    };
    let BOT_TOKEN = "6274194101:AAGLeYbQj88EeD6uQrX7CC3g0SzlPTHFwLw";
    props.tele.readTextFromClipboard((text) => {
      console.log("text", text);
    });
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerWebAppQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        web_app_id: " <WEB_APP_ID>",
        data: dataToSend,
      }),
    })
      .then((response) => {
        // Handle the response if necessary
      })
      .catch((error) => {
        // Handle any errors
      });

    console.log(props.tele.close());
    // props.tele.close();
  };

  console.log(props.tele, "props.tele");

  // Extracting mobile number from the URL query (e.g., ?mobileNumber=1234567890)
  const urlParams = new URLSearchParams(window.location.search);
  const queryMobileNumber = urlParams.get("mobileNumber");
  const disabledMobileNumber = queryMobileNumber || null;
  const mainButton = props.tele.MainButton;
  mainButton.text = "Submit feedback";
  mainButton.color = "#00ab55";
  props.tele.onEvent("mainButtonClicked", (e: any) => {
    console.log("reading");
    handleSubmit(e);
  });
  const checkAllField = () => {
    if (name && email && rating && description && mobileNumber) {
      mainButton.enable();
      mainButton.show();
      mainButton.onClick(() => handleSubmit);
    } else {
      mainButton.disable();
      mainButton.hide();
    }
  };
  console.log(name, email, rating, description, mobileNumber);
  useEffect(() => {
    setMobileNumber(queryMobileNumber);
  }, []);
  checkAllField();
  // useEffect(() => {});
  const selectStyle = {
    width: "300px",
  };
  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <CSSTransition
        in={activeStep === 0}
        timeout={{
          appear: 1000,
          enter: 900,
          exit: 300,
        }}
        classNames="step"
        unmountOnExit
      >
        <>
          <div className="form-group">
            {/* <label htmlFor="name">Name</label> */}
            <Input
              placeholder="Name..."
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* </CSSTransition>
      <CSSTransition
        in={activeStep === 0}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      > */}
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <Input
              placeholder="Email..."
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            // style={{
            disable={name && email ? "false" : "true"}
            // }}
            type="submit"
            className="button-46"
            onClick={activeStep === 1 ? handleSubmit : () => handleNextStep(1)}
          >
            {activeStep === 1 ? "Submit" : "Next"}
          </button>
        </>
      </CSSTransition>
      <CSSTransition
        // appear={activeStep === 1}
        in={activeStep === 1}
        timeout={{
          appear: 1000,
          enter: 900,
          exit: 300,
        }}
        classNames="step"
        unmountOnExit
      >
        <>
          <div
            className="form-group"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <label style={{ color: "white" }} component="rating">
              Rating
            </label>
            <div
              style={{
                background: "green",
                color: "black",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            {/* <Select
            size="large"
            placeholder="Rating..."
            style={selectStyle}
            id="rating"
            value={rating}
            onChange={(e) => setRating(e)}
            required
            options={[
              // { value: "", label: "Rating" },
              { value: "good", label: "Good" },
              { value: "average", label: "Average" },
              { value: "bad", label: "Bad" },
            ]}
          /> */}
            {/* <option value=""></option>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
          <option value="average">Average</option> */}
            {/* </Select> */}
          </div>
          {/* </CSSTransition>

      <CSSTransition
        in={activeStep === 1}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      > */}
          <div className="form-group">
            <label htmlFor="description">Tell us what can be improved?</label>
            <TextArea
              name="desc"
              placeholder="Describe..."
              rows={6}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {/* </CSSTransition>
      <CSSTransition
        in={activeStep === 1}
        timeout={{
          appear: 600,
          enter: 700,
          exit: 100,
        }}
        classNames="step"
        unmountOnExit
      > */}
          <div className="form-group">
            {/* <label htmlFor="mobileNumber">Mobile Number</label> */}
            <Input
              placeholder="Mobile number"
              type="tel"
              id="mobileNumber"
              value={disabledMobileNumber}
              // onChange={(e) => setMobileNumber(e.target.value)}
              contentEditable={false}
              required
            />
          </div>
          <button
            // style={{
            //   display:
            //     name && description && rating && mobileNumber && email
            //       ? "true"
            //       : "false",

            //   border: "1px solid #00ab55",
            // }}
            type="submit"
            className="button-45"
            onClick={activeStep === 1 ? () => handleNextStep(-1) : () => ""}
          >
            {activeStep === 1 ? "Previous" : "Next"}
          </button>
          <button
            // style={{
            //   display:
            //     name && description && rating && mobileNumber && email
            //       ? "true"
            //       : "false",
            //   backgroundColor: "#00ab55",
            // }}
            type="submit"
            className="button-46"
            onClick={activeStep === 1 ? handleSubmit : () => handleNextStep(1)}
          >
            {activeStep === 1 ? "Submit" : "Next"}
          </button>
        </>
      </CSSTransition>

      {/* </form> */}
    </div>
  );
};

export default Form;
