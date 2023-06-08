import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap';

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
    // <div>
    //   <div className="flex-row justify-center mb-3">
    //     <h2 className="">
    //       Viewing {user.username}'s journal entries. Way to go!
    //     </h2>
        

    //     <div className="col-3 col-md-3 mb-5">
    //       <ThoughtList
    //         thoughts={user.thoughts}
    //         title={`${user.username}'s thoughts...`}
    //         showTitle={false}
    //         showUsername={false}
    //       />
    //     </div>
    //     {!userParam && (
    //       <div
    //         className="col-12 col-md-10 mb-3 p-3"
    //         style={{ border: '1px dotted #1a1a1a' }}
    //       >
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div>
      <div className="flex-row justify-center ">
        <h2 className="">
          Viewing {user.username}'s journal entries. Way to go!
        </h2>
        <div className="thoughts-container">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className=""
            style={{ border: '1px dotted #1a1a1a' }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Profile;
