import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";

export function Task(props) {
  function handleDelete() {
    props.handleDelete(props.index);
  }

  return (
    <Container>
      <Row>
        <Col
          className=" col-md-10 col-md-offset-5"
          style={{
            background: "rgba(0,0,0,0.8)",
            textAlign: "left",
            borderRadius: "5px",
            color: "white",
            zIndex: "8",
          }}
        >
          <div>
            <small>{props.taskName}</small>
          </div>
          <div>{props.desc}</div>
        </Col>

        <Col>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default function TaskList(props) {
  return (
    <Container className="justify-content-center my-4">
      <Table borderless>
        <tbody>
          <tr>
            {props.taskList.map((obj, index) => (
              <Task
                key={index}
                taskName={obj.task}
                desc={obj.desc}
                index={index}
                handleDelete={props.handleDelete}
              />
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
