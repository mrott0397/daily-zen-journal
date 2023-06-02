import "./App.css";
import React, {useState} from "react";
// import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
// import Journal from "./components/Journal";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Profile from "./pages/Profile";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Journal from "./pages/Journal";

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
  const [currentPage, setCurrentPage] = useState("Homepage");

  const renderPage = () => {
    if (currentPage === "Journal") {
      return <Journal />;
    }
    if (currentPage === "Profile") {
      return <Profile />;
    }
    return <Homepage />;
    
  };
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div>
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          <div className="cover-image"></div>
          <main>
            <section id="homepage" className="page-section">
              {renderPage()}
              {/* <Homepage />
              <Profile /> */}
            </section>
            <Footer />
          </main>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
