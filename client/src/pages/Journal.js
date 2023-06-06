import React, { useState, useEffect } from "react";
import Prompts from "../components/Prompts";
import { SAVE_ENTRY } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Cat } from "react-kawaii";

function JournalEntryForm() {
  const [title, setTitle] = useState("");
  const [thoughts, setContent] = useState("");
  const [saveEntry, { error }] = useMutation(SAVE_ENTRY);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here, you can perform any additional logic you need,
    // such as saving the journal entry to a database.
    // const handleSaveEntry = async (event) => {
    //     event.preventDefault();
    const entryData = {
      title: title,
      thoughts: thoughts,
    };
    try {
      await saveEntry({
        variables: { entryData },
      });
    } catch (err) {
      console.error(err);
    }

    // };

    // Reset the form
    // setTitle('');
    // setContent('');
  };

  return (
    <div className=" container-fluid">
      <div className="row">
        <div className="col-lg-4 flex-column justify-content-center align-items-center">
          <div className="journal-prompts textcenter">
            <Prompts />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="journal-entry-form">
              <div />
              <h1 style={{ textAlign: "center" }}>Let's Reflect</h1>
              <label className="form-label">
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Entry:
                <textarea
                  value={thoughts}
                  onChange={(event) => setContent(event.target.value)}
                  required
                  className="form-textarea larger-textarea"
                />
              </label>
              <button type="submit" className="form-submit">
                Submit
              </button>
            </form>
           
              <div />
            <div className="col-lg-4">
              <div className="cat-container">
                <Cat size={220} mood="happy" color="#596881" />
                <div />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalEntryForm;

// NOTHING WORKS