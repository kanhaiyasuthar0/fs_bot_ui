// FeedbackForm.js
import React, { useEffect, useState } from "react";
import "./FeedbackForm.css";
import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CSSTransition } from "react-transition-group";
import { Rating, Typography } from "@mui/material";
import axios from "axios";
import OddForm from "./OddForm";
import NewFeedback from "./NewFeedback";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
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
const FormComponent = (props) => {
  const [value, setValue] = React.useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
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
    // console.log(props.tele, "INSIDE THE HANDLE SUBMIT");
    // console.log(name, email, rating, description, mobileNumber);
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
    // const dataToSend = {
    //   name,
    //   email,
    //   rating: value,
    //   description,
    //   phone_number: mobileNumber,
    // };
    let BOT_TOKEN = "6274194101:AAGLeYbQj88EeD6uQrX7CC3g0SzlPTHFwLw";
    // props.tele.readTextFromClipboard((text) => {
    //   console.log("text", text);
    // });
    const authData = props.tele.initData || "";

    axios
      .post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: props.tele.initDataUnsafe.user.id || "1465932798",
        text: "Thanks for giving feedback!",
      })
      .then(() => {
        console.log(props.tele.close());
      })
      .catch(() => {
        alert("Some error occured!");
      });

    // fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: {
    //     chat_id: props.tele.initDataUnsafe.user.id,
    //     text: "I am back",
    //   },
    // })
    //   .then((response) => {
    //     // Handle the response if necessary
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //   });

    // console.log(props.tele.close());
    // props.tele.close();
  };

  console.log(props.tele, "props.tele");

  // Extracting mobile number from the URL query (e.g., ?mobileNumber=1234567890)
  const urlParams = new URLSearchParams(window.location.search);
  const queryMobileNumber = urlParams.get("mobileNumber");
  const button_text = urlParams.get("button_text");
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
  let expand = false;
  console.log(mobileNumber % 2 == 0, "even");
  console.log(mobileNumber % 2 !== 0, "odd");
  return (
    <>
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${expand}`}
            style={{ width: "50px" }}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  href={`/?mobileNumber=${urlParams.get(
                    "mobileNumber"
                  )}&&first_name=${urlParams.get(
                    "first_name"
                  )}&&button_text=${"Give feedback"}`}
                >
                  Feedback
                </Nav.Link>

                {urlParams.get("button_text") == "Fill account details" && (
                  <Nav.Link
                    href={`/?mobileNumber=${urlParams.get(
                      "mobileNumber"
                    )}&&first_name=${urlParams.get(
                      "first_name"
                    )}&&button_text=${"Fill account details"}`}
                  >
                    Account
                  </Nav.Link>
                )}
                {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {button_text == "Fill account details" && (
        <OddForm mobileNumber={mobileNumber} tele={props.tele} />
      )}
      {button_text == "Give feedback" && (
        <NewFeedback handleSubmit={handleSubmit} />
      )}
    </>
  );
};

export default FormComponent;
