import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_THOUGHT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { QUERY_THOUGHTS } from '../utils/queries';
import Auth from '../utils/auth';


const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  // const [RemoveThought, { error }] = useMutation(REMOVE_THOUGHT);
  const [RemoveThought, { error }] = useMutation(REMOVE_THOUGHT, {
    update(cache, { data: { removeThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [removeThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, removeThought] } },
      });
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
      // Perform any additional actions after deleting the thought
    // } catch (err) {
    //   console.error(err);
    // }
  } catch (err) {
    console.error(err);
  }
  };
  

  


  return (
  //   <div>
  //     {showTitle && <h3>{title}</h3>}
  //     {thoughts &&
  //       thoughts.map((thought) => (
  //         <div key={thought._id} className="card mb-3">
  //           <h4 className="card-header bg-primary text-light p-2 m-0">
  //             {showUsername ? (
  //               <Link
  //                 className="text-light"
  //                 to={`/profiles/${thought.thoughtAuthor}`}
  //               >
  //                 {thought.thoughtAuthor} <br />
  //                 <span style={{ fontSize: '1rem' }}>
  //                   Journal entry from {thought.createdAt}
  //                 </span>
  //               </Link>
  //             ) : (
  //               <>
  //                 <span style={{ fontSize: '1rem' }}>
  //                   Journal entry from {thought.createdAt}
  //                 </span>
  //               </>
  //             )}
  //           </h4>
  //           <div className="card-body bg-light p-2">
  //             <p>{thought.thoughtText}</p>
  //           </div>
  //         </div>
  //       ))}
  //   </div>
  // );
  <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts.map((thought) => (
        <Card key={thought._id} style={{ width: '18rem' }}>
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
          <Card.Footer>
            <Button variant='danger' onClick={() => handleDeleteThought(thought._id)}>Delete Button</Button> <br />
            <Button variant='info'>Update Button</Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default ThoughtList;
