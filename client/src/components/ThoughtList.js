import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

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
//   {showTitle && <h3>{title}</h3>}
//   <Container>
//     <Row>
//       {thoughts.map((thought) => (
//         <Col key={thought._id} lg={4} md={6} sm={12} className="mb-3">
//           <Card style={{ width: '100%' }}>
//             <Card.Header className="bg-primary text-light p-2 m-0">
//               {showUsername ? (
//                 <Link
//                   className="text-light"
//                   to={`/profiles/${thought.thoughtAuthor}`}
//                 >
//                   {thought.thoughtAuthor} <br />
//                   <span style={{ fontSize: '1rem' }}>
//                     Journal entry from {thought.createdAt}
//                   </span>
//                 </Link>
//               ) : (
//                 <>
//                   <span style={{ fontSize: '1rem' }}>
//                     Journal entry from {thought.createdAt}
//                   </span>
//                 </>
//               )}
//             </Card.Header>
//             <Card.Body className="d-flex flex-column bg-light p-2">
//               <Card.Title>Card title</Card.Title>
//               <Card.Text className="flex-grow-1 overflow-hidden">
//                 {thought.thoughtText}
//               </Card.Text>
//             </Card.Body>
//             <Card.Footer>
//               <Button variant="danger">Delete Button</Button> <br />
//               <Button variant="info">Update Button</Button>
//             </Card.Footer>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   </Container>
// </div>
<div>
{showTitle && <h3>{title}</h3>}
<Container className='thoughts-container'>
  <Row>
    {thoughts.map((thought) => (
      <Col key={thought._id} lg={4} md={6} sm={12} className="mb-3">
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
            <Card.Title style={{marginBottom: '10px'}}>Card title</Card.Title>
            <Card.Text className="flex-grow-1 overflow-hidden" style={{ maxHeight: '170px', overflow: 'hidden', textOverflow: 'ellipsis' }}
>
              {thought.thoughtText}
            </Card.Text>
          <Card.Footer>
            <Button variant="danger">Delete Button</Button> <br />
            <Button variant="info" >Update Button</Button>
          </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
</div>
);
};

export default ThoughtList;
