import React, {useState} from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_ENTRY} from "../utils/mutations";
import { removeEntryId } from "../utils/localStorage";
import { QUERY_ME } from "../utils/queries";


const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [RemoveEntry, { error }] = useMutation(REMOVE_ENTRY);
  const thoughts = data?.me.savedThoughts || [];
  const userData = data?.me || {};
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteEntry = async (entryId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await RemoveEntry({ variables: { entryId } });

      // upon success, remove book's id from localStorage
      removeEntryId(entryId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
console.log(userData)
  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Your Profile Page</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {thoughts.length
            ? `Viewing ${thoughts.length} saved ${
                thoughts.length === 1 ? "entry" : "thoughts"
              }:`
            : "You have no saved entries!"}
        </h2>
        <Row>
          {thoughts.map((entry) => {
            return (
              <Col md="4">
                <Card key={entry.entryId} border="dark">
                  {entry.image ? (
                    <Card.Img
                      src={entry.image}
                      alt={`The cover for ${entry.title}`}
                      variant="top"
                    />
                  ) : null} 
                  <Card.Body>
                    <Card.Title>{entry.title}</Card.Title>
                    <p className="small">Authors: {entry.authors}</p>
                    <Card.Text>{entry.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteEntry(entry.entryId)}
                    >
                      Delete this Entry
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Profile;