import React from "react";
import Prompts from "../components/Prompts";
import { useQuery } from "@apollo/client";
import ThoughtForm from "../components/ThoughtForm";
import myGif from "../assets/lofi-record.gif";


import { QUERY_THOUGHTS } from "../utils/queries";
import Footer from "../components/Footer";

// this is the journal entry form page

const JournalEntryForm = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <div className="journal-entry-form container-fluid">
      <div className="journal-row">
        <div className="journal-prompts">
          <Prompts />
          <div className="gif-container">
            <img src={myGif} alt="Animated GIF" />
          </div>
        </div>
        <div className="journal-wrapper">
          <div className="journal">
            <form className="journal-form">
              <h1 style={{ textAlign: "center" }}>Journal Away!</h1>
              <ThoughtForm />
            </form>
          </div>
        </div>
      </div>
      </div>
  );
};

export default JournalEntryForm;
