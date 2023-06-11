import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Journal from "./pages/Journal";
import { Planet } from "react-kawaii";

const Example = () => <Planet size={200} mood="blissful" color="#FDA7DC" />;

//this is the apollo client

const httpLink = createHttpLink({
  uri: "/graphql",
});

//this is the auth link

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client} className="app-container">
      <Router>
        <Header />
        <Routes fluid="true">
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} fluid="true" />
          <Route path="/saved" element={<Journal />} />
        </Routes>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
