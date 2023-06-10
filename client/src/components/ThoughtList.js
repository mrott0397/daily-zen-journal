import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Container, Col, Form } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_THOUGHT, UPDATE_THOUGHT } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { QUERY_THOUGHTS } from "../utils/queries";

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [userFormData, setUserFormData] = useState({ thoughtText: "" });
  const [editThoughtId, setEditThoughtId] = useState("");

  const [RemoveThought, { error }] = useMutation(REMOVE_THOUGHT, {
    update(cache, { data: { removeThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [removeThought, ...thoughts] },
        });
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [UpdateThought] = useMutation(UPDATE_THOUGHT, {
    update(cache, { data: { updateThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [updateThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, updateThought] } },
      });
    },
  });

  const handleDeleteThought = async (thoughtId) => {
    try {
      const { data } = await RemoveThought({
        variables: {
          thoughtId: thoughtId,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //
  const handleUpdateThought = (thoughtId) => {
    setEditThoughtId(thoughtId);
  };

  const handleSaveThought = async (thoughtId) => {
    try {
      const { data } = await UpdateThought({
        variables: {
          thoughtId: thoughtId,
          thoughtText: userFormData.thoughtText,
        },
      });
      setEditThoughtId(""); // Reset the editThoughtId state after saving
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (!thoughts.length) {
    return <h3>No Journal Entries Yet</h3>;
  }

  console.log(userFormData.thoughtText);
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      <div className="thoughts-container">
        {thoughts.map((thought) => (
          <Col key={thought._id} className="thought-card">
            <Card
              style={{ width: "300px", height: "300px", maxHeight: "300px" }}
            >
              <Card.Header className="bg-primary text-light p-2 m-0">
                {showUsername ? (
                  <Link
                    className="text-light"
                    to={`/profiles/${thought.thoughtAuthor}`}
                  >
                    {thought.thoughtAuthor} <br />
                    <span style={{ fontSize: "1rem" }}>
                      Journal entry from {thought.createdAt}
                    </span>
                  </Link>
                ) : (
                  <>
                    <span style={{ fontSize: "1rem" }}>
                      Journal entry from {thought.createdAt}
                    </span>
                  </>
                )}
              </Card.Header>
              <Card.Body className="d-flex flex-column bg-light p-2">
                <Card.Title></Card.Title>
                <Card.Text className="text-truncate">
                  {editThoughtId === thought._id ? (
                    <Form.Control
                      name="thoughtText"
                      value={userFormData.thoughtText}
                      onChange={handleInputChange}
                    />
                  ) : (
                    thought.thoughtText
                  )}
                </Card.Text>
                <Card.Footer className="d-flex justify-content-between">
                  {editThoughtId === thought._id ? (
                    <Button
                      className="thought-button"
                      variant="success"
                      onClick={() => handleSaveThought(thought._id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      className="thought-button"
                      variant="info"
                      onClick={() => handleUpdateThought(thought._id)}
                    >
                      Update
                    </Button>
                  )}
                  <Button
                    className="thought-button"
                    variant="danger"
                    onClick={() => handleDeleteThought(thought._id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default ThoughtList;
