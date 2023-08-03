import React, { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import * as bd from "react-basic-design";
import "./styles.scss";
const NewFeedback = ({ handleSubmit }) => {
  const [rtl, setRTL] = useState(bd.helper.getRTL());
  const [darkMode, setDarkMode] = useState(bd.helper.isDarkMode());

  function changeRTL(value) {
    setRTL(value);
    bd.helper.setRTL(value);
  }

  function changeDarMode(value) {
    setDarkMode(value);
    bd.helper.setTheme(value ? "mui-dark" : "mui-light");
  }
  return (
    <bd.Paper className="p-3 my-3 mx-auto" style={{ maxWidth: 600 }}>
      <Form autoComplete="off" className="">
        <div className="text-primary text-center mb-4">
          <bd.icons.Email style={{ fontSize: 50 }} />
          <h3 className="mt-3">FEEDBACK FORM</h3>
          <p className="text-primary-text">
            This sample uses <b>densed</b> floating labels.
          </p>
          <bd.Toggle
            label="RTL"
            color="primary"
            model={rtl}
            setModel={changeRTL}
          />

          <bd.Switch
            dense
            label="Dark"
            color="primary"
            model={darkMode}
            setModel={changeDarMode}
            labelClassName="d-inline-flex"
          />
        </div>

        <FloatingLabel label="Email address" className="dense has-icon mb-3">
          <Form.Control
            name="email"
            type="email"
            placeholder="yourName@gmail.com"
          />
          {/* <bd.icons.PersonOutline /> */}
        </FloatingLabel>

        <Row>
          <Col md>
            <FloatingLabel label="Full Name" className="dense mb-3">
              <Form.Control
                name="fullName"
                type="text"
                placeholder="FullName"
                autoComplete="off"
              />
            </FloatingLabel>
          </Col>

          <Col md>
            <FloatingLabel label="Type" className="dense mb-3">
              <Form.Select name="type" placeholder="Type">
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>Others</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <FloatingLabel label="Message" className="dense mb-3">
          <Form.Control
            as="textarea"
            name="message"
            placeholder="Message"
            style={{ height: 100 }}
          />
        </FloatingLabel>

        <bd.Button
          color="primary"
          size="lg"
          type="button"
          className="d-block m-auto w-100"
          onClick={handleSubmit}
        >
          Submit feedback
        </bd.Button>
      </Form>
    </bd.Paper>
  );
};

export default NewFeedback;
