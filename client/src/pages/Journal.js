import React, { useState, useEffect } from "react";
import Prompts from "../components/Prompts";
import { SAVE_ENTRY } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Cat } from "react-kawaii";
import { useQuery } from "@apollo/client";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

const JournalEntryForm = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <div className="journal-entry-form container-fluid">
      <div className="row">
        <div className="col-lg-4 flex-column justify-content-center align-items-center">
          <div className="journal-prompts textcenter">
            <Prompts />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-container">
            <form className="journal-entry-form">
              <div />
              <h1 style={{ textAlign: "center" }}>Let's Reflect</h1>
               <ThoughtForm/>      
            </form>

            <div className="col-lg-4">
              <div className="cat-container">
                <Cat size={220} mood="lovestruck" color="#596881" />
                <div />
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryForm;
