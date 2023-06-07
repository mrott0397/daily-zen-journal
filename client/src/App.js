import "./App.css";
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
// import Journal from "./components/Journal";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Prompts from "./components/Prompts";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Journal from "./pages/Journal";
import {Planet} from 'react-kawaii';

const Example = () => (
 <Planet size={200} mood="blissful" color="#FDA7DC" />
)



const httpLink = createHttpLink({
  uri: "/graphql",
});

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
  // const [currentPage, setCurrentPage] = useState("Homepage");

  // const renderPage = () => {
  //   if (currentPage === "Journal") {
  //     return <Journal />;
  //   }
  //   if (currentPage === "Profile") {
  //     return <Profile />;
  //   }
  //     return <Homepage />;
  // };

  
  // const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <Router >
        <>
          <Header />
          {/* <Nav/> */}
            <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<Journal />} />
            {/* <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            /> */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
