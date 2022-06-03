import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

export default function CreateForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [taskNameError, setTaskNameError] = useState("");
  const [descError, setDescError] = useState("");

    function onSubmit(data) {
      props.updateTaskList(data);
    }

    function handleTaskNameError() {
      if ("task" in errors) {
        setTaskNameError(errors.task.message);
      } else {
        setTaskNameError("");
      }
    }

    function handleDescError() {
      if ("desc" in errors) {
        setDescError(errors.desc.message);
      } else {
        setDescError("");
      }
    }

    return (
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="justify-content-center my-4">
            <Form.Group className="col-md-4 col-md-offset-5 align-center">
              <Form.Control
                type="text"
                placeholder="Enter the task name"
                {...register("task", {
                  required: true,
                  pattern: {
                    value: /^\w+$/i,
                    message: "Only alpahnumeric characters are allowed",
                  },
                  onBlur: handleTaskNameError,
                  maxLength: 100,
                })}
              />
              <Form.Text className="text-danger">{taskNameError}</Form.Text>
            </Form.Group>
          </Row>

          <Row className="justify-content-center my-4">
            <Form.Group className="col-md-4 col-md-offset-5 align-center">
              <Form.Control
                type="desc"
                placeholder="Enter the description of the task"
                {...register("desc", {
                  required: true,
                  pattern: {
                    value: /^\w+$/i,
                    message: "Only alpahnumeric characters are allowed",
                  },
                  onBlur: handleDescError,
                  maxLength: 400,
                })}
              />
              <Form.Text className="text-danger">{descError}</Form.Text>
            </Form.Group>
          </Row>

          <Row className="justify-content-center my-4">
            <Form.Group className="col-md-2 col-md-offset-3 align-center">
              <Button variant="primary" type="submit" title="submitButton">
                Create Task
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Container>
    );
}
