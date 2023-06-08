import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Journal Entries Yet</h3>;
  }

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
            <Card.Title>Card title</Card.Title>
            <Card.Text className='text-truncate'>
             {thought.thoughtText}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant='danger'>Delete Button</Button> <br />
            <Button variant='info'>Update Button</Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export default ThoughtList;
