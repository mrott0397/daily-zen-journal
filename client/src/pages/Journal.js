import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import Prompts from '../components/Prompts';
// import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_ENTRY} from "../utils/mutations";
// import { removeEntryId } from "../utils/localStorage";
import { saveEntryIds, getSavedEntryIds } from '../utils/localStorage';
import { QUERY_ME } from "../utils/queries";



function JournalEntryForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const [savedEntry, setSavedEntry] = useState([]);
    const [ savedEntries, setSavedEntries ] = useState([]);
    // const [RemoveEntry, { error }] = useMutation(REMOVE_ENTRY);
    const { loading, data } = useQuery(QUERY_ME);
    const [SaveEntry, { error} ] = useMutation(SAVE_ENTRY);
    const [savedEntryIds, setSavedEntryIds] = useState(getSavedEntryIds());

    useEffect(() => {
        return () => saveEntryIds(savedEntryIds);
      });
    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (!Auth.loggedIn()) {
        //     return false;
        // }

        // Here, you can perform any additional logic you need,
        // such as saving the journal entry to a database.

        // Reset the form
        try {
            const { data } = await SaveEntry({
                variables: { title, content },
            });
            // setTitle('');
            // setContent('');
            
            const { items} = data.saveEntry;
            
            const thoughtData =  items.map((entry) => ({
                entryId: entry.entryId,
                title: entry.title,
                content: entry.content,
                // createdAt: entry.createdAt,
            }));
            
            setSavedEntry(thoughtData);
            setTitle('');
            setContent('');
        } catch (err) {
            console.error(err);
        } 

    };

    const handleSaveEntry = async (entryId) => {
        const entryToSave = savedEntry.find((entry) => entry.entryId === entryId);

    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    
    try {
        const { data } = await  SaveEntry({ variables: { thoughtData: entryToSave } });
        
        // if book successfully saves to user's account, save book id to state
        setSavedEntryIds([...savedEntryIds, entryToSave.entryId]);
    } catch (err) {
        console.error(err);
    }
    }
//   };

    return (
        
        <div className='journal-entry-form container-fluid'>
            <div className='row'>
                <div className='col-lg-6 flex-column justify-content-center align-items-center'>

                    <div className="journal-prompts textcenter">
                        <Prompts />
            
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="journal-entry-form">
                    <div  />
                    <h1>Journal Entry of the Day</h1>
                    <label className='form-label'>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className='form-input'
                        />
                    </label>
                    <label className='form-label'>
                        Content:
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                            className='form-textarea larger-textarea'
                        />
                    </label>
                    <button type="submit" className='form-submit'   
                     onClick={() => handleSaveEntry()}>
                        {/* {savedEntryIds?.some(
                            (savedEntryId) => savedEntryId === entry.entryId)
                            ? "This entry has been saved!"
                            : "Save this Entry!"} */}
                    Submit</button>
                </form>
                <div />
            </div>
        </div>
    );
}

export default JournalEntryForm;




// import React, { useReducer, useState } from "react";

// const formReducer = (state, event) => {
//  return {
//    ...state,
//    [event.name]: event.value
//  }
// }

// function Journal() {
//   const [formData, setFormData] = useReducer(formReducer, {});
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = event => {
//     event.preventDefault();
//     setSubmitting(true);

//     setTimeout(() => {
//       setSubmitting(false);
//     }, 3000);
//   }

//   const handleChange = event => {
//     setFormData({
//       name: event.target.name,
//       value: event.target.value,
//     });
//   }

//             return (
//                     <div className="journal">
//                       <h1>Get your Zen On</h1>
//                       <form>
//                       <fieldset>
//                          <label>
//                            <p>Name</p>
//                            <input name="name" onChange={handleChange} />
//                          </label>
//                        </fieldset>
//                        <button type="submit">Submit</button>
//                       </form>
//                     </div>
//                   )
//                 }


// export default Journal;