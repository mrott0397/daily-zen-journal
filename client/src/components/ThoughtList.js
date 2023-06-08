import React, { Component} from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Row, Container, Col, CardImg } from 'react-bootstrap';
import { useMutation, useQuery, } from '@apollo/client';

import { REMOVE_THOUGHT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { QUERY_THOUGHTS } from '../utils/queries';
import Auth from '../utils/auth';
import cardImage from '../assets/cardImage.jpg';



const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
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


  if (!thoughts.length) {
    return <h3>No Journal Entries Yet</h3>;
  }

  const handleDeleteThought = async (thoughtId) => {
    try {
      const { data} = await RemoveThought({
        variables: {
          thoughtId: thoughtId,
        },
      });
  } catch (err) {
    console.error(err);
  }
  };
  

  



  
return (

<div>
{showTitle && <h3>{title}</h3>}
<div className='thoughts-container'>
    {thoughts.map((thought) => (
      <div key={thought._id} lg={4} md={6} sm={12} className="mb-3">
        <Card style={{ width: '300px', height: '300px', maxHeight: '300px' }}>

          <Card.Header className="bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
              className="text-light"
              to={`/profiles/${thought.thoughtAuthor}`}
              >
                {thought.thoughtAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  Journal entry from {thought.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  Journal entry from {thought.createdAt}
                </span>
              </>
            )}
          </Card.Header>
          <Card.Body className="d-flex flex-column bg-light p-2">
            <Card.Title></Card.Title>
            <Card.Text className='text-truncate'>
             {thought.thoughtText}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card-footer">
          <div className='button-container'>
            <Button variant="danger" onClick={() => handleDeleteThought(thought._id)}>Delete Button</Button>
          </div>
          <div>
            <Button variant="info">Update Button</Button>
          </div>
          <div>
            <Card.Img variant="bottom" src={cardImage}/>
          </div>
          </Card.Footer>
        </Card>

      </div>
    ))}
</div>
</div>
);
};

export default ThoughtList;
