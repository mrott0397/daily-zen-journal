import React, { useState, useEffect } from "react";
import Prompts from "../components/Prompts";
import { SAVE_ENTRY } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Cat } from "react-kawaii";
import { useQuery } from "@apollo/client";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
import myGif from '../assets/lofi-record.gif'

import { QUERY_THOUGHTS } from "../utils/queries";

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
    <div className="cat-container">
      <Cat
        size={220}
        mood="lovestruck"
        color="#596881"
      />
    </div>
  </div>

  );
};

export default JournalEntryForm;
