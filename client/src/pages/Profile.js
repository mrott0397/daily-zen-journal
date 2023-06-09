import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import ThoughtList from "../components/ThoughtList";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Card } from "react-bootstrap";
import profilePic from "../assets/cat-profile-pic.png";
import catGif from "../assets/lofi-cat.gif";


const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/" />;
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
      <div className="flex-row justify-center ">
        <Container>
          <Row>
            <Col md={4} className="text-center">
              <div className="profile-pic-container">
                <Card.Img
                  src={profilePic}
                  alt="Profile Picture"
                  roundedCircle
                  fluid
                  className="profile-pic"
                />
              </div>
            </Col>
            <Col md={8}>
              <div className="cat-container">
                <img src={catGif} alt="Animated GIF" className="cat-gif" />
              </div>
              <div className="about-me-container">
                <h4 className="about-me-title">About Me:</h4>
                <p className="about-me-text">{user.aboutMe}Likes Cats a lot</p>
              </div>
              <h2 className="viewing">
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
