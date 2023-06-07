// import React, {useState} from "react";
// import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
// import Auth from "../utils/auth";
// import { useMutation, useQuery } from "@apollo/client";
// import { REMOVE_ENTRY} from "../utils/mutations";
// import { removeEntryId } from "../utils/localStorage";
// import { QUERY_ME } from "../utils/queries";
// import JournalEntryForm from "./Journal";

// // function Profile({currentPage, handlePageChange}) {
// //     return (
// //           <div className="profile">
// //             <h1>Profile Page</h1>
// //           </div>
// //           )
// //         }
// const Profile = () => {
  
//   const { loading, data } = useQuery(QUERY_ME);
//   const [RemoveEntry, { error }] = useMutation(REMOVE_ENTRY);
//   // const thoughts = data?.me.savedThoughts || [];
//   const userData = data?.me || {};
//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeleteEntry = async (entryId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await RemoveEntry({ variables: { entryId } });

//       // upon success, remove book's id from localStorage
//       removeEntryId(entryId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // if data isn't here yet, say so
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }
// console.log(userData)

//   return (
//     <>
//       <div fluid="true" className="text-light bg-dark p-5">
//         <Container>
//           <h1>{userData.username}'s' Profile Page</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className="pt-5">
//           {userData.savedEntries?.length
//             ? `Viewing ${userData.savedEntries.length} saved ${
//                 userData.savedEntries.length === 1 ? "entry" : "thoughts"
//               }:`
//             : "You have no saved entries!"}
//         </h2>
//         <Row>
//           {userData.savedEntries?.map((entryData) => {
//             return (
//               <Col md="4">
//                 <Card key={entryData.entryDataId} border="dark">
//                   {entryData.image ? (
//                     <Card.Img
//                       src={entryData.image}
//                       alt={`The cover for ${entryData.title}`}
//                       variant="top"
//                     />
//                   ) : null}
//                   <Card.Body>
//                     <Card.Title>{entryData.title}</Card.Title>
//                     {/* <p className="small">Authors: {entry.authors}</p> */}
//                     <Card.Text>{entryData.thoughts}</Card.Text>
//                     <Button
//                       className="btn-block btn-danger"
//                       onClick={() => handleDeleteEntry(entryData.entryId)}
//                     >
//                       Delete this Entry
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Profile;

import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            {/* <ThoughtForm /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
