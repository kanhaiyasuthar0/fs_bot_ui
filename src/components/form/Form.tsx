// FeedbackForm.js
import React, { useEffect, useState } from "react";
import "./FeedbackForm.css";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumber, setMobileNumber] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the feedback data to a server or perform any other actions

    // Clear form inputs

    props.tele.sendData(
      JSON.stringify({
        name,
        email,
        rating,
        description,
        phone_number: mobileNumber,
      })
    );
    console.log(props.tele);
    // Create a new feedback document
    // const newFeedback = new Feedback({
    //   name,
    //   email,
    //   rating,
    //   description,
    //   mobileNumber,
    // });

    // try {
    //   // Save the feedback document to the database
    //   let ans = await newFeedback.save();
    //   console.log("Feedback saved successfully!");

    //   // Clear form inputs
    //   setName("");
    //   setEmail("");
    //   setRating("");
    //   setDescription("");
    //   setMobileNumber("");
    // } catch (error) {
    //   console.error("Error saving feedback:", error);
    // }
  };

  // Extracting mobile number from the URL query (e.g., ?mobileNumber=1234567890)
  const urlParams = new URLSearchParams(window.location.search);
  const queryMobileNumber = urlParams.get("mobileNumber");
  const disabledMobileNumber = queryMobileNumber || null;
  useEffect(() => {
    setMobileNumber(queryMobileNumber);
  }, []);
  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="good">Good</option>
            <option value="bad">Bad</option>
            <option value="average">Average</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            value={disabledMobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled={true}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
